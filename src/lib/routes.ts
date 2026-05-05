export const routes = {
  home: "/",
  dashboard: "/dashboard",
  about: "/about",
  chat: "/chat",
  legalCategories: "/legal-categories",
  legalResources: "/legal-resources",
  contact: "/contact",
  helpCenter: "/help-center",
  profile: "/profile",
  support: "/support",
  signIn: "/sign-in",
  forgotPassword: "/forgot-password",
  requestEarlyAccess: "/request-early-access",
  terms: "/terms",
  privacy: "/privacy",
  security: "/security",
} as const;

export function createChatRoute({
  lawType,
  sessionId,
}: {
  lawType: string;
  sessionId: string;
}) {
  const params = new URLSearchParams({
    lawType,
    sessionId,
  });

  return `${routes.chat}?${params.toString()}`;
}
