import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-ghl-signature, x-webhook-secret',
};

// Input validation helpers
function isValidEmail(email: unknown): email is string {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function sanitizeString(value: unknown, maxLength: number = 255): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== 'string') return null;
  // Remove any potentially dangerous characters and trim
  return value.trim().slice(0, maxLength).replace(/[<>]/g, '');
}

function sanitizePhone(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== 'string') return null;
  // Only allow digits, spaces, dashes, parentheses, and plus sign
  const cleaned = value.replace(/[^\d\s\-\(\)\+]/g, '').slice(0, 50);
  return cleaned.length > 0 ? cleaned : null;
}

interface ValidatedLeadData {
  name: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  status: string;
}

function validateWebhookPayload(body: unknown): ValidatedLeadData {
  if (!body || typeof body !== 'object') {
    throw new Error('Invalid request body');
  }

  const data = body as Record<string, unknown>;

  // Extract and validate email (required)
  const email = data.email || data.contact_email;
  if (!isValidEmail(email)) {
    throw new Error('Valid email is required');
  }

  // Build name from various possible fields
  let name: string | null = null;
  if (data.full_name) {
    name = sanitizeString(data.full_name);
  } else if (data.name) {
    name = sanitizeString(data.name);
  } else if (data.contact_name) {
    name = sanitizeString(data.contact_name);
  } else if (data.firstName || data.lastName) {
    const firstName = sanitizeString(data.firstName) || '';
    const lastName = sanitizeString(data.lastName) || '';
    name = `${firstName} ${lastName}`.trim() || null;
  }

  return {
    name,
    email: email as string,
    phone: sanitizePhone(data.phone || data.contact_phone || data.phoneNumber),
    company: sanitizeString(data.company || data.companyName),
    source: sanitizeString(data.source || data.formName || data.form_name) || 'ghl-webhook',
    utm_source: sanitizeString(data.utm_source || data.utmSource),
    utm_medium: sanitizeString(data.utm_medium || data.utmMedium),
    utm_campaign: sanitizeString(data.utm_campaign || data.utmCampaign),
    status: 'new',
  };
}

function verifyWebhookSecret(req: Request): void {
  const webhookSecret = Deno.env.get('GHL_WEBHOOK_SECRET');
  
  // If webhook secret is configured, verify it
  if (webhookSecret) {
    const providedSecret = req.headers.get('x-webhook-secret') || req.headers.get('x-ghl-signature');
    
    if (!providedSecret) {
      throw new Error('Webhook secret required');
    }
    
    // Constant-time comparison to prevent timing attacks
    if (webhookSecret.length !== providedSecret.length) {
      throw new Error('Invalid webhook secret');
    }
    
    let mismatch = 0;
    for (let i = 0; i < webhookSecret.length; i++) {
      mismatch |= webhookSecret.charCodeAt(i) ^ providedSecret.charCodeAt(i);
    }
    
    if (mismatch !== 0) {
      throw new Error('Invalid webhook secret');
    }
  }
  // If no secret is configured, log warning but allow (for backwards compatibility during setup)
  else {
    console.warn('GHL_WEBHOOK_SECRET not configured - webhook verification disabled');
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify webhook secret
    verifyWebhookSecret(req);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse and validate input
    const body = await req.json();
    console.log('Webhook received, validating payload...');
    
    const leadData = validateWebhookPayload(body);
    console.log('Validated lead data for:', leadData.email);

    // Insert lead into database
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single();

    if (leadError) {
      console.error('Error inserting lead:', leadError);
      throw new Error('Failed to save lead');
    }

    console.log('Lead inserted:', lead.id);

    // Create notification for admin
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        type: 'new_lead',
        title: '🎉 Novo Lead!',
        message: `${leadData.name || leadData.email} via ${leadData.source}`,
        severity: 'success',
        data: { lead_id: lead.id, email: leadData.email, source: leadData.source },
      });

    if (notificationError) {
      console.error('Error creating notification:', notificationError);
    }

    return new Response(
      JSON.stringify({ success: true, lead_id: lead.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: unknown) {
    console.error('Webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    const status = errorMessage.includes('secret') ? 401 
      : errorMessage.includes('required') || errorMessage.includes('Invalid') ? 400 
      : 500;

    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status }
    );
  }
});
