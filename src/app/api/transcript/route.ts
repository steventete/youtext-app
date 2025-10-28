import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "Missing YouTube URL." },
        { status: 400 },
      );
    }

    const apiKey = process.env.SUPADATA_KEY;
    const apiUrl = `https://api.supadata.ai/v1/transcript?url=${encodeURIComponent(
      url,
    )}`;

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: { "x-api-key": apiKey },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Supadata API error:", errorText);
      return NextResponse.json(
        { error: `Supadata API error: ${res.statusText}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 },
    );
  }
}
