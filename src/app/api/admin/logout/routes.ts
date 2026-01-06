import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { adminLogout } from "@/lib/controllers/admin.controller";


export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { user_id: number; role: string };

    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Not an admin" },
        { status: 403 }
      );
    }

    await adminLogout(decoded.user_id);

    const res = NextResponse.json({
      message: "Admin logged out successfully",
    });

    res.cookies.delete("accessToken");
    res.cookies.delete("refreshToken");

    return res;
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
