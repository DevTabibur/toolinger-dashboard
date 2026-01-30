import { z } from "zod";
export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(100, "Category name must not exceed 100 characters"),

  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ),

  // parentId: z.string().nullable(),
  // createdBy: z.string().nullable(),

  // description: z
  //   .string()
  //   .max(500, "Description must not exceed 500 characters")
  //   .optional(),

  // status: z.enum(["active", "inactive"]),

  // isSystem: z.boolean(),
});
