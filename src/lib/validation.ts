import { z } from "zod";
const requiredString = z.string().trim().min(1, "Required");
//Schemas
export const signUpSchema = z.object({
  email: requiredString.email("Invaild email address"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters, - and _ allowed",
  ),
  password: requiredString.min(8, "Must be at least 8 characters"),
});

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});
export const createPostSchema = z.object({
  content: requiredString,
  mediaIds: z.array(z.string()).max(5, "Cannot have more than 5 attachments"),
});
export const updatedUserProfileSchema = z.object({
  displayName: requiredString,
  bio: z.string().max(1000, "Must be at most 1000 characters"),
});
export const createCommentSchema = z.object({
  content: requiredString,
});
//Types
export type SignUpValues = z.infer<typeof signUpSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
export type UpdateUserProfileValues = z.infer<typeof updatedUserProfileSchema>;
