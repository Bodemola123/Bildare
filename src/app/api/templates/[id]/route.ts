import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Dynamic route: /api/templates/[id]
export async function GET(
  req: Request,
  { params }: { params: { id: string } } // correctly typed inline
) {
  try {
    const { id } = params; // destructure id

    const templateRaw = await prisma.template.findUnique({
      where: { template_id: id },
      include: {
        media: true,    // all media
        usecases: true, // all usecases
      },
    });

    if (!templateRaw) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    // Find cover image
    const coverMedia = templateRaw.media.find((m) => m.media_type === "cover");

    // Flatten usecases to strings
    const usecases = templateRaw.usecases.map((u) => u.title);

    const template = {
      template_id: templateRaw.template_id,
      title: templateRaw.title,
      price: templateRaw.price,
      description: templateRaw.description,
      cover: coverMedia ? coverMedia.url : null,
      media: templateRaw.media, // include full media array for modal
      usecases,
      example_links: templateRaw.example_links || null,
    };

    return NextResponse.json(template); // send template directly
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
