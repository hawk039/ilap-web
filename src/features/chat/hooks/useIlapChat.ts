"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { apiClient, ApiError } from "@/lib/api/client";
import type {
  AskConversationResponse,
  ConversationMessage,
  ConversationSummary,
} from "@/lib/api/types";
import { chatContent } from "../constants";

type UseIlapChatArgs = {
  conversationId: string;
};

export function useIlapChat({ conversationId }: UseIlapChatArgs) {
  const [composerValue, setComposerValue] = useState("");
  const [conversation, setConversation] = useState<ConversationSummary | null>(null);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadConversationIndex() {
      setIsLoadingConversations(true);

      try {
        const response = await apiClient.get<ConversationSummary[]>(
          "/conversations?limit=20&offset=0",
          { auth: true },
        );

        if (isMounted) {
          setConversations(response);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof ApiError
              ? error.message
              : "Unable to load conversations right now.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingConversations(false);
        }
      }
    }

    loadConversationIndex();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!conversationId) {
      setConversation(null);
      setMessages([]);
      return;
    }

    let isMounted = true;

    async function loadConversation() {
      setIsLoadingConversation(true);
      setErrorMessage("");

      try {
        const [conversationResponse, messagesResponse] = await Promise.all([
          apiClient.get<ConversationSummary>(`/conversations/${conversationId}`, {
            auth: true,
          }),
          apiClient.get<ConversationMessage[]>(
            `/conversations/${conversationId}/messages?limit=100&offset=0`,
            { auth: true },
          ),
        ]);

        if (!isMounted) {
          return;
        }

        setConversation(conversationResponse);
        setMessages(messagesResponse);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(
          error instanceof ApiError
            ? error.message
            : "Unable to load this conversation right now.",
        );
      } finally {
        if (isMounted) {
          setIsLoadingConversation(false);
        }
      }
    }

    loadConversation();

    return () => {
      isMounted = false;
    };
  }, [conversationId]);

  async function submitQuery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!conversationId) {
      setErrorMessage(chatContent.errors.missingConversation);
      return;
    }

    const query = composerValue.trim();

    if (!query) {
      setErrorMessage(chatContent.errors.emptyQuery);
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await apiClient.post<AskConversationResponse>(
        `/conversations/${conversationId}/ask`,
        {
          idempotencyKey: crypto.randomUUID(),
          query,
        },
        { auth: true },
      );

      const refreshedMessages = await apiClient.get<ConversationMessage[]>(
        `/conversations/${conversationId}/messages?limit=100&offset=0`,
        { auth: true },
      );

      setMessages(refreshedMessages);
      setComposerValue("");
    } catch (error) {
      if (error instanceof ApiError) {
        const requestIdSuffix = error.requestId
          ? ` Request ID: ${error.requestId}.`
          : "";

        setErrorMessage(`${error.message}${requestIdSuffix}`);
      } else {
        setErrorMessage(chatContent.errors.failedRequest);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
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
  };
}
