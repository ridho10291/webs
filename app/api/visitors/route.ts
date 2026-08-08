import { NextRequest, NextResponse } from "next/server";
import { getVisitors, incrementVisitors } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = await getVisitors();
    return NextResponse.json({ ok: true, data: { count } });
  } catch (error) {
    console.error("visitors GET error:", error);
    return NextResponse.json({ ok: false, error: "Gagal membaca counter" }, { status: 500 });
  }
}

export async function POST(_req: NextRequest) {
  try {
    const count = await incrementVisitors();
    return NextResponse.json({ ok: true, data: { count } });
  } catch (error) {
    console.error("visitors POST error:", error);
    return NextResponse.json({ ok: false, error: "Gagal update counter" }, { status: 500 });
  }
}