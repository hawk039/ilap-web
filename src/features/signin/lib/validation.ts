import type { SignInSubmission } from "../types";

function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateSignInSubmission(
  submission: SignInSubmission,
): { ok: true } | { ok: false; message: string } {
  if (!submission.email || !submission.password) {
    return {
      ok: false,
      message: "Email and password are required.",
    };
  }

  if (!isEmailValid(submission.email)) {
    return {
      ok: false,
      message: "Enter a valid email address.",
    };
  }

  return { ok: true };
}
