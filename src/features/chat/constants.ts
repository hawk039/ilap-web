import type { ChatViewModel } from "./types";

export const chatContent: ChatViewModel = {
  content: {
    title: "Legal Conversations",
    subtitle: "Review and manage your past AI legal consultations.",
    searchPlaceholder: "Search inquiries...",
    chats: [
      {
        id: "ipc-section-420",
        category: "Criminal Law",
        title: "Inquiry on IPC Section 420",
        preview:
          "Discussed the implications of cheating and dishonestly inducing delivery of property under the Indian Penal Code...",
        timestamp: "Oct 24, 2023 • 10:45 AM",
        isBookmarked: false,
      },
      {
        id: "property-registration-process",
        category: "Civil Law",
        title: "Property Registration Process",
        preview:
          "Detailed checklist for the registration of residential property in Karnataka including stamp duty calculations...",
        timestamp: "Oct 22, 2023 • 03:12 PM",
        isBookmarked: true,
        hasAiInsight: true,
      },
      {
        id: "tenant-eviction-notice-period",
        category: "Real Estate",
        title: "Tenant Eviction Notice Period",
        preview:
          "Legal requirements for serving a notice period to a residential tenant under the Model Tenancy Act...",
        timestamp: "Oct 19, 2023 • 11:20 AM",
        isBookmarked: false,
      },
      {
        id: "labor-law-compliance",
        category: "Corporate Law",
        title: "Labor Law Compliance for Startups",
        preview:
          "Overview of EPF, ESI, and Gratuity obligations for a software startup with more than 20 employees...",
        timestamp: "Oct 15, 2023 • 09:00 AM",
        isBookmarked: false,
      },
      {
        id: "defamation-case-filing",
        category: "Litigation",
        title: "Defamation Case Filing",
        preview:
          "Procedure for filing a civil defamation suit in high court including quantification of damages...",
        timestamp: "Oct 12, 2023 • 04:45 PM",
        isBookmarked: false,
      },
    ],
    emptyState: {
      title: "Need a specialized legal draft?",
      description:
        "Our AI can help you generate notice drafts, contracts, and legal summaries in seconds.",
      actionLabel: "Explore Templates",
    },
  },
};
