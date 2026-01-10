// app/api/categories/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        category_id: true,
        name: true,
        slug: true,
        description: true,
        _count: { select: { templates: true } }, // optional: number of templates
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ categories });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
