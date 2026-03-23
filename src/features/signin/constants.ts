import { routes } from "@/lib/routes";
import type { SignInViewModel } from "./types";

export const signInContent: SignInViewModel = {
  brand: {
    name: "ILAP",
    icon: "gavel",
  },
  navigation: [
    { label: "Home", href: routes.home },
    { label: "About", href: routes.about },
    { label: "Support", href: routes.support },
  ],
  headerAction: {
    label: "Sign Up",
    href: routes.home,
  },
  hero: {
    title: "The Future of Legal Intelligence",
    description:
      "Access your secure dashboard to manage cases, collaborate with partners, and leverage advanced legal analytics tools.",
    imageUrl:
      "https://images.unsplash.com/photo-1654588834754-33346e3ee095?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Modern law firm office interior with glass walls",
    socialProofLabel: "Joined by 2,000+ legal professionals",
    avatars: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG3wy4ei9bb5w29vIsRPHLlpbCaB7kbGYuiPtamXDlUlDansCdqbFXJ9QoPMjj8h8Z4R0NOrVTEtQh3Qz3wMdIOTU3BmW2KhUzDeQMhef0COvtCaAvS2axUO1PooPwRRmxWnZ0GFFF5c-gqribBfBhHWBDxTUgiHq2IDx4pGa_GhmPycAEyt1taP8k2X6ppeWZl67uaEetp-rHXuYEQSmBM5_w06cB5_v0mXMLKMSpV86rETkx5c0zWufRjiJroWkWIQHbaBp1JSw",
        alt: "Professional corporate headshot of a male lawyer",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOkThXvcwEaMGj_cItlfMtCor2X8jfb9lz5SRFMzu3pE43W5eTHXtmi-4vEdbOYACERvXr1TWzbuQsDXIP8U_Rtf3NfMhMSBr1RoM7ftrO5dV0xvfjBd8re0WGkyy-4w4rBtLzyrjOEx540hqqikvhGwOAWUaGNpKMGOwS7WB-obiSjLAtjaxp6Bc5ZNAfW8OcH2r1Ss2ik0MTO9mAKJ7fH5292P38SkPiBnfilssPkmyTjaoekb2KFzNw-ntEL_RVBCa5C0TzKVA",
        alt: "Professional corporate headshot of a female attorney",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrScpGvMgdyZUwqWazIOBKGWJq0IdYpqGjMqJWNcw_nUOQv_5JdpuFJ2LlSJh6kViEgJzCbIXH3Scb5yCM9Q46y6ZX-fOkGWXWBJtXLMgaSh6lyBS5sVVr1C3P-TiyAsMOrXeNI3nSUrKoqav1fHe1RpR0oMC_FItPunnOjkN8S2oXas6nDZw1MI8ttWFhV_OOAB2vrWyjfIL9xUuCvfzlnMnQPRVSj4ZyXbDx-QTGju-OfoNInrceIX_FsLSx50T8g2OSTkxcXEA",
        alt: "Professional corporate headshot of a legal consultant",
      },
    ],
  },
  form: {
    title: "Welcome Back",
    subtitle:
      "Please enter your credentials to access your legal-tech dashboard.",
    emailPlaceholder: "name@firm.com",
    passwordPlaceholder: "••••••••",
    forgotPasswordHref: routes.forgotPassword,
    rememberMeLabel: "Keep me signed in for 30 days",
    submitLabel: "Sign In",
    requestAccessLabel: "Request early access",
    requestAccessHref: routes.requestEarlyAccess,
    footerLinks: [
      { label: "Privacy Policy", href: routes.privacy },
      { label: "Terms of Service", href: routes.terms },
      { label: "Security", href: routes.security },
    ],
  },
  footer: {
    copyright:
      "© 2024 International Legal Analytics Platform (ILAP). All rights reserved.",
    systemStatus: "Systems Operational",
  },
};

export const initialSignInActionState = {
  message: "",
  status: "idle",
} as const;
