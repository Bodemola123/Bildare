import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, token } = await req.json();
    if (!email || !token) return NextResponse.json({ error: "Email and token required" }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 400 });

    if (!user.reset_password_token || user.reset_password_token !== token || new Date() > user.reset_password_expires) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    return NextResponse.json({ message: "Token is valid. You can now reset your password." });
  } catch (err) {
    console.error("Verify reset token error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
