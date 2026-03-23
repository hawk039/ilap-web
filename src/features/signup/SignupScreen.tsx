import Image from "next/image";
import Link from "next/link";
import AppIcon from "@/shared/icons/AppIcon";
import { signupContent } from "./constants";
import SignupForm from "./components/SignupForm";
import styles from "./signup.module.css";

export default function SignupScreen() {
  const content = signupContent;

  return (
    <div className={styles.pageShell}>
      <div className={styles.layoutContainer}>
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

            <div className={styles.headerDivider} />

            <Link className={styles.signInButton} href={content.headerAction.href}>
              {content.headerAction.label}
            </Link>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.card}>
            <section aria-label={content.hero.imageAlt} className={styles.heroPanel}>
              <div className={styles.heroBackground}>
                <Image
                  alt={content.hero.imageAlt}
                  className={styles.heroImage}
                  fill
                  priority
                  sizes="(max-width: 960px) 100vw, 50vw"
                  src={content.hero.imageUrl}
                />
              </div>
              <div className={styles.heroOverlay} />
              <div className={styles.heroContent}>
                <div className={styles.heroBadge}>
                  <AppIcon className={styles.heroBadgeIcon} name="verified" />
                  <span>{content.hero.badge}</span>
                </div>
                <h1 className={styles.heroTitle}>
                  {content.hero.titlePrefix}{" "}
                  <span className={styles.heroAccent}>
                    {content.hero.titleAccent}
                  </span>
                </h1>
                <p className={styles.heroDescription}>{content.hero.description}</p>
              </div>
            </section>

            <section className={styles.formPanel}>
              <div className={styles.formIntro}>
                <h2 className={styles.formTitle}>{content.form.title}</h2>
                <p className={styles.formSubtitle}>{content.form.subtitle}</p>
              </div>
              <SignupForm form={content.form} />
            </section>
          </div>
        </main>

        <footer className={styles.footer}>{content.footer}</footer>
      </div>
    </div>
  );
}
