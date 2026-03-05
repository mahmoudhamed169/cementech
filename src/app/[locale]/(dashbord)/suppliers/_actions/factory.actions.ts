"use server";

import { AddFactoryFormValues } from "../_components/add-factory-form";

export async function addFactoryAction(data: AddFactoryFormValues) {
  // TODO: استبدل بـ DB call (prisma, drizzle, etc.)
  console.log("Server action received:", data);

  // مثال على الـ response
  return { success: true, message: "تم إضافة المصنع بنجاح" };
}

export async function deleteFactoryAction(id: string) {
  // TODO: DB call
  console.log("Delete factory:", id);
  return { success: true };
}
