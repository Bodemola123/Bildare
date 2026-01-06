import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    if (!code) throw new Error("CODE_NOT_PROVIDED");

    // 1️⃣ Exchange code for GitHub access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code,
      },
      { headers: { Accept: "application/json" } }
    );

    const { access_token } = tokenResponse.data;
    if (!access_token) throw new Error("GITHUB_TOKEN_ERROR");

    // 2️⃣ Fetch user info from GitHub API
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${access_token}` },
    });

    const emailResponse = await axios.get("https://api.github.com/user/emails", {
      headers: { Authorization: `token ${access_token}` },
    });

    const githubUser = userResponse.data;
    const primaryEmail = emailResponse.data.find((e: any) => e.primary)?.email;

    const email = (primaryEmail || githubUser.email).toLowerCase();
    const username = githubUser.login;

    // 3️⃣ Find or create user in Prisma
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

    // 4️⃣ Generate JWT tokens for your app
    const accessToken = jwt.sign(
  {
    user_id: user.user_id,
    email: user.email,
    role: user.role,
    username: user.username,
  },
  process.env.JWT_SECRET!,
  { expiresIn: "1h" }
);


    const refreshToken = jwt.sign(
        {
    user_id: user.user_id,
    email: user.email,
    role: user.role,
    username: user.username,
  },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    // 5️⃣ Set cookies & redirect to frontend
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
    console.error("GitHub OAuth callback error:", err);
    return NextResponse.redirect("/auth?error=oauth_failed");
  }
}
