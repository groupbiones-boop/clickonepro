import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
interface TTSRequest {
  text: string;
  voiceId?: string;
}

function validateRequest(body: unknown): TTSRequest {
  if (!body || typeof body !== 'object') {
    throw new Error("Invalid request body");
  }

  const { text, voiceId } = body as Record<string, unknown>;

  // Validate text
  if (typeof text !== 'string') {
    throw new Error("Text is required and must be a string");
  }

  const trimmedText = text.trim();
  if (trimmedText.length === 0) {
    throw new Error("Text cannot be empty");
  }

  if (trimmedText.length > 5000) {
    throw new Error("Text must be less than 5000 characters");
  }

  // Validate voiceId if provided
  if (voiceId !== undefined && voiceId !== null) {
    if (typeof voiceId !== 'string') {
      throw new Error("Voice ID must be a string");
    }
    // ElevenLabs voice IDs are alphanumeric
    if (!/^[a-zA-Z0-9]{10,30}$/.test(voiceId)) {
      throw new Error("Invalid voice ID format");
    }
  }

  return {
    text: trimmedText,
    voiceId: typeof voiceId === 'string' ? voiceId : undefined
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin role
    await verifyAdminRole(req);

    // Parse and validate input
    const body = await req.json();
    const { text, voiceId } = validateRequest(body);

    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");

    if (!ELEVENLABS_API_KEY) {
      console.error("ELEVENLABS_API_KEY is not configured");
      throw new Error("Service configuration error");
    }

    // Default to Sarah voice if not specified
    const voice = voiceId || "EXAVITQu4vr4xnSDxMaL";

    console.log(`Generating TTS for text: "${text.substring(0, 50)}..." with voice: ${voice}`);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API error:", response.status, errorText);
      throw new Error("TTS generation failed");
    }

    const audioBuffer = await response.arrayBuffer();
    console.log(`Generated audio buffer of size: ${audioBuffer.byteLength} bytes`);

    return new Response(audioBuffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("Error in elevenlabs-tts function:", error);
    
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message.includes('Authorization') || message.includes('token') || message.includes('Admin') 
      ? 401 
      : message.includes('required') || message.includes('must be') || message.includes('Invalid') || message.includes('cannot')
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
