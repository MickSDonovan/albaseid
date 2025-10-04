import { z } from "zod";

// ================================== VALIDATIONS =================================

// --------------------  EMAIL ------------------------
export const emailValidation = z.preprocess(
  (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
  z.email({ error: "Invalid email format" })
);

// --------------------  Firstname ------------------------
export const firstnameValidation = z
  .string({
    error: (iss) =>
      iss.input === undefined
        ? "Firstname is required."
        : "Firstname must be a string.",
  })
  .min(1, { error: "Firstname cannot be empty" });

// --------------------  Lastname ------------------------
export const lastnameValidation = z
  .string({
    error: (iss) =>
      iss.input === undefined
        ? "Lastname is required."
        : "Lastname must be a string.",
  })
  .min(1, { error: "Lastname cannot be empty" });
// --------------------  Name (firstname and lastname , example : dupont Marc) ------------------------
export const fullNameValidation = z
  .string({
    error: (iss) =>
      iss.input === undefined
        ? "Fullname is required."
        : "Fullname must be a string.",
  })
  .min(1, { error: "Fullname cannot be empty" });

// --------------------  IMAGE (firstname and lastname , example : dupont Marc) ------------------------
export const imageValidation = z
  .string({
    error: (iss) =>
      iss.input === undefined
        ? "Image is required."
        : "Image must be a string.",
  })
  .min(1, { error: "Image cannot be empty" });

// ================================== SCHEMAS =================================

export const usersSchema = {
  create: z.object({
    name: fullNameValidation.optional(),
    image: imageValidation.optional(),
  }),
};
