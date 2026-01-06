import { NextRequest, NextResponse } from "next/server";
import { sendContactMessage } from "@/lib/controllers/contact.controller";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await sendContactMessage(body);

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.message === "ALL_FIELDS_REQUIRED" ? 400 : 500 }
    );
  }
}
