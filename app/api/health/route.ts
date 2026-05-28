import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    service: "ilap-web",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
