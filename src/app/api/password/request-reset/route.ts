import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTokenEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 400 });

    const today = new Date().toISOString().split("T")[0];
    const lastRequestDay = user.otp_request_date?.toISOString().split("T")[0];
    let requestCount = user.otp_request_count || 0;
    if (today !== lastRequestDay) requestCount = 0;

    if (requestCount >= 5) {
      return NextResponse.json({
        error: "Maximum password reset requests reached. Try again tomorrow."
      }, { status: 429 });
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await prisma.user.update({
      where: { email: normalizedEmail },
      data: {
        reset_password_token: token,
        reset_password_expires: expires,
        otp_request_count: requestCount + 1,
        otp_request_date: new Date(),
      },
    });

    await sendTokenEmail(normalizedEmail, token);

    return NextResponse.json({ message: "Password reset token sent to email." });
  } catch (err) {
    console.error("Request password reset error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
