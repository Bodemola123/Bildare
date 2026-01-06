import { completeUserProfile } from "@/lib/controllers/auth.controller";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await completeUserProfile(body);

    const res = NextResponse.json({
      message: "Profile completed successfully!",
      user: {
        user_id: data.user.user_id,
        username: data.user.username,
        role: data.user.role,
        referralCode: data.user.referralCode,
        profile: data.user.profile,
      },
    });

    const isProd = process.env.NODE_ENV === "production";

    // Access token
    res.cookies.set("accessToken", data.user.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    // Refresh token
    res.cookies.set("refreshToken", data.user.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Profile completion failed" },
      { status: 400 }
    );
  }
}
