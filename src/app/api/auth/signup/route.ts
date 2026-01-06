import { signupUser } from "@/lib/controllers/auth.controller";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  console.log("🔥 SIGNUP ROUTE HIT");
   console.log("🟢 SIGNUP HIT", req.cookies.getAll());

  try {
    const { email, password } = await req.json();
    const data = await signupUser(email, password);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("❌ SIGNUP ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
