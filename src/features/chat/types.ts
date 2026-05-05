export type IlapChatRequest = {
  query: string;
  lawType: string;
  sessionId: string;
  contextTurnId?: string;
};

export type IlapCitation = {
  act: string;
  section: string;
  effective_from: string;
};

export type IlapProofSource = {
  act: string;
  section: string;
  text_snippet: string;
  relevance_score: number;
};

export type IlapProof = {
  sources: IlapProofSource[];
  reasoning: string;
};

export type IlapChatResponse = {
  answer: string;
  citations: IlapCitation[];
  confidence: number;
  disclaimer: string;
  sessionId: string;
  turnId?: string;
  contextTurnId?: string;
  category_note: string;
  proof: IlapProof;
};

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  lawType?: string;
  response?: IlapChatResponse;
};

export type ChatConversationSnapshot = {
  sessionId: string;
  lawType: string;
  contextTurnId: string | null;
  messages: ChatMessage[];
};
