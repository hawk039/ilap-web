"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { chatContent } from "../constants";
import type {
  ChatConversationSnapshot,
  ChatMessage,
  IlapChatRequest,
  IlapChatResponse,
} from "../types";

const storagePrefix = "ilap-chat";

type UseIlapChatArgs = {
  lawType: string;
  sessionId: string;
};

function getStorageKey(sessionId: string) {
  return `${storagePrefix}:${sessionId}`;
}

export function useIlapChat({ lawType, sessionId }: UseIlapChatArgs) {
  const [composerValue, setComposerValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [contextTurnId, setContextTurnId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const storageKey = useMemo(
    () => (sessionId ? getStorageKey(sessionId) : ""),
    [sessionId],
  );

  useEffect(() => {
    if (!storageKey || typeof window === "undefined") {
      setMessages([]);
      setContextTurnId(null);
      return;
    }

    const savedConversation = window.sessionStorage.getItem(storageKey);

    if (!savedConversation) {
      setMessages([]);
      setContextTurnId(null);
      return;
    }

    try {
      const parsedConversation = JSON.parse(
        savedConversation,
      ) as ChatConversationSnapshot;

      if (
        parsedConversation.sessionId !== sessionId ||
        parsedConversation.lawType !== lawType
      ) {
        setMessages([]);
        setContextTurnId(null);
        return;
      }

      setMessages(parsedConversation.messages);
      setContextTurnId(parsedConversation.contextTurnId);
    } catch {
      setMessages([]);
      setContextTurnId(null);
    }
  }, [lawType, sessionId, storageKey]);

  useEffect(() => {
    if (!storageKey || typeof window === "undefined" || !lawType) {
      return;
    }

    const snapshot: ChatConversationSnapshot = {
      sessionId,
      lawType,
      contextTurnId,
      messages,
    };

    window.sessionStorage.setItem(storageKey, JSON.stringify(snapshot));
  }, [contextTurnId, lawType, messages, sessionId, storageKey]);

  async function submitQuery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!lawType || !sessionId) {
      setErrorMessage(chatContent.errors.missingLawType);
      return;
    }

    const query = composerValue.trim();

    if (!query) {
      setErrorMessage(chatContent.errors.emptyQuery);
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: query,
      lawType,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setComposerValue("");

    try {
      const payload: IlapChatRequest = {
        query,
        lawType,
        sessionId,
        contextTurnId: contextTurnId ?? undefined,
      };

      const response = await fetch("/api/ilap-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const parsedResponse = (await response.json()) as
        | IlapChatResponse
        | { error?: string };

      if (!response.ok) {
        const errorMessage =
          "error" in parsedResponse
            ? parsedResponse.error
            : chatContent.errors.failedRequest;
        throw new Error(errorMessage ?? chatContent.errors.failedRequest);
      }

      if ("error" in parsedResponse) {
        throw new Error(parsedResponse.error ?? chatContent.errors.failedRequest);
      }

      const successResponse = parsedResponse as IlapChatResponse;
      const nextContextTurnId =
        successResponse.turnId ?? successResponse.contextTurnId ?? null;

      setContextTurnId(nextContextTurnId);
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: successResponse.answer,
          response: successResponse,
        },
      ]);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : chatContent.errors.failedRequest,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    composerValue,
    errorMessage,
    isSubmitting,
    messages,
    setComposerValue,
    submitQuery,
  };
}
