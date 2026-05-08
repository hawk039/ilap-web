import { routes } from "@/lib/routes";
import type { ForgotPasswordViewModel } from "./types";

export const forgotPasswordContent: ForgotPasswordViewModel = {
  brand: {
    name: "ILAP",
    icon: "gavel",
  },
  headerLinks: {
    helpCenter: {
      label: "Help Center",
      href: routes.helpCenter,
      icon: "helpOutline",
    },
    support: {
      label: "Support",
      href: routes.support,
    },
  },
  content: {
    icon: "lockReset",
    title: "Forgot Password",
    description:
      "No worries, it happens. Enter your email below to receive secure reset instructions.",
    emailLabel: "Email Address",
    emailPlaceholder: "name@company.com",
    submitLabel: "Send Reset Link",
    backToLoginLabel: "Back to Login",
    backToLoginHref: routes.signIn,
    backToLoginIcon: "keyboardBackspace",
  },
  footer: {
    copyright: "© 2024 ILAP Platform. All rights reserved.",
    privacyLabel: "Privacy Policy",
    privacyHref: routes.privacy,
  },
};
