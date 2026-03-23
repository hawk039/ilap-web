import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ILAP Sign Up",
  description: "International Legal Assistance Program signup portal",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
