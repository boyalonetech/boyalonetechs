// app/api/contact/route.ts
export const runtime = "nodejs"; // important for nodemailer

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    name,
    email,
    text,
    message,
    howMet,
    websiteType,
    appType,
    budget,
    contactPreference,
  } = await req.json();

  if (
    !name ||
    !email ||
    !message ||
    !text ||
    !howMet ||
    !budget ||
    !websiteType ||
    !appType ||
    !contactPreference
  ) {
    return NextResponse.json(
      { success: false, error: "Fill In the required fields." },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL!,
        pass: process.env.SMTP_PASSWORD!,
      },
    });

    const mailContent = `
New Contact Submission:

📛 Name: ${name}
📧 Email: ${email}
📍 Meet: ${howMet || "Not specified"}
💻 Website Type: ${websiteType || "Not specified"}
📞 Contact Type: ${text || "Not specified"}
📱 App Type: ${appType || "Not An App"}
💵 Budget: ${budget || "Not specified"}
☎️ Preferred Contact Method: ${contactPreference || "Not specified"}
📝 Message:
${message}
`;

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL!,
      to: process.env.SMTP_EMAIL!,
      subject: `Business Email From ${name}`,
      text: mailContent,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Message Not Sent:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
