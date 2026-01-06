import { adminLogin } from "@/lib/controllers/admin.controller";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const admin = await adminLogin(email, password);

    const res = NextResponse.json({
      message: "Admin login successful",
      user: admin,
    });

    res.cookies.set("accessToken", admin.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    res.cookies.set("refreshToken", admin.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res;
  } catch (err: any) {
    const map: Record<string, number> = {
      EMAIL_PASSWORD_REQUIRED: 400,
      ADMIN_NOT_FOUND: 400,
      INVALID_PASSWORD: 400,
      NOT_AN_ADMIN: 403,
    };

    return NextResponse.json(
      { error: err.message },
      { status: map[err.message] || 500 }
    );
  }
}
