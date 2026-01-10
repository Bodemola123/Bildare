import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ✅ IMPORTANT

    const templateRaw = await prisma.template.findUnique({
      where: { template_id: id },
      include: {
        media: true,
        usecases: true,
      },
    });

    if (!templateRaw) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

const coverMedia = templateRaw.media.find(
  (m: { media_type: string }) => m.media_type === "cover"
);

const usecases = templateRaw.usecases.map(
  (u: { title: string }) => u.title
);


    return NextResponse.json({
      template_id: templateRaw.template_id,
      title: templateRaw.title,
      price: templateRaw.price,
      description: templateRaw.description,
      cover: coverMedia?.url ?? null,
      media: templateRaw.media,
      usecases,
      example_links: templateRaw.example_links ?? null,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
