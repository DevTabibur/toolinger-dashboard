import { z } from "zod";
import { BLOG_STATUS } from "@/constants/blogStatus.constant";

export const BlogPostSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  content: z.string().min(1, "Content is required"),

  status: z.enum(BLOG_STATUS),
  excerpt: z
    .string()
    .max(160, "Excerpt must be less than 160 characters")
    .optional(),
  primaryCategory: z
    .string()
    .min(1, "Category is required")
    .default("Uncategorized"),
  // secondaryCategories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  // scheduledAt: z.date().optional(),
  // blogFeaturedImage: z.string().min(1, "Featured image is required"),
  // allowComments: z.boolean().default(true),
  // isFeatured: z.boolean().default(false),
  // isSponsored: z.boolean().default(false),
  // sponsorName: z.string().optional(),
  // sponsorUrl: z.string().url("Invalid URL").optional(),
  // publishedAt: z.date().optional(),
  // scheduledAt: z.date().optional(),
  seo: z.object({
    title: z.string().max(70, "SEO title must be less than 70 characters").optional(),
    description: z.string().max(160, "SEO description must be less than 160 characters").optional(),
    // keywords: z.array(z.string()).optional(),
    // noIndex: z.boolean().default(false),
    // noFollow: z.boolean().default(false),
  }).optional(),
});
