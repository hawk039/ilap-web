import type {
  AskConversationResponse,
  ConversationMessage,
  ConversationSummary,
} from "@/lib/api/types";

export type ChatMessage = ConversationMessage;

export type ChatConversation = ConversationSummary;

export type ChatState = {
  composerValue: string;
  conversation: ChatConversation | null;
  conversations: ChatConversation[];
  errorMessage: string;
  isLoadingConversation: boolean;
  isLoadingConversations: boolean;
  isSubmitting: boolean;
  messages: ChatMessage[];
  setComposerValue: (value: string) => void;
  submitQuery: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export type AskResult = AskConversationResponse;
