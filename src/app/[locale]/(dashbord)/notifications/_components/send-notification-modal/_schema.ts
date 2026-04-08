// _schema.ts
import { z } from "zod";

export const sendNotificationSchema = z.object({
  recipient: z.enum(["allDrivers", "allUsers", "all", "allSupervisors"]), // ✅
  title_ar: z.string().min(1, "هذا الحقل مطلوب"),
  title_en: z.string().min(1, "This field is required"),
  description_ar: z.string().min(1, "هذا الحقل مطلوب"),
  description_en: z.string().min(1, "This field is required"),
});

export type SendNotificationSchema = z.infer<typeof sendNotificationSchema>;
