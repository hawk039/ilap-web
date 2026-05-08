"use client";

import { FormEvent, useState } from "react";
import { apiClient, ApiError } from "@/lib/api/client";
import AppIcon from "@/shared/icons/AppIcon";
import { validateForgotPasswordSubmission } from "../lib/validation";
import type { ForgotPasswordViewModel } from "../types";
import styles from "../forgot-password.module.css";

type ForgotPasswordFormProps = {
  content: ForgotPasswordViewModel["content"];
};

export default function ForgotPasswordForm({
  content,
}: ForgotPasswordFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [formMessage, setFormMessage] = useState<{
    message: string;
    status: "success" | "error";
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const validation = validateForgotPasswordSubmission({ email });

    if (!validation.ok) {
      setFormMessage({
        message: validation.message,
        status: "error",
      });
      return;
    }

    setIsPending(true);
    setFormMessage(null);

    try {
      await apiClient.post("/auth/forgot-password", { email });
      setFormMessage({
        message: "If the email exists, reset instructions will be sent shortly.",
        status: "success",
      });
    } catch (error) {
      setFormMessage({
        message:
          error instanceof ApiError
            ? error.message
            : "Unable to submit the reset request right now.",
        status: "error",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label className={styles.inputLabel} htmlFor="email">
          {content.emailLabel}
        </label>
        <div className={styles.inputShell}>
          <AppIcon className={styles.inputIcon} name="mail" />
          <input
            className={styles.textInput}
            id="email"
            name="email"
            placeholder={content.emailPlaceholder}
            type="email"
          />
        </div>
      </div>

      {formMessage ? (
        <p
          className={
            formMessage.status === "error"
              ? styles.formMessageError
              : styles.formMessageSuccess
          }
        >
          {formMessage.message}
        </p>
      ) : null}

      <button className={styles.submitButton} disabled={isPending} type="submit">
        <span>{isPending ? "Sending..." : content.submitLabel}</span>
        <AppIcon className={styles.submitArrow} name="arrowForward" />
      </button>
    </form>
  );
}
