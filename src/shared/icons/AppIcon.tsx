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
  | "helpOutline";

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
  }
}
