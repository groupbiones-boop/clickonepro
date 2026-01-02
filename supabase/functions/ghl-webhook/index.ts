import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    console.log('Webhook received:', JSON.stringify(body));

    // Extract lead data from GHL webhook payload
    // GHL typically sends contact data in various formats, adapt as needed
    const leadData = {
      name: body.full_name || body.name || body.contact_name || body.firstName 
        ? `${body.firstName || ''} ${body.lastName || ''}`.trim() 
        : null,
      email: body.email || body.contact_email || null,
      phone: body.phone || body.contact_phone || body.phoneNumber || null,
      company: body.company || body.companyName || null,
      source: body.source || body.formName || body.form_name || 'ghl-webhook',
      utm_source: body.utm_source || body.utmSource || null,
      utm_medium: body.utm_medium || body.utmMedium || null,
      utm_campaign: body.utm_campaign || body.utmCampaign || null,
      status: 'new',
    };

    // Only proceed if we have at least an email
    if (!leadData.email) {
      console.log('No email found in webhook payload, skipping');
      return new Response(
        JSON.stringify({ success: false, message: 'No email provided' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Insert lead into database
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single();

    if (leadError) {
      console.error('Error inserting lead:', leadError);
      throw leadError;
    }

    console.log('Lead inserted:', lead);

    // Create notification for admin
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        type: 'new_lead',
        title: '🎉 Novo Lead!',
        message: `${leadData.name || leadData.email} via ${leadData.source}`,
        severity: 'success',
        data: { lead_id: lead.id, ...leadData },
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
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
