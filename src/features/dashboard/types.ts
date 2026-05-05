import type { AppIconName } from "@/shared/icons/AppIcon";

export type DashboardCategory = {
  id: string;
  title: string;
  lawType: string;
  description: string;
  precedentCount: string;
  code: string;
  icon: AppIconName;
  accent?: "primary" | "secondary";
  highlightLabel?: string;
};

export type DashboardViewModel = {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  searchPlaceholder: string;
  categories: DashboardCategory[];
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
