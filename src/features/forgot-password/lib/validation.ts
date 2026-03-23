import type { ForgotPasswordSubmission } from "../types";

function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateForgotPasswordSubmission(
  submission: ForgotPasswordSubmission,
): { ok: true } | { ok: false; message: string } {
  if (!submission.email) {
    return {
      ok: false,
      message: "Email address is required.",
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
