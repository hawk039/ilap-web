"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiClient, ApiError } from "@/lib/api/client";
import type { AuthResponse } from "@/lib/api/types";
import { routes } from "@/lib/routes";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useSignupForm } from "../hooks/useSignupForm";
import { validateSignupSubmission } from "../lib/validation";
import type { SignupFieldViewModel, SignupForm as SignupFormType } from "../types";
import AppIcon from "@/shared/icons/AppIcon";
import styles from "../signup.module.css";

type SignupFieldProps = {
  field: SignupFieldViewModel;
  isPasswordVisible: boolean;
  onTogglePassword: () => void;
};

function SignupField({
  field,
  isPasswordVisible,
  onTogglePassword,
}: SignupFieldProps) {
  const isPasswordField = field.id === "password";
  const inputType = isPasswordField && isPasswordVisible ? "text" : field.type;

  return (
    <div className={styles.fieldGroup}>
      <label className={styles.fieldLabel} htmlFor={field.id}>
        {field.label}
      </label>
      <div className={styles.inputShell}>
        <AppIcon className={styles.leadingIcon} name={field.icon} />
        <input
          autoComplete={field.autoComplete}
          className={styles.input}
          id={field.id}
          name={field.id}
          placeholder={field.placeholder}
          type={inputType}
        />
        {isPasswordField ? (
          <button
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            className={styles.trailingIconButton}
            onClick={onTogglePassword}
            type="button"
          >
            <AppIcon
              className={styles.trailingIcon}
              name={isPasswordVisible ? "visibilityOff" : "visibility"}
            />
          </button>
        ) : null}
      </div>
    </div>
  );
}

type SignupFormProps = {
  form: SignupFormType;
};

export default function SignupForm({ form }: SignupFormProps) {
  const auth = useAuth();
  const signupForm = useSignupForm();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [formMessage, setFormMessage] = useState<{
    message: string;
    status: "success" | "error";
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const submission = {
      acceptedTerms: formData.get("terms") === "on",
      email: String(formData.get("email") ?? "").trim(),
      name: String(formData.get("name") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
    };

    const validation = validateSignupSubmission(submission);

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
      const response = await apiClient.post<AuthResponse>("/auth/register", {
        email: submission.email,
        fullName: submission.name,
        password: submission.password,
      });

      auth.setAuthSession(response);
      router.push(routes.dashboard);
    } catch (error) {
      setFormMessage({
        message:
          error instanceof ApiError
            ? error.message
            : "Unable to create your account right now.",
        status: "error",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {form.fields.map((field) => (
        <SignupField
          field={field}
          isPasswordVisible={signupForm.isPasswordVisible}
          key={field.id}
          onTogglePassword={signupForm.togglePasswordVisibility}
        />
      ))}

      <div className={styles.termsRow}>
        <input
          className={styles.checkbox}
          id={form.terms.id}
          name={form.terms.id}
          type="checkbox"
        />
        <label className={styles.termsText} htmlFor={form.terms.id}>
          {form.terms.copyBefore}{" "}
          <Link className={styles.inlineLink} href={form.terms.termsHref}>
            {form.terms.termsLabel}
          </Link>{" "}
          and{" "}
          <Link className={styles.inlineLink} href={form.terms.privacyHref}>
            {form.terms.privacyLabel}
          </Link>{" "}
          {form.terms.copyAfter}
        </label>
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
        <span>{isPending ? "Creating Account..." : form.submitLabel}</span>
        <AppIcon className={styles.submitArrow} name="arrowForward" />
      </button>

      <p className={styles.altPrompt}>
        {form.alternatePrompt}{" "}
        <Link className={styles.altLink} href={form.alternateAction.href}>
          {form.alternateAction.label}
        </Link>
      </p>
    </form>
  );
}
