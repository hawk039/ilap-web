"use client";

import { useEffect, useMemo, useState } from "react";
import { apiClient, ApiError } from "@/lib/api/client";
import type { LegalCategory } from "@/lib/api/types";
import AppIcon from "@/shared/icons/AppIcon";
import { dashboardContent } from "./constants";
import CategoryCard from "./components/CategoryCard";
import styles from "./dashboard.module.css";

export default function DashboardHomeScreen() {
  const content = dashboardContent;
  const [categories, setCategories] = useState<LegalCategory[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        const response = await apiClient.get<LegalCategory[]>("/legal-categories");

        if (!isMounted) {
          return;
        }

        setCategories(
          response.filter((category) => category.isActive !== false).sort((left, right) => {
            return (left.sortOrder ?? 0) - (right.sortOrder ?? 0);
          }),
        );
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(
          error instanceof ApiError
            ? error.message
            : "Unable to load legal categories right now.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayCategories = useMemo(() => {
    return categories.map((category, index) => ({
      ...category,
      accent: index === 2 ? ("secondary" as const) : ("primary" as const),
      code: category.id.toUpperCase(),
      highlightLabel: index === 2 ? "New Acts Included" : undefined,
      precedentCount: category.lawType,
    }));
  }, [categories]);

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

      {isLoading ? <p className={styles.statusText}>Loading legal categories...</p> : null}
      {errorMessage ? <p className={styles.statusError}>{errorMessage}</p> : null}

      <section className={styles.grid}>
        {displayCategories.map((category) => (
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
