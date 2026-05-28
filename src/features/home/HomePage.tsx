"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignupScreen from "@/features/signup/SignupScreen";
import { routes } from "@/lib/routes";
import { useAuth } from "@/shared/auth/AuthProvider";

export default function HomePage() {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isBootstrapping && auth.isAuthenticated) {
      router.replace(routes.dashboard);
    }
  }, [auth.isAuthenticated, auth.isBootstrapping, router]);

  if (auth.isBootstrapping) {
    return null;
  }

  if (auth.isAuthenticated) {
    return null;
  }

  return <SignupScreen />;
}
