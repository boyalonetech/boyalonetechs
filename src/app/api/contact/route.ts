import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("Received form data:", body);

    const {
      name,
      email,
      message,
      projectType,
      websiteType,
      appType,
      budget,
      contactPreference,
      howMet,
      whatsappNumber,
      phoneNumber,
    } = body;

    // Create a comprehensive message with all form data
    const fullMessage = `
Name: ${name}
Email: ${email}
Project Type: ${projectType}
${
  projectType === "Website"
    ? `Website Type: ${websiteType}`
    : `App Type: ${appType}`
}
Budget: ${budget}
Contact Preference: ${contactPreference}
${contactPreference === "WhatsApp" ? `WhatsApp Number: ${whatsappNumber}` : ""}
${contactPreference === "Phone" ? `Phone Number: ${phoneNumber}` : ""}
How they found you: ${howMet}

Message:
${message}
    `.trim();

    // Insert message into Supabase - use the correct column names
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          from_name: name, // Changed from 'from' to 'from_name'
          email: email,
          subject: `${name}`,
          message: fullMessage,
          read: false,
          // Add any additional fields that exist in your table
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error details:", error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error.details,
          hint: error.hint,
        },
        { status: 500 }
      );
    }

    console.log("Successfully inserted message:", data);

    return NextResponse.json({
      success: true,
      data,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
