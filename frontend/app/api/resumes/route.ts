import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, data } = body;
    if (!id || !data) return NextResponse.json({ error: "missing id or data" }, { status: 400 });

    const repoRoot = process.cwd();
    const filePath = path.join(repoRoot, "public", "resumes", `${id}.json`);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");

    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to save resume:", err);
    return NextResponse.json({ error: "write_failed" }, { status: 500 });
  }
}
