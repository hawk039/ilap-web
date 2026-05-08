import type { AppIconName } from "@/shared/icons/AppIcon";

export type SignupIconName = AppIconName;

export type SignupNavigationItem = {
  label: string;
  href: string;
};

export type SignupActionLink = {
  label: string;
  href: string;
};

export type SignupHero = {
  badge: string;
  titlePrefix: string;
  titleAccent: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
};

export type SignupField = {
  id: "name" | "email" | "password";
  label: string;
  placeholder: string;
  type: "text" | "email" | "password";
  icon: SignupIconName;
  trailingIcon?: SignupIconName;
};

export type SignupFieldViewModel = SignupField & {
  autoComplete: "name" | "email" | "new-password";
};

export type SignupForm = {
  title: string;
  subtitle: string;
  fields: SignupFieldViewModel[];
  terms: {
    id: string;
    copyBefore: string;
    termsLabel: string;
    termsHref: string;
    privacyLabel: string;
    privacyHref: string;
    copyAfter: string;
  };
  submitLabel: string;
  alternatePrompt: string;
  alternateAction: SignupActionLink;
};

export type SignupViewModel = {
  brand: {
    name: string;
    icon: SignupIconName;
  };
  navigation: SignupNavigationItem[];
  headerAction: SignupActionLink;
  hero: SignupHero & {
    title: string;
  };
  form: SignupForm;
  footer: string;
};

export type SignupSubmission = {
  name: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
};
