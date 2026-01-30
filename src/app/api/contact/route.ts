import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: ["delivered@resend.dev"], // Resend test inbox
    subject: "Test email from production",
    html: "<p>This is a production test email.</p>",
  });

  return NextResponse.json({ ok: true });
}
