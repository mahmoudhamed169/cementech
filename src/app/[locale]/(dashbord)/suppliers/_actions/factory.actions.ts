"use server";

import { AddFactoryFormValues } from "../_components/add-factory-form";

export async function addFactoryAction(data: AddFactoryFormValues) {
  // TODO: استبدل بـ DB call (prisma, drizzle, etc.)
  console.log("Server action received:", data);

  // مثال على الـ response
  return { success: true, message: "تم إضافة المصنع بنجاح" };
}
