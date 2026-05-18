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
        <div className={styles.chatTimeline}>
          <div className={styles.dateMarkerRow}>
            <span className={styles.dateMarker}>Today</span>
          </div>

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
                  Ask your first question and the backend will persist the
                  conversation timeline for future retrieval.
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
        </div>

        <div className={styles.composerDock}>
          <div className={styles.suggestionRow}>
            {content.activeState.suggestionPrompts.map((prompt) => (
              <button
                className={styles.suggestionChip}
                key={prompt}
                onClick={() => setComposerValue(prompt)}
                type="button"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form className={styles.composerForm} onSubmit={submitQuery}>
            <div className={styles.composerFrame}>
              <textarea
                className={styles.composerInput}
                id="chat-query"
                onChange={(event) => setComposerValue(event.target.value)}
                placeholder={content.activeState.composerPlaceholder}
                rows={1}
                value={composerValue}
              />
              <div className={styles.composerActions}>
                <button className={styles.micButton} type="button">
                  <AppIcon className={styles.micButtonIcon} name="mic" />
                </button>
                <button
                  className={styles.sendButton}
                  disabled={isSubmitting}
                  type="submit"
                >
                  <AppIcon className={styles.sendButtonIcon} name="send" />
                </button>
              </div>
            </div>
            {errorMessage ? <p className={styles.errorText}>{errorMessage}</p> : null}
            <p className={styles.helperText}>{content.activeState.helperText}</p>
          </form>
        </div>
      </section>
    </div>
  );
}
