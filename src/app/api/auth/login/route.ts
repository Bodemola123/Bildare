import { loginUser } from "@/lib/controllers/auth.controller";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const data = await loginUser(email, password);

    const res = NextResponse.json({
      user: {
        user_id: data.user.user_id,
        email: data.user.email,
        username: data.user.username,
        role: data.user.role,
      },
    });

    const isProd = process.env.NODE_ENV === "production";

    // Access token (short-lived)
    res.cookies.set("accessToken", data.user.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    // Refresh token (long-lived)
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
      { error: err.message || "Login failed" },
      { status: 400 }
    );
  }
}
