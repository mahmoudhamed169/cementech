"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { SendNotificationSchema } from "../_schema";

const inputClass =
  "rounded-xl border-[#D1D5DC] focus-visible:ring-ring/50 focus-visible:ring-[3px]";

interface NotificationFormFieldsProps {
  form: UseFormReturn<SendNotificationSchema>;
}

export default function NotificationFormFields({ form }: NotificationFormFieldsProps) {
  const t = useTranslations("NotificationPage.sendModal");

  return (
    <div className="space-y-4">
      <FormField control={form.control} name="title_ar"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">{t("titleField.label_ar")}</FormLabel>
            <FormControl>
              <Input placeholder={t("titleField.placeholder_ar")} className={`${inputClass} text-right`} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField control={form.control} name="title_en"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">{t("titleField.label_en")}</FormLabel>
            <FormControl>
              <Input placeholder={t("titleField.placeholder_en")} className={inputClass} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField control={form.control} name="description_ar"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">{t("body.label_ar")}</FormLabel>
            <FormControl>
              <Textarea placeholder={t("body.placeholder_ar")} className={`${inputClass} min-h-24 resize-none text-right`} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField control={form.control} name="description_en"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">{t("body.label_en")}</FormLabel>
            <FormControl>
              <Textarea placeholder={t("body.placeholder_en")} className={`${inputClass} min-h-24 resize-none`} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}