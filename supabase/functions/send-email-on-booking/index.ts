/// <reference lib="deno.ns" />
// Follow this guide to deploy: https://supabase.com/docs/guides/functions/triggers#email-notifications-for-new-database-rows
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.44.0"
import { Resend } from "https://esm.sh/resend@1.1.0"

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  const { record } = await req.json();

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  )

  // Send email using Resend (replace with your email logic)
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'heritageridesudaipur@gmail.com', // Replace with your email
      subject: 'New Booking Confirmation',
      html: `
        <h1>New Booking Received!</h1>
        <p>A new booking has been placed with the following details:</p>
        <ul>
          <li>Service Type: ${record.service_type}</li>
          <li>Vehicle ID: ${record.vehicle_id}</li>
          <li>Pickup Date: ${record.pickup_date}</li>
          <li>Pickup Time: ${record.pickup_time}</li>
          <li>Pickup Location: ${record.pickup_location}</li>
          <li>Drop-off Location: ${record.dropoff_location || 'N/A'}</li>
          <li>Passengers: ${record.passengers}</li>
          <li>Duration: ${record.duration || 'N/A'}</li>
          <li>Customer Name: ${record.customer_name}</li>
          <li>Customer Email: ${record.customer_email}</li>
          <li>Customer Phone: ${record.customer_phone}</li>
        </ul>
        <p>Please log in to your dashboard to confirm the booking.</p>
      `,
    });

    if (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    return new Response(JSON.stringify({ message: "Email sent successfully!", data }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}) 