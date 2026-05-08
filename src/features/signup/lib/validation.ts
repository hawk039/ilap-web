import type { SignupSubmission } from "../types";

function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateSignupSubmission(
  submission: SignupSubmission,
): { ok: true } | { ok: false; message: string } {
  if (!submission.name || !submission.email || !submission.password) {
    return {
      ok: false,
      message: "All fields are required.",
    };
  }

  if (!isEmailValid(submission.email)) {
    return {
      ok: false,
      message: "Enter a valid email address.",
    };
  }

  if (submission.password.length < 12) {
    return {
      ok: false,
      message:
        "Password must be at least 12 characters and meet the backend policy.",
    };
  }

  if (!submission.acceptedTerms) {
    return {
      ok: false,
      message: "You must accept the terms to continue.",
    };
  }

  return { ok: true };
}
