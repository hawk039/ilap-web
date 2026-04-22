import { routes } from "@/lib/routes";
import type { SignupViewModel } from "./types";

export const signupContent: SignupViewModel = {
  brand: {
    name: "ILAP",
    icon: "gavel",
  },
  navigation: [
    { label: "About", href: routes.about },
    { label: "Contact", href: routes.contact },
  ],
  headerAction: {
    label: "Sign In",
    href: routes.signIn,
  },
  hero: {
    badge: "International Standards",
    titlePrefix: "Empowering Global",
    titleAccent: "Justice",
    title: "Empowering Global Justice",
    description:
      "Join a community of legal professionals dedicated to providing world-class assistance and resources across international borders.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA1gTI7JVM4Y29Sy1hn2_tKxAoDxr5LBC5JH4lc-XRJef3DUvfD8UkHX2eV7R6zteSsPJwNbFf-J1UUY-wbiIoJgumD54_ek8FmnwwrtH9Ib45NP5tDRLTR9AJCbMQXdTODH2N6fhv1zPJDC9s5eCFuxpeWMnM1shWPHgohokLOn3aWJKEBptinuyFkHGDCzDMW3xWY0DtVl8ewum7VOPOHX3-Q3wZOPTfbeMAC_ZyAg9wDUeZrdXzfGzeSxz4M8SwzmDGr8yaseD4",
    imageAlt: "Grand legal library with rows of law books",
  },
  form: {
    title: "Create Your Account",
    subtitle: "Join the International Legal Assistance Program today.",
    fields: [
      {
        id: "name",
        label: "Full Name",
        placeholder: "Johnathan Doe",
        type: "text",
        icon: "person",
        autoComplete: "name",
      },
      {
        id: "email",
        label: "Email Address",
        placeholder: "name@firm.com",
        type: "email",
        icon: "mail",
        autoComplete: "email",
      },
      {
        id: "password",
        label: "Password",
        placeholder: "••••••••••••",
        type: "password",
        icon: "lock",
        trailingIcon: "visibility",
        autoComplete: "new-password",
      },
    ],
    terms: {
      id: "terms",
      copyBefore: "I agree to the",
      termsLabel: "Terms of Service",
      termsHref: routes.terms,
      privacyLabel: "Privacy Policy",
      privacyHref: routes.privacy,
      copyAfter: "regarding my legal practitioner status.",
    },
    submitLabel: "Complete Registration",
    alternatePrompt: "Already have an account?",
    alternateAction: {
      label: "Log In",
      href: routes.signIn,
    },
  },
  footer: "© 2024 International Legal Assistance Program • Secure Portal",
};

export const initialSignupActionState = {
  message: "",
  status: "idle",
} as const;
