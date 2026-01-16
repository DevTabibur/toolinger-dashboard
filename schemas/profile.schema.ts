import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNo: z.string().optional(),
  avatar: z.string().optional(),
  // userName: z.string().min(1, { message: "User Name is required" }),
  // password: z
  //   .string()
  //   .min(6, { message: "Password must be at least 6 characters" }),
});
