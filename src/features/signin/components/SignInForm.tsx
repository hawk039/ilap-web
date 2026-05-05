"use client";

import Link from "next/link";
import {useActionState} from "react";
import AppIcon from "@/shared/icons/AppIcon";
import {useSignInForm} from "../hooks/useSignInForm";
import {
    initialSignInActionState,
    submitSignInAction,
} from "../server/actions";
import type {SignInActionState, SignInViewModel} from "../types";
import styles from "../signin.module.css";

type SignInFormProps = {
    form: SignInViewModel["form"];
};

export default function SignInForm({form}: SignInFormProps) {
    const signInForm = useSignInForm();
    const [actionState, formAction, isPending] = useActionState<
        SignInActionState,
        FormData
    >(submitSignInAction, initialSignInActionState);

    return (
        <form action={formAction} className={styles.form}>
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
                {isPending ? "Signing In..." : form.submitLabel}
                <AppIcon className={styles.submitArrow} name="arrowForward"/>
            </button>
        </form>
    );
}
