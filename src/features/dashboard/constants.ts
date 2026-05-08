import type { DashboardViewModel } from "./types";

export const dashboardContent: DashboardViewModel = {
  hero: {
    badge: "AI-Powered Research",
    title: "Explore Categories",
    description:
      "Access our specialized institutional legal databases. Each category is meticulously indexed with local precedents and current AI-summarized legal codes.",
  },
  searchPlaceholder: "Search precedents...",
  cta: {
    title: "Need Immediate Legal Help?",
    description:
      "Our verified legal consultants are available 24/7 for emergency research and critical procedural advice. Get connected within minutes.",
    primaryLabel: "Contact Human Expert",
    secondaryLabel: "View FAQs",
  },
  footerStats: [
    { value: "45k+", label: "Indexed Cases" },
    { value: "99.8%", label: "AI Accuracy" },
    { value: "12ms", label: "Query Latency" },
  ],
};
