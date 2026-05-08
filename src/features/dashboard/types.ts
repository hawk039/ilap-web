import type { LegalCategory } from "@/lib/api/types";

export type DashboardViewModel = {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  searchPlaceholder: string;
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
  footerStats: Array<{
    value: string;
    label: string;
  }>;
};

export type DashboardCategory = LegalCategory & {
  accent?: "primary" | "secondary";
  code?: string;
  highlightLabel?: string;
  precedentCount?: string;
};
