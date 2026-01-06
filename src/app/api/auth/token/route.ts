import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/controllers/auth.controller";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (!refreshToken) throw new Error("REFRESH_TOKEN_REQUIRED");

    const data = await refreshAccessToken(refreshToken);

    const res = NextResponse.json(data);
    // Set new access token
    res.cookies.set("accessToken", data.accessToken, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hour
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
