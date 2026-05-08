"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { routes } from "@/lib/routes";
import { useAuth } from "./AuthProvider";

type AuthenticatedRouteProps = {
  children: ReactNode;
};

export default function AuthenticatedRoute({
  children,
}: AuthenticatedRouteProps) {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isBootstrapping && !auth.isAuthenticated) {
      router.replace(routes.signIn);
    }
  }, [auth.isAuthenticated, auth.isBootstrapping, router]);

  if (auth.isBootstrapping) {
    return null;
  }

  if (!auth.isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
