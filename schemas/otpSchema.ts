import { z } from "zod";

export const otpSettingsSchema = z.object({
  otpType: z.enum(["sms", "email"]),
  otpDigitLimit: z.enum(["4", "6", "8"]),
  otpExpireTime: z.enum(["5", "10", "15", "30"]),
});

export type OTPSettingsFormValues = z.infer<typeof otpSettingsSchema>;
