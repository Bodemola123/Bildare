import { NextResponse } from "next/server";
import { Pool } from "pg";
import prisma from "@/lib/prisma"; // your Prisma client

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  try {
    const result = await pool.query(`SELECT sess FROM auth.session`);
    const users: Array<any> = [];

    for (const row of result.rows) {
      const session = row.sess;

      if (session?.user) {
        // Check if user still exists in DB
        const userExists = await prisma.user.findUnique({
          where: { user_id: session.user.user_id },
          select: { user_id: true, email: true, username: true, role: true },
        });

        if (!userExists) continue;

        users.push({
          user_id: userExists.user_id,
          email: userExists.email,
          username: userExists.username,
          role: userExists.role,
        });
      }
    }

    return NextResponse.json({
      activeCount: users.length,
      activeUsers: users,
    });
  } catch (err) {
    console.error("Error getting active users:", err);
    return NextResponse.json({ error: "Could not fetch active users" }, { status: 500 });
  }
}
