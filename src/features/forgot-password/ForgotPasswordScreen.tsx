import Link from "next/link";
import AppIcon from "@/shared/icons/AppIcon";
import { forgotPasswordContent } from "./constants";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import styles from "./forgot-password.module.css";

export default function ForgotPasswordScreen() {
  const content = forgotPasswordContent;

  return (
    <div className={styles.pageShell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.brandIconWrap}>
            <AppIcon className={styles.brandIcon} name={content.brand.icon} />
          </div>
          <h2 className={styles.brandName}>{content.brand.name}</h2>
        </div>

        <div className={styles.headerActions}>
          <Link className={styles.helpLink} href={content.headerLinks.helpCenter.href}>
            <AppIcon className={styles.helpIcon} name={content.headerLinks.helpCenter.icon} />
            <span>{content.headerLinks.helpCenter.label}</span>
          </Link>
          <Link className={styles.supportButton} href={content.headerLinks.support.href}>
            {content.headerLinks.support.label}
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.contentWrap}>
          <section className={styles.card}>
            <div className={styles.hero}>
              <div className={styles.heroIconWrap}>
                <AppIcon className={styles.heroIcon} name={content.content.icon} />
              </div>
              <h1 className={styles.title}>{content.content.title}</h1>
              <p className={styles.description}>{content.content.description}</p>
            </div>

            <ForgotPasswordForm content={content.content} />

            <div className={styles.cardFooter}>
              <Link
                className={styles.backLink}
                href={content.content.backToLoginHref}
              >
                <AppIcon
                  className={styles.backIcon}
                  name={content.content.backToLoginIcon}
                />
                <span>{content.content.backToLoginLabel}</span>
              </Link>
            </div>
          </section>

          <div className={styles.bottomFooter}>
            <p className={styles.bottomFooterText}>
              {content.footer.copyright}{" "}
              <Link className={styles.bottomFooterLink} href={content.footer.privacyHref}>
                {content.footer.privacyLabel}
              </Link>
            </p>
          </div>
        </div>
      </main>

      <div className={styles.backgroundDecor} aria-hidden="true">
        <div className={styles.decorTop} />
        <div className={styles.decorBottom} />
      </div>
    </div>
  );
}
