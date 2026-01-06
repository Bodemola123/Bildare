import { NextRequest, NextResponse } from "next/server";
import { resendOtpForUser } from "@/lib/controllers/auth.controller";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const data = await resendOtpForUser(email);

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
