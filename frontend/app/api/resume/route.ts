import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8081";

function authHeaders(request: NextRequest) {
  const token = request.headers.get("Authorization");
  return token ? { Authorization: token } : {};
}

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/resumes`, {
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(request),
      },
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
  try {
    const body = await request.json();
    const res = await fetch(`${BACKEND_URL}/api/resumes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(request),
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
