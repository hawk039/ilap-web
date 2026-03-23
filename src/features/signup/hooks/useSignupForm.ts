"use client";

import { useState } from "react";

export function useSignupForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return {
    isPasswordVisible,
    togglePasswordVisibility() {
      setIsPasswordVisible((current) => !current);
    },
  };
}
