import type { AppIconName } from "@/shared/icons/AppIcon";

export type ForgotPasswordViewModel = {
  brand: {
    name: string;
    icon: AppIconName;
  };
  headerLinks: {
    helpCenter: {
      label: string;
      href: string;
      icon: AppIconName;
    };
    support: {
      label: string;
      href: string;
    };
  };
  content: {
    icon: AppIconName;
    title: string;
    description: string;
    emailLabel: string;
    emailPlaceholder: string;
    submitLabel: string;
    backToLoginLabel: string;
    backToLoginHref: string;
    backToLoginIcon: AppIconName;
  };
  footer: {
    copyright: string;
    privacyLabel: string;
    privacyHref: string;
  };
};

export type ForgotPasswordSubmission = {
  email: string;
};
