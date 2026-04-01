// app/[locale]/payments/page.tsx
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export default async function PaymentsPage() {
  const locale = await getLocale();
  redirect(`/${locale}/payments/operations`);
}
