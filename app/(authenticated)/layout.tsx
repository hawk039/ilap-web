import type { ReactNode } from "react";
import AuthenticatedShell from "@/shared/layouts/authenticated-shell/AuthenticatedShell";

type AuthenticatedLayoutProps = {
  children: ReactNode;
};

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  return <AuthenticatedShell>{children}</AuthenticatedShell>;
}
