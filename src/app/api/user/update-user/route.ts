import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  try {
    const user = await getUserFromCookie(req);
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const body = await req.json();
    const { username, interests, avatar_url } = body;

    const dbUser = await prisma.user.findUnique({ where: { user_id: user.user_id } });
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Username change cooldown
    if (username && username !== dbUser.username) {
      const existing = await prisma.user.findFirst({
        where: { username, NOT: { user_id: user.user_id } },
      });
      if (existing) return NextResponse.json({ error: "Username already taken" }, { status: 400 });

      if (dbUser.username_last_changed) {
        const lastChange = new Date(dbUser.username_last_changed);
        const diffDays = (Date.now() - lastChange.getTime()) / (1000 * 60 * 60 * 24);
        if (diffDays < 30) {
          return NextResponse.json({
            error: `Username can only be changed once every 30 days. Try again in ${Math.ceil(30 - diffDays)} day(s).`
          }, { status: 400 });
        }
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { user_id: user.user_id },
      data: {
        username: username ?? undefined,
        interests: interests ?? undefined,
        username_last_changed: username && username !== dbUser.username ? new Date() : undefined,
      },
    });

    const updatedProfile = await prisma.userProfile.update({
      where: { user_id: user.user_id },
      data: { avatar_url: avatar_url ?? undefined },
    });

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      user: { ...updatedUser, profile: updatedProfile },
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 });
  }
}
