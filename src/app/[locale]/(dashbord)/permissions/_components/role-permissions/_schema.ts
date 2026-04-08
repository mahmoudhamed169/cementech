import { z } from "zod";
import { HttpMethod } from "@/src/types/permissions/permission";

const httpMethodsSchema = z.array(z.enum(["GET", "POST", "PATCH", "DELETE"]));

export const createPermissionSchema = z.object({
  name_en: z.string().min(1, "الاسم بالإنجليزية مطلوب"),
  name_ar: z.string().min(1, "الاسم بالعربية مطلوب"),
  description_en: z.string().optional().default(""),
  description_ar: z.string().optional().default(""),
  home_permission: httpMethodsSchema.default([]),
  order_permission: httpMethodsSchema.default([]),
  driver_permission: httpMethodsSchema.default([]),
  loading_request_permission: httpMethodsSchema.default([]),
  user_permission: httpMethodsSchema.default([]),
  payment_permission: httpMethodsSchema.default([]),
  invoice_permission: httpMethodsSchema.default([]),
  notification_permission: httpMethodsSchema.default([]),
  management_permission: httpMethodsSchema.default([]),
  supervisor_permission: httpMethodsSchema.default([]),
  supplier_permission: httpMethodsSchema.default([]),
  terms_permission: httpMethodsSchema.default([]),
  setting_permission: httpMethodsSchema.default([]),
});

export type CreatePermissionSchema = z.infer<typeof createPermissionSchema>;
