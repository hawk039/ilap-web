"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { useSignupForm } from "../hooks/useSignupForm";
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
  const signupForm = useSignupForm();
  const router = useRouter();

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        router.push(routes.dashboard);
      }}
    >
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

      <button className={styles.submitButton} type="submit">
        <span>{form.submitLabel}</span>
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
