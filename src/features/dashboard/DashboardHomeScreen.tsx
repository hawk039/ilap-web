import AppIcon from "@/shared/icons/AppIcon";
import { dashboardContent } from "./constants";
import CategoryCard from "./components/CategoryCard";
import styles from "./dashboard.module.css";

export default function DashboardHomeScreen() {
  const content = dashboardContent;

  return (
    <div className={styles.contentWrap}>
      <header className={styles.hero}>
        <div className={styles.heroBadge}>
          <AppIcon className={styles.heroBadgeIcon} name="smartToy" />
          <span>{content.hero.badge}</span>
        </div>
        <h1 className={styles.heroTitle}>{content.hero.title}</h1>
        <p className={styles.heroDescription}>{content.hero.description}</p>
      </header>

      <section className={styles.searchRow}>
        <div className={styles.searchWrap}>
          <input
            className={styles.searchInput}
            placeholder={content.searchPlaceholder}
            type="text"
          />
          <AppIcon className={styles.searchIcon} name="search" />
        </div>
      </section>

      <section className={styles.grid}>
        {content.categories.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaOverlay} />
        <div className={styles.ctaInner}>
          <div className={styles.ctaCopy}>
            <h2 className={styles.ctaTitle}>{content.cta.title}</h2>
            <p className={styles.ctaDescription}>{content.cta.description}</p>
          </div>
          <div className={styles.ctaActions}>
            <button className={styles.ctaPrimaryButton} type="button">
              {content.cta.primaryLabel}
            </button>
            <button className={styles.ctaSecondaryButton} type="button">
              {content.cta.secondaryLabel}
            </button>
          </div>
        </div>
        <div className={styles.ctaAccentLine} />
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <span className={styles.footerBrandName}>ILAP</span>
          <span className={styles.footerBrandCopy}>
            © 2024 Institutional Law AI Platform
          </span>
        </div>
        <div className={styles.footerStats}>
          {content.footerStats.map((stat) => (
            <div className={styles.footerStat} key={stat.label}>
              <div className={styles.footerStatValue}>{stat.value}</div>
              <div className={styles.footerStatLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
