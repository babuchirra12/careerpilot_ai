import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8081";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const url = search
    ? `${BACKEND_URL}/api/jobs?search=${encodeURIComponent(search)}`
    : `${BACKEND_URL}/api/jobs`;

  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "Backend service unavailable" },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization");
  try {
    const body = await request.json();
    const res = await fetch(`${BACKEND_URL}/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "Backend service unavailable" },
      { status: 503 }
    );
  }
}
