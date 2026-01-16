import { z } from "zod";

export const sendMailSchema = z.object({
  from: z.string().email({ message: "Invalid email address" }),
  to: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(1, { message: "Message content is required" }),
});

export type SendMailFormValues = z.infer<typeof sendMailSchema>;
