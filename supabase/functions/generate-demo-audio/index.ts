import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Voice IDs
const AI_VOICE = "EXAVITQu4vr4xnSDxMaL"; // Sarah - female for AI receptionist

// Different client voices for each demo - variety in tone and gender
const CLIENT_VOICES: Record<string, string> = {
  "plumbing": "nPczCjzI2devNBz1zQrb",    // Brian - male, urgent/worried tone
  "law-office": "cgSgspJ2msm6clMCkdW9",  // Jessica - female, professional/concerned
  "cleaning": "pFZP5JQG7iQjIQuC4Bku",    // Lily - female, friendly/casual
};

const DEFAULT_CLIENT_VOICE = "nPczCjzI2devNBz1zQrb"; // Brian as fallback
const ALLOWED_DEMO_IDS = ["plumbing", "law-office", "cleaning"];
const MAX_TRANSCRIPT_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 1000;

interface TranscriptMessage {
  speaker: "ai" | "client";
  text: string;
}

interface DemoAudioRequest {
  demoId: string;
  transcript: TranscriptMessage[];
}

function validateRequest(body: unknown): DemoAudioRequest {
  if (!body || typeof body !== 'object') {
    throw new Error('Invalid request body');
  }

  const { demoId, transcript } = body as Record<string, unknown>;

  // Validate demoId
  if (typeof demoId !== 'string') {
    throw new Error('demoId is required and must be a string');
  }

  if (!ALLOWED_DEMO_IDS.includes(demoId)) {
    throw new Error(`Invalid demoId. Allowed values: ${ALLOWED_DEMO_IDS.join(', ')}`);
  }

  // Validate transcript
  if (!Array.isArray(transcript)) {
    throw new Error('transcript must be an array');
  }

  if (transcript.length === 0) {
    throw new Error('transcript cannot be empty');
  }

  if (transcript.length > MAX_TRANSCRIPT_MESSAGES) {
    throw new Error(`transcript cannot have more than ${MAX_TRANSCRIPT_MESSAGES} messages`);
  }

  const validatedTranscript: TranscriptMessage[] = [];

  for (let i = 0; i < transcript.length; i++) {
    const msg = transcript[i];
    
    if (!msg || typeof msg !== 'object') {
      throw new Error(`Invalid message at index ${i}`);
    }

    const { speaker, text } = msg as Record<string, unknown>;

    if (speaker !== 'ai' && speaker !== 'client') {
      throw new Error(`Invalid speaker at index ${i}. Must be "ai" or "client"`);
    }

    if (typeof text !== 'string') {
      throw new Error(`Invalid text at index ${i}. Must be a string`);
    }

    const trimmedText = text.trim();
    if (trimmedText.length === 0) {
      throw new Error(`Empty text at index ${i}`);
    }

    if (trimmedText.length > MAX_MESSAGE_LENGTH) {
      throw new Error(`Text at index ${i} exceeds ${MAX_MESSAGE_LENGTH} characters`);
    }

    validatedTranscript.push({
      speaker,
      text: trimmedText
    });
  }

  return {
    demoId,
    transcript: validatedTranscript
  };
}

async function verifyAdminRole(req: Request): Promise<void> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    throw new Error('Authorization header required');
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } }
  });

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error('Invalid or expired token');
  }

  const { data: hasRole, error: roleError } = await supabase.rpc('has_role', {
    _user_id: user.id,
    _role: 'admin'
  });

  if (roleError || !hasRole) {
    throw new Error('Admin role required');
  }
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
    throw new Error(`TTS generation failed: ${response.status}`);
  }

  return response.arrayBuffer();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin role
    await verifyAdminRole(req);

    // Parse and validate input
    const body = await req.json();
    const { demoId, transcript } = validateRequest(body);

    // Select the appropriate client voice for this demo
    const clientVoice = CLIENT_VOICES[demoId] || DEFAULT_CLIENT_VOICE;

    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY_1") || Deno.env.get("ELEVENLABS_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!ELEVENLABS_API_KEY) {
      throw new Error("Service configuration error");
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Service configuration error");
    }

    console.log(`Generating demo audio for: ${demoId} with ${transcript.length} messages`);

    // Generate audio for each message
    const audioChunks: Uint8Array[] = [];
    
    for (let i = 0; i < transcript.length; i++) {
      const msg = transcript[i];
      const voiceId = msg.speaker === "ai" ? AI_VOICE : clientVoice;
      
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
        throw new Error('Audio generation failed');
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
      throw new Error('Storage upload failed');
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
    
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message.includes('Authorization') || message.includes('token') || message.includes('Admin') 
      ? 401 
      : message.includes('required') || message.includes('must be') || message.includes('Invalid') || message.includes('cannot') || message.includes('exceeds')
        ? 400 
        : 500;

    return new Response(
      JSON.stringify({ error: message }),
      {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
