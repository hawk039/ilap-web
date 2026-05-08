import type { ReactNode } from "react";
import AuthenticatedRoute from "@/shared/auth/AuthenticatedRoute";
import AuthenticatedShell from "@/shared/layouts/authenticated-shell/AuthenticatedShell";

type AuthenticatedLayoutProps = {
  children: ReactNode;
};

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  return (
    <AuthenticatedRoute>
      <AuthenticatedShell>{children}</AuthenticatedShell>
    </AuthenticatedRoute>
  );
}
