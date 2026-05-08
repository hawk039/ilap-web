export const chatContent = {
  emptyState: {
    eyebrow: "ILAP Conversational Research",
    title: "Choose a conversation to continue",
    description:
      "Start from the dashboard to open a new legal category conversation, or jump back into an existing thread below.",
    primaryLabel: "Go to categories",
    secondaryTitle: "Recent conversations",
    noConversations: "No saved conversations yet.",
  },
  activeState: {
    title: "Legal research assistant",
    subtitle: "Continue this backend-backed legal conversation.",
    newConversationLabel: "Back to categories",
    composerPlaceholder: "Ask a follow-up question...",
    submitLabel: "Send",
    helperText:
      "Responses are informational and should be reviewed with a qualified legal professional.",
    loadingLabel: "ILAP is preparing a response...",
  },
  responseLabels: {
    confidence: "Confidence",
    citations: "Citations",
    proof: "Proof and reasoning",
    supportingSources: "Supporting sources",
    noCitations: "No citations returned for this answer.",
    noProof: "No proof details were returned for this answer.",
  },
  errors: {
    missingLawType: "Choose a legal category before starting a conversation.",
    missingConversation: "Open a conversation before sending a question.",
    emptyQuery: "Enter a question before sending it to ILAP.",
    failedRequest: "ILAP could not answer right now. Please try again.",
  },
} as const;
