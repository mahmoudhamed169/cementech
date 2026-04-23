"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import PricingField from "./pricing-field";
import SaveButton from "./save-button";
import { usePricing } from "../../../_hooks/pricing/use-pricing";
import { useUpdatePricing } from "../../../_hooks/pricing/use-update-pricing";
import { UpdatePricingInput } from "@/src/lib/types/settings/pricing/pricing";
import { usePermissionsStore } from "@/src/store/permissionsStore";

export default function PricingTab() {
  const t = useTranslations("settingsPage.tabs.pricing");
  const { data, isLoading } = usePricing();
  const { mutate: savePricing, isPending } = useUpdatePricing();

  const can = usePermissionsStore((s) => s.can);
  const canEdit = can("setting_permission", "PATCH");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<UpdatePricingInput>({
    defaultValues: {
      kilometric_price: 0,
      commission_percentage: 0,
      cancellation_fee: 0,
      bank_percentage: 0,
    },
  });

  useEffect(() => {
    if (data?.data) {
      reset({
        kilometric_price: data.data.kilometric_price,
        commission_percentage: data.data.commission_percentage,
        cancellation_fee: data.data.cancellation_fee,
        bank_percentage: data.data.bank_percentage,
      });
    }
  }, [data, reset]);

  const onSubmit = (values: UpdatePricingInput) => {
    if (!canEdit) return; // ← حماية إضافية
    savePricing(values);
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-100 py-16 flex flex-col items-center justify-center gap-3">
        <Loader2 size={28} className="text-gray-400 animate-spin" />
        <p className="text-sm text-gray-400">{t("loading")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-gray-800">{t("title")}</h3>
        <p className="text-sm text-gray-500">{t("subtitle")}</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <PricingField
          label={t("fields.pricePerKm")}
          unit="₾"
          registration={register("kilometric_price", { valueAsNumber: true })}
          disabled={!canEdit} // ← معطل لو مفيش صلاحية
        />
        <PricingField
          label={t("fields.commission")}
          unit="%"
          registration={register("commission_percentage", {
            valueAsNumber: true,
          })}
          disabled={!canEdit}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <PricingField
          label={t("fields.cancellationFee")}
          unit="₾"
          registration={register("cancellation_fee", { valueAsNumber: true })}
          disabled={!canEdit}
        />
        <PricingField
          label={t("fields.bankPercentage")}
          unit="%"
          registration={register("bank_percentage", { valueAsNumber: true })}
          disabled={!canEdit}
        />
      </div>

      {/* ← إخفاء زر الحفظ لو مفيش صلاحية */}
      {canEdit && (
        <div className="flex justify-end">
          <SaveButton
            label={t("save")}
            isPending={isPending}
            disabled={!isDirty || isPending}
          />
        </div>
      )}
    </form>
  );
}
