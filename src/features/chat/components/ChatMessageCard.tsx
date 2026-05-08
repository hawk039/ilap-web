import type { ChatMessage } from "../types";
import styles from "../chat.module.css";

type ChatMessageCardProps = {
  message: ChatMessage;
};

export default function ChatMessageCard({ message }: ChatMessageCardProps) {
  if (message.role === "user") {
    return (
      <article className={styles.userMessage}>
        <div className={styles.messageMeta}>You</div>
        <p className={styles.userMessageText}>{message.text}</p>
      </article>
    );
  }

  return (
    <article className={styles.assistantMessage}>
      <div className={styles.messageMeta}>ILAP</div>
      <p className={styles.assistantMessageText}>{message.text}</p>

      {message.disclaimer ? (
        <p className={styles.disclaimer}>{message.disclaimer}</p>
      ) : null}
    </article>
  );
}
