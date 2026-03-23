"use server";

import { initialSignupActionState } from "../constants";
import { validateSignupSubmission } from "../lib/validation";
import type { SignupActionState } from "../types";

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export { initialSignupActionState };

export async function submitSignupAction(
  _previousState: SignupActionState,
  formData: FormData,
): Promise<SignupActionState> {
  const validationResult = validateSignupSubmission({
    name: readString(formData, "name"),
    email: readString(formData, "email"),
    password: readString(formData, "password"),
    acceptedTerms: formData.get("terms") === "on",
  });

  if (!validationResult.ok) {
    return {
      message: validationResult.message,
      status: "error",
    };
  }

  return {
    message: "Signup submission received. Backend integration is the next step.",
    status: "success",
  };
}
