import AppIcon from "@/shared/icons/AppIcon";
import { chatContent } from "./constants";
import ConversationCard from "./components/ConversationCard";
import styles from "./chat.module.css";

export default function ChatHistoryScreen() {
  const content = chatContent;

  return (
    <div className={styles.contentWrap}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>{content.content.title}</h1>
          <p className={styles.pageSubtitle}>{content.content.subtitle}</p>
        </div>
        <div className={styles.searchWrap}>
          <AppIcon className={styles.searchIcon} name="search" />
          <input
            className={styles.searchInput}
            placeholder={content.content.searchPlaceholder}
            type="text"
          />
        </div>
      </div>

      <div className={styles.chatList}>
        {content.content.chats.map((chat) => (
          <ConversationCard chat={chat} key={chat.id} />
        ))}
      </div>

      <section className={styles.emptyState}>
        <div className={styles.emptyStateIconWrap}>
          <AppIcon className={styles.emptyStateIcon} name="historyEdu" />
        </div>
        <h2 className={styles.emptyStateTitle}>{content.content.emptyState.title}</h2>
        <p className={styles.emptyStateDescription}>
          {content.content.emptyState.description}
        </p>
        <button className={styles.emptyStateButton} type="button">
          {content.content.emptyState.actionLabel}
          <AppIcon className={styles.emptyStateButtonIcon} name="arrowForward" />
        </button>
      </section>
    </div>
  );
}
