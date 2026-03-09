import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || null,
          service: service || null,
          message,
          source: "deepmetric.fit",
          timestamp: new Date().toISOString(),
        }),
      });
    } else {
      console.log("[contact] N8N_WEBHOOK_URL not set. Lead:", {
        name,
        email,
        phone,
        service,
        message,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
