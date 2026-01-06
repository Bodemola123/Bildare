import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie(req);
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const dbUser = await prisma.user.findUnique({
      where: { user_id: user.user_id },
      include: { profile: true },
    });

    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({
      message: `Welcome ${dbUser.email}`,
      role: dbUser.role,
      user_id: dbUser.user_id,
      username: dbUser.username,
      profile: dbUser.profile,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
