import type { SVGProps } from "react";

export type AppIconName =
  | "gavel"
  | "verified"
  | "person"
  | "mail"
  | "lock"
  | "lockReset"
  | "visibility"
  | "visibilityOff"
  | "arrowForward"
  | "keyboardBackspace"
  | "helpOutline"
  | "notifications"
  | "settings"
  | "add"
  | "chat"
  | "editNote"
  | "bookmark"
  | "archive"
  | "menuBook"
  | "search"
  | "star"
  | "starFilled"
  | "smartToy"
  | "historyEdu"
  | "accountBalance"
  | "domain"
  | "terminal"
  | "shoppingBag"
  | "work"
  | "familyHistory"
  | "mic"
  | "copy"
  | "share"
  | "info"
  | "expandMore"
  | "send";

type AppIconProps = {
  name: AppIconName;
  className?: string;
};

export default function AppIcon({ name, className }: AppIconProps) {
  const commonProps: SVGProps<SVGSVGElement> = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (name) {
    case "gavel":
      return (
        <svg {...commonProps}>
          <path d="m14 12-8.5 8.5" />
          <path d="m16 8 4 4" />
          <path d="m3 21 6-6" />
          <path d="m13 3 8 8" />
          <path d="m11 5 8 8" />
        </svg>
      );
    case "verified":
      return (
        <svg {...commonProps}>
          <path d="m9 12 2 2 4-4" />
          <path d="M12 3 9.2 5.1l-3.4.3.3 3.4L3 12l3.1 3.2-.3 3.4 3.4.3L12 21l2.8-2.1 3.4-.3-.3-3.4L21 12l-3.1-3.2.3-3.4-3.4-.3z" />
        </svg>
      );
    case "person":
      return (
        <svg {...commonProps}>
          <path d="M20 21a8 8 0 0 0-16 0" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "mail":
      return (
        <svg {...commonProps}>
          <rect height="14" rx="2" width="18" x="3" y="5" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case "lock":
      return (
        <svg {...commonProps}>
          <rect height="10" rx="2" width="16" x="4" y="11" />
          <path d="M8 11V8a4 4 0 1 1 8 0v3" />
        </svg>
      );
    case "lockReset":
      return (
        <svg {...commonProps}>
          <path d="M10 11V8a4 4 0 1 1 7.4 2" />
          <rect height="9" rx="2" width="12" x="6" y="11" />
          <path d="M4 8V4h4" />
          <path d="M4 4 2 6" />
          <path d="M4 4 6 6" />
        </svg>
      );
    case "visibility":
      return (
        <svg {...commonProps}>
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "visibilityOff":
      return (
        <svg {...commonProps}>
          <path d="m3 3 18 18" />
          <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
          <path d="M9.9 5.1A11.1 11.1 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-3.3 4.2" />
          <path d="M6.6 6.7A17.8 17.8 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 4.2-.9" />
        </svg>
      );
    case "arrowForward":
      return (
        <svg {...commonProps}>
          <path d="M5 12h14" />
          <path d="m13 5 7 7-7 7" />
        </svg>
      );
    case "keyboardBackspace":
      return (
        <svg {...commonProps}>
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
      );
    case "helpOutline":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.1 9a3 3 0 1 1 5.6 1.5c-.6 1-1.7 1.4-2.3 2.2-.2.3-.4.7-.4 1.3" />
          <path d="M12 17h.01" />
        </svg>
      );
    case "notifications":
      return (
        <svg {...commonProps}>
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9" />
          <path d="M10 21a2 2 0 0 0 4 0" />
        </svg>
      );
    case "settings":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1z" />
        </svg>
      );
    case "add":
      return (
        <svg {...commonProps}>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      );
    case "chat":
      return (
        <svg {...commonProps}>
          <path d="M7 10h10" />
          <path d="M7 14h6" />
          <path d="M4 5h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
        </svg>
      );
    case "editNote":
      return (
        <svg {...commonProps}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      );
    case "bookmark":
      return (
        <svg {...commonProps}>
          <path d="M6 3h12v18l-6-4-6 4V3Z" />
        </svg>
      );
    case "archive":
      return (
        <svg {...commonProps}>
          <rect x="3" y="4" width="18" height="4" rx="1" />
          <path d="M5 8h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8Z" />
          <path d="M10 12h4" />
        </svg>
      );
    case "menuBook":
      return (
        <svg {...commonProps}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
        </svg>
      );
    case "search":
      return (
        <svg {...commonProps}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "star":
      return (
        <svg {...commonProps}>
          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z" />
        </svg>
      );
    case "starFilled":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z" />
        </svg>
      );
    case "smartToy":
      return (
        <svg {...commonProps}>
          <rect x="5" y="8" width="14" height="10" rx="2" />
          <path d="M12 4v4" />
          <path d="M9 13h.01" />
          <path d="M15 13h.01" />
          <path d="M9 16h6" />
        </svg>
      );
    case "historyEdu":
      return (
        <svg {...commonProps}>
          <path d="M4 5h10a4 4 0 0 1 4 4v10H8a4 4 0 0 0-4 4V5Z" />
          <path d="M8 19h12V9a4 4 0 0 0-4-4" />
          <path d="M8 10h8" />
          <path d="M8 14h5" />
        </svg>
      );
    case "accountBalance":
      return (
        <svg {...commonProps}>
          <path d="M3 10h18" />
          <path d="M5 10v7" />
          <path d="M9 10v7" />
          <path d="M15 10v7" />
          <path d="M19 10v7" />
          <path d="M2 21h20" />
          <path d="m12 3 9 4H3l9-4Z" />
        </svg>
      );
    case "domain":
      return (
        <svg {...commonProps}>
          <path d="M3 21h18" />
          <path d="M5 21V7l7-4 7 4v14" />
          <path d="M9 9h.01" />
          <path d="M9 13h.01" />
          <path d="M9 17h.01" />
          <path d="M15 9h.01" />
          <path d="M15 13h.01" />
          <path d="M15 17h.01" />
        </svg>
      );
    case "terminal":
      return (
        <svg {...commonProps}>
          <path d="m4 17 6-6-6-6" />
          <path d="M12 19h8" />
        </svg>
      );
    case "shoppingBag":
      return (
        <svg {...commonProps}>
          <path d="M6 7h12l-1 13H7L6 7Z" />
          <path d="M9 7a3 3 0 1 1 6 0" />
        </svg>
      );
    case "work":
      return (
        <svg {...commonProps}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
        </svg>
      );
    case "mic":
      return (
        <svg {...commonProps}>
          <rect x="9" y="3" width="6" height="12" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0" />
          <path d="M12 18v3" />
        </svg>
      );
    case "copy":
      return (
        <svg {...commonProps}>
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      );
    case "share":
      return (
        <svg {...commonProps}>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.6 13.5 6.8 4" />
          <path d="m15.4 6.5-6.8 4" />
        </svg>
      );
    case "info":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v5" />
          <path d="M12 7h.01" />
        </svg>
      );
    case "expandMore":
      return (
        <svg {...commonProps}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "send":
      return (
        <svg {...commonProps}>
          <path d="M22 2 11 13" />
          <path d="m22 2-7 20-4-9-9-4Z" />
        </svg>
      );
    case "familyHistory":
      return (
        <svg {...commonProps}>
          <circle cx="8" cy="8" r="3" />
          <circle cx="16" cy="8" r="3" />
          <path d="M2 21a6 6 0 0 1 12 0" />
          <path d="M10 21a6 6 0 0 1 12 0" />
        </svg>
      );
  }
}
