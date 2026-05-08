"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AppIcon from "@/shared/icons/AppIcon";
import { routes } from "@/lib/routes";
import { chatContent } from "./constants";
import ChatMessageCard from "./components/ChatMessageCard";
import { useIlapChat } from "./hooks/useIlapChat";
import styles from "./chat.module.css";

type ChatHistoryScreenProps = {
  conversationId: string;
};

export default function ChatHistoryScreen({
  conversationId,
}: ChatHistoryScreenProps) {
  const router = useRouter();
  const {
    composerValue,
    conversation,
    conversations,
    errorMessage,
    isLoadingConversation,
    isLoadingConversations,
    isSubmitting,
    messages,
    setComposerValue,
    submitQuery,
  } = useIlapChat({
    conversationId,
  });
  const content = chatContent;
  const hasConversation = Boolean(conversationId);

  function handleNewConversation() {
    router.push(routes.dashboard);
  }

  if (!hasConversation) {
    return (
      <section className={styles.emptyShell}>
        <div className={styles.emptyPanel}>
          <div className={styles.emptyBadge}>{content.emptyState.eyebrow}</div>
          <h1 className={styles.emptyTitle}>{content.emptyState.title}</h1>
          <p className={styles.emptyDescription}>{content.emptyState.description}</p>
          <Link className={styles.primaryLinkButton} href={routes.dashboard}>
            {content.emptyState.primaryLabel}
            <AppIcon className={styles.primaryLinkButtonIcon} name="arrowForward" />
          </Link>

          <div className={styles.recentConversationSection}>
            <h2 className={styles.recentConversationTitle}>
              {content.emptyState.secondaryTitle}
            </h2>
            {isLoadingConversations ? (
              <p className={styles.emptyDescription}>Loading conversations...</p>
            ) : conversations.length === 0 ? (
              <p className={styles.emptyDescription}>
                {content.emptyState.noConversations}
              </p>
            ) : (
              <div className={styles.recentConversationList}>
                {conversations.map((item) => (
                  <Link
                    className={styles.recentConversationLink}
                    href={`${routes.chat}?conversationId=${item.id}`}
                    key={item.id}
                  >
                    <strong>{item.title || item.lawType}</strong>
                    <span>{item.lawType}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className={styles.contentWrap}>
      <header className={styles.headerRow}>
        <div>
          <div className={styles.lawTypeBadge}>
            {conversation?.lawType ?? "Conversation"}
          </div>
          <h1 className={styles.pageTitle}>{content.activeState.title}</h1>
          <p className={styles.pageSubtitle}>{content.activeState.subtitle}</p>
        </div>
        <button
          className={styles.secondaryButton}
          onClick={handleNewConversation}
          type="button"
        >
          <AppIcon className={styles.secondaryButtonIcon} name="add" />
          {content.activeState.newConversationLabel}
        </button>
      </header>

      <section className={styles.chatSurface}>
        {isLoadingConversation ? (
          <p className={styles.statusText}>Loading conversation...</p>
        ) : null}
        <div className={styles.messageList}>
          {messages.length === 0 ? (
            <div className={styles.emptyConversationState}>
              <div className={styles.emptyConversationIconWrap}>
                <AppIcon className={styles.emptyConversationIcon} name="chat" />
              </div>
              <h2 className={styles.emptyConversationTitle}>
                Start your {(conversation?.lawType ?? "legal").toLowerCase()} conversation
              </h2>
              <p className={styles.emptyConversationDescription}>
                Ask your first question and the backend will persist the conversation
                timeline for future retrieval.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessageCard key={message.id} message={message} />
            ))
          )}

          {isSubmitting ? (
            <div className={styles.loadingRow}>
              <div className={styles.loadingDot} />
              <p className={styles.loadingLabel}>
                {content.activeState.loadingLabel}
              </p>
            </div>
          ) : null}
        </div>

        <form className={styles.composerForm} onSubmit={submitQuery}>
          <label className={styles.composerLabel} htmlFor="chat-query">
            Ask ILAP
          </label>
          <div className={styles.composerInputWrap}>
            <textarea
              className={styles.composerInput}
              id="chat-query"
              onChange={(event) => setComposerValue(event.target.value)}
              placeholder={content.activeState.composerPlaceholder}
              rows={4}
              value={composerValue}
            />
            <button
              className={styles.primaryButton}
              disabled={isSubmitting}
              type="submit"
            >
              {content.activeState.submitLabel}
              <AppIcon className={styles.primaryButtonIcon} name="arrowForward" />
            </button>
          </div>
          {errorMessage ? <p className={styles.errorText}>{errorMessage}</p> : null}
          <p className={styles.helperText}>{content.activeState.helperText}</p>
        </form>
      </section>
    </div>
  );
}
