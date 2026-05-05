import { NextResponse } from "next/server";
import { askIlap } from "@/features/chat/server/ilap";
import type { IlapChatRequest } from "@/features/chat/types";

function isValidChatRequest(value: unknown): value is IlapChatRequest {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<IlapChatRequest>;

  return (
    typeof candidate.query === "string" &&
    typeof candidate.lawType === "string" &&
    typeof candidate.sessionId === "string" &&
    (candidate.contextTurnId === undefined ||
      typeof candidate.contextTurnId === "string")
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;

    if (!isValidChatRequest(body)) {
      return NextResponse.json(
        { error: "Invalid ILAP chat request payload." },
        { status: 400 },
      );
    }

    const payload: IlapChatRequest = {
      query: body.query.trim(),
      lawType: body.lawType.trim(),
      sessionId: body.sessionId.trim(),
      contextTurnId: body.contextTurnId?.trim() || undefined,
    };

    if (!payload.query || !payload.lawType || !payload.sessionId) {
      return NextResponse.json(
        { error: "Query, law type, and session id are required." },
        { status: 400 },
      );
    }

    const response = await askIlap(payload);

    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to reach ILAP.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
