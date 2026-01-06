import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, user_name, events, page_path } = body;

    if (!events || !Array.isArray(events)) {
      return NextResponse.json(
        { success: false, error: "Events array required" },
        { status: 400 }
      );
    }

    // ✅ Get client IP (Vercel / proxies safe)
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";

    // ✅ Build GA4 Measurement Protocol payload
    const payload = {
      client_id: user_id || crypto.randomUUID(),
      user_id,
      user_properties: {
        user_name: { value: user_name || "Guest" },
      },
      ip_override: clientIp,
      events: events.map((e: any) => ({
        name: e.name,
        params: {
          ...e.params,
          ...(page_path ? { page_path } : {}),
        },
      })),
    };

    const gaUrl = `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`;

    const gaResponse = await fetch(gaUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!gaResponse.ok) {
      const text = await gaResponse.text();
      console.error("GA proxy error:", text);

      return NextResponse.json(
        { success: false, error: text },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error("GA proxy exception:", err);

    return NextResponse.json(
      { success: false, error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
