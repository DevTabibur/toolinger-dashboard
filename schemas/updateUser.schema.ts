import { z } from "zod";

export const editUserSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email address"),
    role: z.string().min(1, "Role is required"),
    phone: z.string().min(6, "Phone is required"),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    status: z.enum(["active", "inactive", "pending"]),
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );
