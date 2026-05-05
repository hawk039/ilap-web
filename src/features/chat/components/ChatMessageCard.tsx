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

  const response = message.response;

  if (!response) {
    return null;
  }

  return (
    <article className={styles.assistantMessage}>
      <div className={styles.messageMeta}>ILAP</div>
      <p className={styles.assistantMessageText}>{response.answer}</p>

      <p className={styles.disclaimer}>{response.disclaimer}</p>
    </article>
  );
}
