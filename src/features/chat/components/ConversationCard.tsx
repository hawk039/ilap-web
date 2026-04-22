import AppIcon from "@/shared/icons/AppIcon";
import type { ChatHistoryItem } from "../types";
import styles from "../chat.module.css";

type ConversationCardProps = {
  chat: ChatHistoryItem;
};

export default function ConversationCard({ chat }: ConversationCardProps) {
  return (
    <article
      className={`${styles.chatCard} ${chat.hasAiInsight ? styles.chatCardInsight : ""}`}
    >
      {!chat.hasAiInsight ? <div className={styles.chatAccent} /> : null}
      <div className={styles.chatCopy}>
        <div className={styles.chatMeta}>
          <div className={styles.chatMetaLeft}>
            <span className={styles.categoryChip}>{chat.category}</span>
            {chat.hasAiInsight ? (
              <span className={styles.aiInsightChip}>
                <AppIcon className={styles.aiInsightIcon} name="smartToy" />
                AI Insight
              </span>
            ) : null}
          </div>
          <span className={styles.chatTimestamp}>{chat.timestamp}</span>
        </div>
        <h3 className={styles.chatTitle}>{chat.title}</h3>
        <p className={styles.chatPreview}>{chat.preview}</p>
      </div>
      <div className={styles.chatActions}>
        <button className={styles.iconButton} type="button" aria-label="Bookmark chat">
          <AppIcon
            className={chat.isBookmarked ? styles.iconBookmarked : styles.iconMuted}
            name={chat.isBookmarked ? "starFilled" : "star"}
          />
        </button>
        <button className={styles.viewChatButton} type="button">
          View Chat
        </button>
      </div>
    </article>
  );
}
