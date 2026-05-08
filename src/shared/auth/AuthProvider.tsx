"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  apiClient,
  clearTokens,
  getStoredTokens,
  storeTokens,
} from "@/lib/api/client";
import type { AuthResponse, AuthUser, SessionResponse } from "@/lib/api/types";

type AuthContextValue = {
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  setAuthSession: (payload: AuthResponse) => void;
  signOut: () => Promise<void>;
  user: AuthUser | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function bootstrapSession() {
      if (!getStoredTokens()) {
        if (isMounted) {
          setUser(null);
          setIsBootstrapping(false);
        }
        return;
      }

      try {
        const session = await apiClient.get<SessionResponse>("/auth/session", {
          auth: true,
        });

        if (!isMounted) {
          return;
        }

        setUser(session.user);
      } catch {
        if (!isMounted) {
          return;
        }

        clearTokens();
        setUser(null);
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    }

    bootstrapSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(user),
      isBootstrapping,
      setAuthSession(payload) {
        storeTokens(payload.session);
        setUser(payload.user);
      },
      async signOut() {
        try {
          await apiClient.post("/auth/logout", undefined, { auth: true });
        } catch {
          // Clearing client state is the important part if logout fails remotely.
        } finally {
          clearTokens();
          setUser(null);
        }
      },
      user,
    }),
    [isBootstrapping, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
