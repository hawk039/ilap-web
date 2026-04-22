import AppIcon from "@/shared/icons/AppIcon";
import type { DashboardCategory } from "../types";
import styles from "../dashboard.module.css";

type CategoryCardProps = {
  category: DashboardCategory;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const isSecondaryAccent = category.accent === "secondary";

  return (
    <article className={styles.categoryCard}>
      <div
        className={
          isSecondaryAccent ? styles.categoryAccentSecondary : styles.categoryAccent
        }
      />
      <div className={styles.categoryHeader}>
        <div
          className={
            isSecondaryAccent ? styles.categoryIconWrapSecondary : styles.categoryIconWrap
          }
        >
          <AppIcon className={styles.categoryIcon} name={category.icon} />
        </div>

        {category.highlightLabel ? (
          <div className={styles.categoryHighlight}>
            <span className={styles.categoryHighlightDot} />
            <span>{category.highlightLabel}</span>
          </div>
        ) : (
          <span className={styles.categoryCode}>{category.code}</span>
        )}
      </div>

      <h3 className={styles.categoryTitle}>{category.title}</h3>
      <p className={styles.categoryDescription}>{category.description}</p>

      <div className={styles.categoryFooter}>
        <span className={styles.categoryPrecedents}>{category.precedentCount}</span>
        <button
          className={
            isSecondaryAccent ? styles.categoryButtonSecondary : styles.categoryButton
          }
          type="button"
          aria-label={`Open ${category.title}`}
        >
          <AppIcon className={styles.categoryButtonIcon} name="arrowForward" />
        </button>
      </div>
    </article>
  );
}
