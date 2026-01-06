import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getUserFromCookie(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value; // ✅ FIXED
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
      role: string;
      user_id: number;
      username?: string;
      accessToken: string;
      refreshToken: string;
    };
  } catch {
    return null;
  }
}
