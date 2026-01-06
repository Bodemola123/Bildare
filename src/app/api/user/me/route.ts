import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth"; // helper to decode JWT from cookies

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie(req);
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const dbUser = await prisma.user.findUnique({
      where: { user_id: user.user_id },
      include: {
        profile: true,
        referredBy: { select: { user_id: true, username: true, email: true } },
      },
    });

    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const referralCount = await prisma.user.count({ where: { referred_by: user.user_id } });

    return NextResponse.json({
      user_id: dbUser.user_id,
      email: dbUser.email,
      username: dbUser.username,
      role: dbUser.role,
      interests: dbUser.interests || null,
      referralCode: dbUser.referralCode || null,
      referred_by: dbUser.referred_by || null,
      referredBy: dbUser.referredBy || null,
      referralCount,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      profile: dbUser.profile,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
