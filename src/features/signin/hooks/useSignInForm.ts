"use client";

import { useState } from "react";

export function useSignInForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return {
    isPasswordVisible,
    togglePasswordVisibility() {
      setIsPasswordVisible((current) => !current);
    },
  };
}
