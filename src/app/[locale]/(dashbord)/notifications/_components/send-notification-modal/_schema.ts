import { z } from "zod";

export const sendNotificationSchema = z.object({
  recipient:      z.enum(["allDrivers", "allUsers", "specificDriver", "specificUser"]),
  search:         z.string().optional(),
  title_ar:       z.string().min(1, "هذا الحقل مطلوب"),
  title_en:       z.string().min(1, "This field is required"),
  description_ar: z.string().min(1, "هذا الحقل مطلوب"),
  description_en: z.string().min(1, "This field is required"),
}).superRefine((data, ctx) => {
  if (
    (data.recipient === "specificDriver" || data.recipient === "specificUser") &&
    !data.search?.trim()
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "هذا الحقل مطلوب",
      path: ["search"],
    });
  }
});

export type SendNotificationSchema = z.infer<typeof sendNotificationSchema>;