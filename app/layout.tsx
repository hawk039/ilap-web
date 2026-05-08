import type { Metadata } from "next";
import { AuthProvider } from "@/shared/auth/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "ILAP",
  description: "International Legal Assistance Program web application",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
