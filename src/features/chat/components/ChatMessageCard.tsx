import { useState } from "react";
import AppIcon from "@/shared/icons/AppIcon";
import { chatContent } from "../constants";
import type { ChatMessage } from "../types";
import styles from "../chat.module.css";

type ChatMessageCardProps = {
  message: ChatMessage;
};

export default function ChatMessageCard({ message }: ChatMessageCardProps) {
  const [isSourceOpen, setIsSourceOpen] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message.text);
    } catch {
      // Ignore clipboard failures in unsupported environments.
    }
  }

  async function handleShare() {
    if (!navigator.share) {
      return;
    }

    try {
      await navigator.share({
        text: message.text,
        title: "ILAP legal answer",
      });
    } catch {
      // Ignore share dismissal.
    }
  }

  if (message.role === "user") {
    return (
      <article className={styles.userMessageGroup}>
        <div className={styles.userMessage}>
        <p className={styles.userMessageText}>{message.text}</p>
        </div>
        <span className={styles.messageTimestamp}>
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
        </span>
      </article>
    );
  }

  const heading =
    message.categoryNote ||
    message.citations?.[0]?.section ||
    "Legal analysis";

  return (
    <article className={styles.assistantMessageGroup}>
      <div className={styles.assistantIdentity}>
        <div className={styles.assistantIdentityIconWrap}>
          <AppIcon className={styles.assistantIdentityIcon} name="smartToy" />
        </div>
        <span className={styles.assistantIdentityName}>ILAP Assistant</span>
      </div>

      <div className={styles.assistantMessage}>
        <div className={styles.assistantCardContent}>
          <h3 className={styles.assistantCardTitle}>
            <AppIcon className={styles.assistantCardTitleIcon} name="gavel" />
            {heading}
          </h3>
          <p className={styles.assistantMessageText}>{message.text}</p>

          {message.citations?.length ? (
            <div className={styles.infoPanel}>
              <h4 className={styles.infoPanelTitle}>
                <AppIcon className={styles.infoPanelIcon} name="info" />
                Law references
              </h4>
              <ul className={styles.infoPanelList}>
                {message.citations.map((citation, index) => (
                  <li className={styles.infoPanelItem} key={`${citation.act}-${index}`}>
                    <span className={styles.infoPanelLabel}>{citation.act}</span>
                    <span>{citation.section}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {message.citations?.length ? (
            <div className={styles.sourceAccordion}>
              <button
                className={styles.sourceToggle}
                onClick={() => setIsSourceOpen((current) => !current)}
                type="button"
              >
                {chatContent.activeState.sourceToggleLabel}
                <AppIcon
                  className={
                    isSourceOpen ? styles.sourceToggleIconOpen : styles.sourceToggleIcon
                  }
                  name="expandMore"
                />
              </button>
              {isSourceOpen ? (
                <div className={styles.sourcePanel}>
                  {message.citations.map((citation, index) => (
                    <div className={styles.sourcePanelRow} key={`${citation.section}-${index}`}>
                      <strong>{citation.act}</strong>
                      <span>{citation.section}</span>
                      {citation.effective_from ? (
                        <span>Effective from {citation.effective_from}</span>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className={styles.assistantActions}>
          <button className={styles.assistantActionButton} onClick={handleCopy} type="button">
            <AppIcon className={styles.assistantActionIcon} name="copy" />
            Copy
          </button>
          <button className={styles.assistantActionButton} onClick={handleShare} type="button">
            <AppIcon className={styles.assistantActionIcon} name="share" />
            Share
          </button>
          <button className={styles.assistantActionButtonTrailing} type="button">
            <AppIcon className={styles.assistantActionIcon} name="bookmark" />
            Bookmark
          </button>
        </div>

        {message.disclaimer ? (
          <p className={styles.disclaimer}>{message.disclaimer}</p>
        ) : null}
      </div>

      <span className={styles.messageTimestampAssistant}>
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })}
      </span>
    </article>
  );
}
