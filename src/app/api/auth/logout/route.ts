import { NextRequest, NextResponse } from "next/server";
import { logoutUser } from "@/lib/controllers/auth.controller";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) throw new Error("NOT_AUTHENTICATED");

    // Decode JWT to get user email
    const payload: any = jwt.decode(token);
    const userId = payload?.user_id;
    if (!userId) throw new Error("INVALID_TOKEN");

    const data = await logoutUser(userId);

    const res = NextResponse.json(data);
    res.cookies.delete("accessToken");
    res.cookies.delete("refreshToken");

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
