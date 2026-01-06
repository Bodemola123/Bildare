import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { getUserFromCookie } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  try {
    const user = await getUserFromCookie(req);
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const body = await req.json();
    const { old_password, new_password, confirm_password } = body;

    if (!old_password || !new_password || !confirm_password) {
      return NextResponse.json({ error: "All password fields are required" }, { status: 400 });
    }
    if (new_password !== confirm_password) {
      return NextResponse.json({ error: "New passwords do not match" }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({ where: { user_id: user.user_id } });
    if (!dbUser || !dbUser.password_hash) {
      return NextResponse.json({ error: "Password change not allowed" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(old_password, dbUser.password_hash);
    if (!isMatch) return NextResponse.json({ error: "Old password is incorrect" }, { status: 400 });

    const isSameAsOld = await bcrypt.compare(new_password, dbUser.password_hash);
    if (isSameAsOld) return NextResponse.json({ error: "New password cannot be the same as old password" }, { status: 400 });

    const hashedNewPassword = await bcrypt.hash(new_password, 10);

    await prisma.user.update({
      where: { user_id: user.user_id },
      data: { password_hash: hashedNewPassword },
    });

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 });
  }
}
