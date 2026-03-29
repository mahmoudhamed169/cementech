"use client";

import { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SendNotificationSchema } from "../_schema";

interface SendNotificationFormProps {
  form: UseFormReturn<SendNotificationSchema>;
}

export default function SendNotificationForm({
  form,
}: SendNotificationFormProps) {
  const t = useTranslations("SendNotification.modal");

  return (
    <Form {...form}>
      <div className="space-y-4">
        {/* title_ar */}
        <FormField
          control={form.control}
          name="title_ar"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                {t("titleField.label_ar")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("titleField.placeholder_ar")}
                  className="rounded-xl border-[#D1D5DC] focus:border-gray-400 focus:ring-gray-200 transition-colors text-right"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* title_en */}
        <FormField
          control={form.control}
          name="title_en"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                {t("titleField.label_en")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("titleField.placeholder_en")}
                  className="rounded-xl border-[#D1D5DC] focus:border-gray-400 focus:ring-gray-200 transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* description_ar */}
        <FormField
          control={form.control}
          name="description_ar"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                {t("body.label_ar")}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("body.placeholder_ar")}
                  className="rounded-xl border-[#D1D5DC] focus:border-gray-400 focus:ring-gray-200 transition-colors min-h-24 resize-none text-right"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* description_en */}
        <FormField
          control={form.control}
          name="description_en"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                {t("body.label_en")}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("body.placeholder_en")}
                  className="rounded-xl border-[#D1D5DC] focus:border-gray-400 focus:ring-gray-200 transition-colors min-h-24 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
