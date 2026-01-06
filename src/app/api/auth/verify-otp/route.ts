import { NextRequest, NextResponse } from "next/server";
import { verifyUserOtp } from "@/lib/controllers/auth.controller";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();
    const data = await verifyUserOtp(email, otp);

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
