import type { ValidationResult } from "../types/ValidationResult";

function validateEmail(email: string | undefined): ValidationResult {
  if (email === undefined) {
    return { isValid: false, message: "Email is undefined" };
  }
  if (email.length === 0) {
    return { isValid: false, message: "Please enter your email." };
  }
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = regex.test(email);

  return {
    isValid,
    message: isValid ? "" : "Your email appears to be invalid.",
  };
}

export { validateEmail };
