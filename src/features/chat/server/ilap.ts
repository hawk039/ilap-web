import type { IlapChatRequest, IlapChatResponse } from "../types";

const ilapApiBaseUrl =
  process.env.ILAP_API_BASE_URL ?? "https://ilap-backend.onrender.com";
const ilapAskPath = process.env.ILAP_API_ASK_PATH ?? "/ask";

function buildIlapUrl() {
  return new URL(ilapAskPath, ilapApiBaseUrl).toString();
}

export async function askIlap(request: IlapChatRequest): Promise<IlapChatResponse> {
  const response = await fetch(buildIlapUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const failureText = await response.text();
    throw new Error(
      failureText || `ILAP request failed with status ${response.status}`,
    );
  }

  const parsedResponse = (await response.json()) as IlapChatResponse;

  return {
    ...parsedResponse,
    sessionId: parsedResponse.sessionId || request.sessionId,
    turnId: parsedResponse.turnId ?? parsedResponse.contextTurnId,
    citations: parsedResponse.citations ?? [],
    proof: {
      reasoning: parsedResponse.proof?.reasoning ?? "",
      sources: parsedResponse.proof?.sources ?? [],
    },
  };
}
