import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Voice IDs
const AI_VOICE = "EXAVITQu4vr4xnSDxMaL"; // Sarah - female for AI receptionist
const CLIENT_VOICE = "nPczCjzI2devNBz1zQrb"; // Brian - male for client

interface TranscriptMessage {
  speaker: "ai" | "client";
  text: string;
}

async function generateSingleAudio(text: string, voiceId: string, apiKey: string): Promise<ArrayBuffer> {
  console.log(`Generating audio for: "${text.substring(0, 40)}..." with voice: ${voiceId}`);
  
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.3,
          similarity_boost: 0.75,
          style: 0.4,
          use_speaker_boost: false,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`);
  }

  return response.arrayBuffer();
}

// Simple pause generation - 0.5 seconds of silence in MP3 format
function generateSilence(): Uint8Array {
  // Minimal MP3 frame for ~0.5s of silence
  // This is a simplified approach - just return empty audio
  return new Uint8Array(0);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { demoId, transcript } = await req.json() as { 
      demoId: string; 
      transcript: TranscriptMessage[];
    };

    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY_1") || Deno.env.get("ELEVENLABS_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!ELEVENLABS_API_KEY) {
      throw new Error("ELEVENLABS_API_KEY is not configured");
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase credentials not configured");
    }

    console.log(`Generating demo audio for: ${demoId} with ${transcript.length} messages`);

    // Generate audio for each message
    const audioChunks: Uint8Array[] = [];
    
    for (let i = 0; i < transcript.length; i++) {
      const msg = transcript[i];
      const voiceId = msg.speaker === "ai" ? AI_VOICE : CLIENT_VOICE;
      
      try {
        const audioBuffer = await generateSingleAudio(msg.text, voiceId, ELEVENLABS_API_KEY);
        audioChunks.push(new Uint8Array(audioBuffer));
        console.log(`Generated chunk ${i + 1}/${transcript.length} (${audioBuffer.byteLength} bytes)`);
        
        // Add a small delay between API calls to avoid rate limiting
        if (i < transcript.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error(`Error generating audio for message ${i}:`, error);
        throw error;
      }
    }

    // Concatenate all audio chunks
    const totalLength = audioChunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const combinedAudio = new Uint8Array(totalLength);
    let offset = 0;
    
    for (const chunk of audioChunks) {
      combinedAudio.set(chunk, offset);
      offset += chunk.length;
    }

    console.log(`Combined audio size: ${combinedAudio.length} bytes`);

    // Upload to Supabase Storage
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    const fileName = `${demoId}.mp3`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("demo-audio")
      .upload(fileName, combinedAudio, {
        contentType: "audio/mpeg",
        upsert: true,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw new Error(`Storage upload failed: ${uploadError.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("demo-audio")
      .getPublicUrl(fileName);

    console.log(`Audio uploaded successfully: ${urlData.publicUrl}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        url: urlData.publicUrl,
        size: combinedAudio.length,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in generate-demo-audio function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
