export type ApiErrorPayload = {
  error: {
    code: string;
    message: string;
  };
  requestId?: string;
};

export type SessionTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  emailVerifiedAt: string | null;
};

export type AuthResponse = {
  user: AuthUser;
  session: SessionTokens;
};

export type SessionResponse = {
  user: AuthUser;
};

export type UserProfile = AuthUser & {
  avatarUrl?: string | null;
  organization?: string | null;
  jurisdiction?: string | null;
  preferredPracticeAreas?: string[];
  notificationPreferences?: {
    productUpdates: boolean;
    supportFollowups: boolean;
    securityAlerts: boolean;
  };
};

export type LegalCategory = {
  id: string;
  name: string;
  lawType: string;
  description: string;
  icon: string;
  isActive?: boolean;
  sortOrder?: number;
};

export type ConversationSummary = {
  id: string;
  title: string;
  lawType: string;
  status: string;
  lastMessageAt?: string | null;
  lastMessagePreview?: string | null;
  createdAt?: string;
};

export type ConversationMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  disclaimer?: string | null;
  citations?: Array<{
    act: string;
    section: string;
    effective_from?: string;
  }>;
  categoryNote?: string | null;
  createdAt: string;
};

export type AskConversationResponse = {
  conversationId: string;
  messageId: string;
  answer: string;
  disclaimer?: string | null;
  categoryNote?: string | null;
  returnedTurnId?: string | null;
  createdAt: string;
};

export type SupportRequestResponse = {
  id: string;
  type: "contact" | "support" | "early_access";
  status: string;
  createdAt: string;
};
