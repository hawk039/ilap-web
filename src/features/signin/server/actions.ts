"use server";

import { initialSignInActionState } from "../constants";
import { validateSignInSubmission } from "../lib/validation";
import type { SignInActionState } from "../types";

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export { initialSignInActionState };

export async function submitSignInAction(
  _previousState: SignInActionState,
  formData: FormData,
): Promise<SignInActionState> {
  const validation = validateSignInSubmission({
    email: readString(formData, "email"),
    password: readString(formData, "password"),
  });

  if (!validation.ok) {
    return {
      message: validation.message,
      status: "error",
    };
  }

  return {
    message: "Sign-in submission received. Authentication integration is the next step.",
    status: "success",
  };
}
