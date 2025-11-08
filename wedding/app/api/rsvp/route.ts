// Next.js App Router API route for RSVP
// Proxies incoming RSVP JSON to a Google Apps Script Web App URL

export async function POST(req: Request) {
  try {
    const endpoint = process.env.RSVP_ENDPOINT;
    if (!endpoint) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing RSVP_ENDPOINT env var" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await req.json();
    const { name, additionalGuests, bringingDriver, attendance, userAgent } = data ?? {};

    // Basic validation
    if (!name || typeof name !== "string") {
      return new Response(
        JSON.stringify({ ok: false, error: "Name is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!attendance || (attendance !== "yes" && attendance !== "no")) {
      return new Response(
        JSON.stringify({ ok: false, error: "Attendance must be 'yes' or 'no'" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Relay to Apps Script (server-side, so no CORS issues)
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        additionalGuests: Number.isFinite(additionalGuests) ? additionalGuests : Number(additionalGuests) || 0,
        bringingDriver: !!bringingDriver,
        attendance,
        userAgent: userAgent || "server",
        receivedAt: new Date().toISOString(),
      }),
      // If your Apps Script responds slowly, you may raise the timeout via an external fetch client.
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: "Unexpected server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

