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

function validatePassword(password: string) {
  if (password.length < 6) {
    return `The length of 'Password' must be at least 6 characters. You entered ${password.length} characters.`;
  }
}

function validateFile(file: File) {
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/bmp",
  ];
  const maxSize = 4 * 1024 * 1024; // 4MB

  if (!validTypes.includes(file.type)) {
    return "Please upload a JPG, JPEG, BMP, PNG, or GIF file";
  }

  if (file.size > maxSize) {
    return "File size must be less than 10MB";
  }

  return null;
}

export { validateEmail, validateFile, validatePassword };
