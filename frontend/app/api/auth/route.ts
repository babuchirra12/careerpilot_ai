import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8081";

export async function POST(request: NextRequest) {
  const { pathname } = new URL(request.url);

  try {
    const body = await request.json();
    const backendRes = await fetch(`${BACKEND_URL}${pathname}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json(
      { message: "Backend service unavailable. Please try again later." },
      { status: 503 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Auth API" });
}
