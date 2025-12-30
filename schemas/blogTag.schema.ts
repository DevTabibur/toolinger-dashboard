import { z } from "zod";
export const tagSchema = z.object({
  name: z
    .string()
    .min(2, "Tag name must be at least 2 characters")
    .max(50, "Tag name must not exceed 50 characters"),

  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ),

  //   createdBy: z.string().nullable(),

  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),

  status: z.enum(["active", "inactive", "pending"]), //"rejected",  "blocked",

  isSystem: z.boolean(),
});
