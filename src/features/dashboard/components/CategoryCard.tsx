"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiClient, ApiError } from "@/lib/api/client";
import type { ConversationSummary } from "@/lib/api/types";
import { routes } from "@/lib/routes";
import AppIcon, { type AppIconName } from "@/shared/icons/AppIcon";
import type { DashboardCategory } from "../types";
import styles from "../dashboard.module.css";

type CategoryCardProps = {
  category: DashboardCategory;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const isSecondaryAccent = category.accent === "secondary";

  function getIconName(icon: string): AppIconName {
    switch (icon) {
      case "domain":
      case "terminal":
      case "shoppingBag":
      case "work":
      case "familyHistory":
      case "gavel":
        return icon;
      default:
        return "gavel";
    }
  }

  async function handleOpenCategory() {
    setIsPending(true);

    try {
      const conversation = await apiClient.post<ConversationSummary>(
        "/conversations",
        {
          lawType: category.lawType,
          title: category.name,
        },
        { auth: true },
      );

      router.push(`${routes.chat}?conversationId=${conversation.id}`);
    } catch (error) {
      console.error(
        error instanceof ApiError
          ? error.message
          : "Unable to start a conversation right now.",
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      aria-label={`Open ${category.name}`}
      className={styles.categoryCard}
      disabled={isPending}
      onClick={handleOpenCategory}
      type="button"
    >
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
          <AppIcon className={styles.categoryIcon} name={getIconName(category.icon)} />
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

      <h3 className={styles.categoryTitle}>{category.name}</h3>
      <p className={styles.categoryDescription}>{category.description}</p>

      <div className={styles.categoryFooter}>
        <span className={styles.categoryPrecedents}>
          {isPending ? "Starting..." : category.precedentCount ?? category.lawType}
        </span>
        <span
          className={
            isSecondaryAccent ? styles.categoryButtonSecondary : styles.categoryButton
          }
        >
          <AppIcon className={styles.categoryButtonIcon} name="arrowForward" />
        </span>
      </div>
    </button>
  );
}
