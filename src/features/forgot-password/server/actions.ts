"use server";

import { initialForgotPasswordActionState } from "../constants";
import { validateForgotPasswordSubmission } from "../lib/validation";
import type { ForgotPasswordActionState } from "../types";

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export { initialForgotPasswordActionState };

export async function submitForgotPasswordAction(
  _previousState: ForgotPasswordActionState,
  formData: FormData,
): Promise<ForgotPasswordActionState> {
  const validation = validateForgotPasswordSubmission({
    email: readString(formData, "email"),
  });

  if (!validation.ok) {
    return {
      message: validation.message,
      status: "error",
    };
  }

  return {
    message: "If the email exists, reset instructions will be sent shortly.",
    status: "success",
  };
}
