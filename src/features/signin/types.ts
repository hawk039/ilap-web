import type { AppIconName } from "@/shared/icons/AppIcon";

export type SignInViewModel = {
  brand: {
    name: string;
    icon: AppIconName;
  };
  navigation: Array<{
    label: string;
    href: string;
  }>;
  headerAction: {
    label: string;
    href: string;
  };
  hero: {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    socialProofLabel: string;
    avatars: Array<{
      src: string;
      alt: string;
    }>;
  };
  form: {
    title: string;
    subtitle: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    forgotPasswordHref: string;
    rememberMeLabel: string;
    submitLabel: string;
    requestAccessLabel: string;
    requestAccessHref: string;
    footerLinks: Array<{
      label: string;
      href: string;
    }>;
  };
  footer: {
    copyright: string;
    systemStatus: string;
  };
};

export type SignInSubmission = {
  email: string;
  password: string;
};
