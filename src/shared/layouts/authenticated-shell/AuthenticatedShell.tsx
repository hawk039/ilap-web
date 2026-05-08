"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AppIcon from "@/shared/icons/AppIcon";
import { routes } from "@/lib/routes";
import { useAuth } from "@/shared/auth/AuthProvider";
import { authenticatedShellContent } from "./constants";
import styles from "./authenticated-shell.module.css";

type AuthenticatedShellProps = {
  children: React.ReactNode;
};

export default function AuthenticatedShell({
  children,
}: AuthenticatedShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const content = authenticatedShellContent;

  return (
    <div className={styles.pageShell}>
      <header className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <span className={styles.brand}>{content.brand}</span>
          <nav className={styles.topNav} aria-label="Primary navigation">
            {content.topNav.map((item) => (
              <Link
                className={
                  pathname === item.href ? styles.topNavLinkActive : styles.topNavLink
                }
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.topBarRight}>
          <button
            className={styles.signOutButton}
            onClick={async () => {
              await auth.signOut();
              router.replace(routes.signIn);
            }}
            type="button"
          >
            Sign Out
          </button>
          <button
            aria-label="Notifications"
            className={styles.topIconButton}
            type="button"
          >
            <AppIcon className={styles.topIcon} name="notifications" />
          </button>
          <button aria-label="Settings" className={styles.topIconButton} type="button">
            <AppIcon className={styles.topIcon} name="settings" />
          </button>
          <div className={styles.avatarWrap}>
            <Image
              alt={auth.user?.fullName ?? content.user.avatarAlt}
              className={styles.avatar}
              height={32}
              src={content.user.avatarSrc}
              width={32}
            />
          </div>
        </div>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
