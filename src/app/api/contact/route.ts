import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface FormData {
  name: string;
  email: string;
  message: string;
  projectType?: string;
  websiteType?: string;
  appType?: string;
  budget?: string;
  contactPreference?: string;
  howMet?: string;
  whatsappNumber?: string;
  phoneNumber?: string;
}

interface WhatsAppResponse {
  success: boolean;
  message: string;
  response?: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FormData = await request.json();

    console.log("Received form data:", body);

    const {
      name,
      email,
      message,
      projectType = "",
      websiteType = "",
      appType = "",
      budget = "",
      contactPreference = "",
      howMet = "",
      whatsappNumber = "",
      phoneNumber = "",
    } = body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email, and message are required fields",
        },
        { status: 400 }
      );
    }

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

    // Insert message into Supabase
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          from_name: name,
          email: email,
          subject: `${name} - ${projectType || "General"} Inquiry`,
          message: fullMessage,
          read: false,
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

    // ✅ FIX: ACTUALLY CALL THE WHATSAPP FUNCTION
    const whatsappResult = await sendWhatsAppNotification({
      name,
      email,
      projectType,
      budget,
      contactPreference,
      phone: phoneNumber || whatsappNumber || "",
      message: fullMessage.substring(0, 500), // Truncate if too long
    });

    console.log("WhatsApp notification result:", whatsappResult);

    return NextResponse.json({
      success: true,
      data,
      whatsapp: {
        sent: whatsappResult.success,
        message: whatsappResult.message,
      },
      message: "Message sent successfully!",
      adminUrl: "https://boyalonetechs.onrender.com/admin",
    });
  } catch (error: unknown) {
    console.error("API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error: " + errorMessage,
      },
      { status: 500 }
    );
  }
}

// Updated WhatsApp notification function
async function sendWhatsAppNotification(formData: {
  name: string;
  email: string;
  projectType?: string;
  budget?: string;
  contactPreference?: string;
  phone?: string;
  message: string;
}): Promise<WhatsAppResponse> {
  try {
    console.log("=== SENDING WHATSAPP NOTIFICATION ===");

    const YOUR_WHATSAPP_NUMBER = process.env.YOUR_WHATSAPP_NUMBER;
    const CALLMEBOT_API_KEY = process.env.CALLMEBOT_API_KEY;

    if (!YOUR_WHATSAPP_NUMBER) {
      console.log("❌ WhatsApp notifications disabled - no phone number");
      return {
        success: false,
        message: "WhatsApp phone number not configured",
      };
    }

    if (!CALLMEBOT_API_KEY) {
      console.log("❌ WhatsApp notifications disabled - no API key");
      return {
        success: false,
        message: "WhatsApp API key not configured",
      };
    }

    console.log("📱 Phone number:", YOUR_WHATSAPP_NUMBER);
    console.log("🔑 API key exists:", CALLMEBOT_API_KEY ? "Yes" : "No");

    // Clean phone number
    const cleanPhone = YOUR_WHATSAPP_NUMBER.replace(/[+\s]/g, "");
    console.log("🔧 Cleaned phone:", cleanPhone);

    // Create WhatsApp message
    const whatsappMessage = `📱 NEW MESSAGE FROM ADMIN

👤 Name: ${formData.name}
📧 Email: ${formData.email}
  
You have a new project message check your dashboard


🔗 Admin: https://boyalonetechs.onrender.com/admin
⏰ ${new Date().toLocaleTimeString("en-US", {
      timeZone: "Africa/Lagos",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    console.log("💬 Message to send:", whatsappMessage);
    console.log("📏 Message length:", whatsappMessage.length);

    // URL encode
    const encodedMessage = encodeURIComponent(whatsappMessage);
    console.log("🔗 Encoded length:", encodedMessage.length);

    // Build API URL
    const apiUrl = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&text=${encodedMessage}&apikey=${CALLMEBOT_API_KEY}`;

    // Log truncated URL for debugging
    console.log("🌐 API URL (truncated):", apiUrl.substring(0, 150) + "...");

    // Send request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      console.log("⏰ Request timeout after 15 seconds");
    }, 15000);

    const response = await fetch(apiUrl, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/plain",
      },
    });

    clearTimeout(timeoutId);

    const responseText = await response.text();

    console.log("📨 Response status:", response.status);
    console.log("📨 Response text:", responseText.substring(0, 200));

    if (response.ok) {
      if (
        responseText.includes("Message sent") ||
        responseText.includes("OK") ||
        responseText.toLowerCase().includes("success") ||
        responseText === ""
      ) {
        console.log("✅ WhatsApp notification sent successfully!");
        return {
          success: true,
          message: "WhatsApp sent successfully",
          response: responseText,
        };
      } else {
        console.warn("⚠️ Unexpected response:", responseText);
        return {
          success: false,
          message: "Unexpected response from WhatsApp API",
          response: responseText,
        };
      }
    } else {
      console.error("❌ WhatsApp API error:", response.status, responseText);
      return {
        success: false,
        message: `WhatsApp API error: ${response.status}`,
        response: responseText,
      };
    }
  } catch (error: unknown) {
    console.error("💥 WhatsApp notification failed:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    if (error instanceof Error && error.name === "AbortError") {
      return {
        success: false,
        message: "WhatsApp request timeout",
        error: errorMessage,
      };
    }

    return {
      success: false,
      message: "WhatsApp send failed",
      error: errorMessage,
    };
  }
}

// Optional: GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Contact API is running",
    whatsappConfigured: !!(
      process.env.YOUR_WHATSAPP_NUMBER && process.env.CALLMEBOT_API_KEY
    ),
    timestamp: new Date().toISOString(),
  });
}
