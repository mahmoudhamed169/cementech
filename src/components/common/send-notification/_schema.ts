import { z } from "zod";

export const sendNotificationSchema = z.object({
  title_en: z.string().min(1, "This field is required"),
  title_ar: z.string().min(1, "هذا الحقل مطلوب"),
  description_en: z.string().min(1, "This field is required"),
  description_ar: z.string().min(1, "هذا الحقل مطلوب"),
});

export type SendNotificationSchema = z.infer<typeof sendNotificationSchema>;
