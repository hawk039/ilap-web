"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient, ApiError } from "@/lib/api/client";
import type { AuthResponse } from "@/lib/api/types";
import { routes } from "@/lib/routes";
import AppIcon from "@/shared/icons/AppIcon";
import { useAuth } from "@/shared/auth/AuthProvider";
import {useSignInForm} from "../hooks/useSignInForm";
import { validateSignInSubmission } from "../lib/validation";
import type {SignInViewModel} from "../types";
import styles from "../signin.module.css";

type SignInFormProps = {
    form: SignInViewModel["form"];
};

export default function SignInForm({form}: SignInFormProps) {
    const auth = useAuth();
    const router = useRouter();
    const signInForm = useSignInForm();
    const [isPending, setIsPending] = useState(false);
    const [formMessage, setFormMessage] = useState<{
        message: string;
        status: "success" | "error";
    } | null>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");

        const validation = validateSignInSubmission({ email, password });

        if (!validation.ok) {
            setFormMessage({ message: validation.message, status: "error" });
            return;
        }

        setIsPending(true);
        setFormMessage(null);

        try {
            const response = await apiClient.post<AuthResponse>("/auth/login", {
                email,
                password,
            });

            auth.setAuthSession(response);
            router.push(routes.dashboard);
        } catch (error) {
            const message =
                error instanceof ApiError ? error.message : "Unable to sign in right now.";

            setFormMessage({
                message,
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
                    <span className={styles.labelText}>Email Address</span>
                    <input
                        className={styles.textInput}
                        id="email"
                        name="email"
                        placeholder={form.emailPlaceholder}
                        required
                        type="email"
                    />
                </label>
            </div>

            <div>
                <div className={styles.passwordHeader}>
                    <span className={styles.labelText}>Password</span>
                    <Link className={styles.forgotLink} href={form.forgotPasswordHref}>
                        Forgot Password?
                    </Link>
                </div>
                <div className={styles.passwordShell}>
                    <input
                        className={styles.textInput}
                        id="password"
                        name="password"
                        placeholder={form.passwordPlaceholder}
                        required
                        type={signInForm.isPasswordVisible ? "text" : "password"}
                    />
                    <button
                        aria-label={
                            signInForm.isPasswordVisible ? "Hide password" : "Show password"
                        }
                        className={styles.passwordToggle}
                        onClick={signInForm.togglePasswordVisibility}
                        type="button"
                    >
                        <AppIcon
                            className={styles.passwordIcon}
                            name={signInForm.isPasswordVisible ? "visibilityOff" : "visibility"}
                        />
                    </button>
                </div>
            </div>

            <div className={styles.rememberRow}>
                <input className={styles.checkbox} id="remember" name="remember" type="checkbox"/>
                <label className={styles.rememberLabel} htmlFor="remember">
                    {form.rememberMeLabel}
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
                {isPending ? "Signing In..." : form.submitLabel}
                <AppIcon className={styles.submitArrow} name="arrowForward"/>
            </button>
        </form>
    );
}
