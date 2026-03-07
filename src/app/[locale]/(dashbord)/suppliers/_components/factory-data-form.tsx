"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { useMemo } from "react";
import ProductsManagement from "./factories-table/products-management";
import {
  FactoryDataFormValues,
  factoryDataSchema,
} from "../_schema/factory.schema";
import { RegionSelect } from "./factories-table/region-select";

const LocationPicker = dynamic(
  () => import("./location-picker").then((m) => m.LocationPicker),
  { ssr: false },
);

interface FactoryDataFormProps {
  onSubmit: (values: FactoryDataFormValues) => void;
  onCancel?: () => void;
  isPending?: boolean;
  dir?: "rtl" | "ltr";
  mode?: "add" | "edit";
  defaultValues?: Partial<FactoryDataFormValues>;
}

export default function FactoryDataForm({
  onSubmit,
  onCancel,
  isPending = false,
  dir,
  mode = "add",
  defaultValues,
}: FactoryDataFormProps) {
  const t = useTranslations("suppliersPage");
  const locale = useLocale();
  const resolvedDir = dir ?? (locale === "ar" ? "rtl" : "ltr");

  const schema = useMemo(() => factoryDataSchema(t), [t]);

  const form = useForm<FactoryDataFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nameAr: "",
      nameEn: "",
      locationAr: "",
      locationEn: "",
      phone: "",
      status: true,
      location: undefined,
      products: [],
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5"
        dir={resolvedDir}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <FormField
            control={form.control}
            name="nameAr"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[#364153] text-sm">
                  {t("addFactory.fields.nameAr.label")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("addFactory.fields.nameAr.placeholder")}
                    className={cn(
                      "py-2 px-4 rounded-xl w-full transition-all duration-200",
                      "border border-[#D1D5DC]",
                      "focus-visible:ring-0 focus-visible:border-[#101828] focus-visible:shadow-[0_0_0_3px_rgba(16,24,40,0.15)]",
                      fieldState.error &&
                        "border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]",
                    )}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nameEn"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[#364153] text-sm">
                  {t("addFactory.fields.nameEn.label")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("addFactory.fields.nameEn.placeholder")}
                    dir="ltr"
                    className={cn(
                      "py-2 px-4 rounded-xl w-full transition-all duration-200",
                      "border border-[#D1D5DC]",
                      "focus-visible:ring-0 focus-visible:border-[#101828] focus-visible:shadow-[0_0_0_3px_rgba(16,24,40,0.15)]",
                      fieldState.error &&
                        "border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]",
                    )}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="locationAr"
            render={({ fieldState }) => (
              <FormItem>
                <FormLabel className="text-[#364153] text-sm">
                  {t("addFactory.fields.region.label")}
                </FormLabel>
                <FormControl>
                  <RegionSelect
                    value={form.watch("locationAr")}
                    onChange={(nameAr, nameEn) => {
                      form.setValue("locationAr", nameAr);
                      form.setValue("locationEn", nameEn);
                    }}
                    placeholder={t("addFactory.fields.region.placeholder")}
                    hasError={!!fieldState.error}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[#364153] text-sm">
                  {t("addFactory.fields.phone.label")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("addFactory.fields.phone.placeholder")}
                    dir="ltr"
                    type="tel"
                    className={cn(
                      "py-2 px-4 rounded-xl w-full transition-all duration-200",
                      "border border-[#D1D5DC]",
                      "focus-visible:ring-0 focus-visible:border-[#101828] focus-visible:shadow-[0_0_0_3px_rgba(16,24,40,0.15)]",
                      fieldState.error &&
                        "border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]",
                    )}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="text-[#364153] text-sm">
                  {t("addFactory.fields.status.label")}
                </FormLabel>
                <div className="flex items-center justify-between w-full px-1 py-2">
                  <span
                    className={cn(
                      "text-xs font-medium px-3 py-1 rounded-full",
                      field.value
                        ? "bg-[#DCFCE7] text-[#00A63E]"
                        : "bg-[#FEE2E2] text-red-500",
                    )}
                  >
                    {field.value ? t("status.active") : t("status.inactive")}
                  </span>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="col-span-2 flex flex-col gap-1">
                <FormLabel className="text-[#364153] text-xl font-bold">
                  {t("addFactory.fields.location.label")}
                </FormLabel>
                <FormControl>
                  <LocationPicker
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <ProductsManagement />

        <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-[#E5E7EB]">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="rounded-xl px-6"
            >
              {t("addFactory.buttons.cancel")}
            </Button>
          )}
          <Button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-[#00A63E] hover:bg-[#008f35] text-white px-6"
          >
            {isPending
              ? t("addFactory.buttons.submitting")
              : mode === "edit"
                ? t("editFactory.buttons.submit")
                : t("addFactory.buttons.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
