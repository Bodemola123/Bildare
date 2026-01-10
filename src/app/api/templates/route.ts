import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const categorySlug = req.nextUrl.searchParams.get("category"); // optional query param

    const category = categorySlug
      ? await prisma.category.findUnique({ where: { slug: categorySlug } })
      : null;

    // Fetch templates with tags, usecases, and all media
    const templatesRaw = await prisma.template.findMany({
      where: category ? { category_id: category.category_id } : {},
      select: {
        template_id: true,
        title: true,
        price: true,
        updated_at: true,
        stack: true,
        media: {
          select: { url: true, media_type: true, order_index: true },
          orderBy: { order_index: "asc" },
        },
        tags: {
          select: {
            tag: { select: { name: true } },
          },
        },
        usecases: {
          select: { title: true },
        },
      },
      orderBy: { updated_at: "desc" },
    });

    // Flatten tags and usecases for frontend
const templates = templatesRaw.map(
  (t: any) => ({
    ...t,
    tags: t.tags.map((tagOnTemplate: any) => tagOnTemplate.tag.name),
    usecases: t.usecases.map((uc: any) => uc.title),
  })
);


    return NextResponse.json({ templates });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
