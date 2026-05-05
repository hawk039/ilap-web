import type { DashboardViewModel } from "./types";

export const dashboardContent: DashboardViewModel = {
  hero: {
    badge: "AI-Powered Research",
    title: "Explore Categories",
    description:
      "Access our specialized institutional legal databases. Each category is meticulously indexed with local precedents and current AI-summarized legal codes.",
  },
  searchPlaceholder: "Search precedents...",
  categories: [
    {
      id: "criminal-law",
      title: "Criminal Law",
      lawType: "Criminal Law",
      description:
        "Research penal codes, procedural defenses, and historical verdict summaries for felony cases.",
      precedentCount: "1,240 Precedents",
      code: "Code: 100-CRIM",
      icon: "gavel",
    },
    {
      id: "property-law",
      title: "Property Law",
      lawType: "Property Law",
      description:
        "Real estate statutes, land disputes, zoning regulations, and digital asset ownership protocols.",
      precedentCount: "856 Precedents",
      code: "Code: 200-PROP",
      icon: "domain",
    },
    {
      id: "cyber-law",
      title: "Cyber Law",
      lawType: "Cyber Law",
      description:
        "Navigating data privacy, intellectual property in AI, and cross-border digital jurisdiction.",
      precedentCount: "420 Precedents",
      code: "New Acts Included",
      icon: "terminal",
      accent: "secondary",
      highlightLabel: "New Acts Included",
    },
    {
      id: "consumer-rights",
      title: "Consumer Rights",
      lawType: "Consumer Rights",
      description:
        "Trade practices, liability protection, and institutional compliance standards for consumer safety.",
      precedentCount: "2,110 Precedents",
      code: "Code: 400-CONS",
      icon: "shoppingBag",
    },
    {
      id: "employment-law",
      title: "Employment Law",
      lawType: "Employment Law",
      description:
        "Labor union regulations, discrimination protocols, and contractual obligations in the modern workforce.",
      precedentCount: "1,560 Precedents",
      code: "Code: 500-EMPL",
      icon: "work",
    },
    {
      id: "family-law",
      title: "Family Law",
      lawType: "Family Law",
      description:
        "Guardianship statutes, matrimonial litigation, and inheritance frameworks for institutional estates.",
      precedentCount: "945 Precedents",
      code: "Code: 600-FAMI",
      icon: "familyHistory",
    },
  ],
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
