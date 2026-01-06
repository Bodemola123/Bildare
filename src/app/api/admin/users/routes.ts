import { deleteUser, getAllUsers } from "@/lib/controllers/admin.controller";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { user_id } = await req.json();
    const result = await deleteUser(user_id);
    return NextResponse.json(result);
  } catch (err: any) {
    if (err.message === "USER_ID_REQUIRED") {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    if (err.message === "USER_NOT_FOUND") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
