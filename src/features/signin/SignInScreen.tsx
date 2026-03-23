import Image from "next/image";
import Link from "next/link";
import AppIcon from "@/shared/icons/AppIcon";
import { signInContent } from "./constants";
import SignInForm from "./components/SignInForm";
import styles from "./signin.module.css";

export default function SignInScreen() {
  const content = signInContent;

  return (
    <div className={styles.pageShell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.brandIconWrap}>
            <AppIcon className={styles.brandIcon} name={content.brand.icon} />
          </div>
          <h2 className={styles.brandName}>{content.brand.name}</h2>
        </div>

        <div className={styles.headerRight}>
          <nav aria-label="Primary navigation" className={styles.nav}>
            {content.navigation.map((item) => (
              <Link className={styles.navLink} href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className={styles.signUpButton} href={content.headerAction.href}>
            {content.headerAction.label}
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.visualPanel}>
          <div className={styles.visualGrid} />
          <div className={styles.visualContent}>
            <div className={styles.heroImageFrame}>
              <div className={styles.heroImageWrap}>
                <Image
                  alt={content.hero.imageAlt}
                  className={styles.heroImage}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  src={content.hero.imageUrl}
                />
              </div>
            </div>
            <h1 className={styles.heroTitle}>{content.hero.title}</h1>
            <p className={styles.heroDescription}>{content.hero.description}</p>
            <div className={styles.socialProof}>
              <div className={styles.avatarStack}>
                {content.hero.avatars.map((avatar) => (
                  <div className={styles.avatarWrap} key={avatar.src}>
                    <Image
                      alt={avatar.alt}
                      className={styles.avatar}
                      height={40}
                      src={avatar.src}
                      width={40}
                    />
                  </div>
                ))}
              </div>
              <p className={styles.socialProofLabel}>{content.hero.socialProofLabel}</p>
            </div>
          </div>
        </section>

        <section className={styles.formPanel}>
          <div className={styles.formInner}>
            <div className={styles.formIntro}>
              <h2 className={styles.formTitle}>{content.form.title}</h2>
              <p className={styles.formSubtitle}>{content.form.subtitle}</p>
            </div>

            <SignInForm form={content.form} />

            <div className={styles.secondaryAction}>
              <p className={styles.secondaryActionText}>
                Don&apos;t have an account yet?{" "}
                <Link
                  className={styles.secondaryActionLink}
                  href={content.form.requestAccessHref}
                >
                  {content.form.requestAccessLabel}
                </Link>
              </p>
            </div>

            <div className={styles.legalLinks}>
              {content.form.footerLinks.map((item, index) => (
                <div className={styles.legalLinkRow} key={item.href}>
                  {index > 0 ? <span className={styles.legalDot}>•</span> : null}
                  <Link className={styles.legalLink} href={item.href}>
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerText}>{content.footer.copyright}</p>
          <div className={styles.footerStatus}>
            <span className={styles.footerStatusDot} />
            {content.footer.systemStatus}
          </div>
        </div>
      </footer>
    </div>
  );
}
