"use client";

import { useActionState } from "react";
import AppIcon from "@/shared/icons/AppIcon";
import {
  initialForgotPasswordActionState,
  submitForgotPasswordAction,
} from "../server/actions";
import type {
  ForgotPasswordActionState,
  ForgotPasswordViewModel,
} from "../types";
import styles from "../forgot-password.module.css";

type ForgotPasswordFormProps = {
  content: ForgotPasswordViewModel["content"];
};

export default function ForgotPasswordForm({
  content,
}: ForgotPasswordFormProps) {
  const [actionState, formAction, isPending] = useActionState<
    ForgotPasswordActionState,
    FormData
  >(submitForgotPasswordAction, initialForgotPasswordActionState);

  return (
    <form action={formAction} className={styles.form}>
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

      {actionState.status !== "idle" ? (
        <p
          className={
            actionState.status === "error"
              ? styles.formMessageError
              : styles.formMessageSuccess
          }
        >
          {actionState.message}
        </p>
      ) : null}

      <button className={styles.submitButton} disabled={isPending} type="submit">
        <span>{isPending ? "Sending..." : content.submitLabel}</span>
        <AppIcon className={styles.submitArrow} name="arrowForward" />
      </button>
    </form>
  );
}
