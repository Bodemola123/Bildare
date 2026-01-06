import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    if (!code) throw new Error("CODE_NOT_PROVIDED");

    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth/google/callback`,
        grant_type: "authorization_code",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { id_token } = tokenResponse.data;
    const userInfo = jwt.decode(id_token) as any;

    const email = userInfo.email.toLowerCase();
    const username = userInfo.name.replace(/\s/g, "_");
    
    // Find or create user in DB
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          username,
          role: "user",
          is_verified: true,
          profile: { create: {} },
        },
      });
    }

    const accessToken = jwt.sign(  {
    user_id: user.user_id,
    email: user.email,
    role: user.role,
    username: user.username,
  }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    const refreshToken = jwt.sign(  {
    user_id: user.user_id,
    email: user.email,
    role: user.role,
    username: user.username,
  }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

const res = NextResponse.redirect("https://bildare.vercel.app/");

const isProduction = process.env.NODE_ENV === "production";

res.cookies.set("accessToken", accessToken, {
  httpOnly: true,
  path: "/",
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 60 * 60, // 1 hour
});

res.cookies.set("refreshToken", refreshToken, {
  httpOnly: true,
  path: "/",
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60, // 7 days
});


    return res;
  } catch (err) {
    console.error("Google OAuth callback error:", err);
    return NextResponse.redirect("/auth?error=oauth_failed");
  }
}
