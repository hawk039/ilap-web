export const chatContent = {
  emptyState: {
    eyebrow: "ILAP Conversational Research",
    title: "Choose a legal category to begin",
    description:
      "Start from the dashboard so ILAP can attach the correct law type to your conversation and keep the context across follow-up questions.",
    primaryLabel: "Go to categories",
  },
  activeState: {
    title: "Legal research assistant",
    subtitle:
      "ILAP carries the latest turn context for follow-up questions inside the same conversation.",
    newConversationLabel: "New conversation",
    composerPlaceholder: "Ask a question about this legal category...",
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
    emptyQuery: "Enter a question before sending it to ILAP.",
    failedRequest: "ILAP could not answer right now. Please try again.",
  },
} as const;
