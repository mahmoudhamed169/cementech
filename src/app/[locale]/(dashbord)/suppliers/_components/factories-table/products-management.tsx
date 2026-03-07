"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import NpProducts from "./no-product";

export default function ProductsManagement() {
  const t = useTranslations("suppliersPage");

  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  return (
    <div className="space-y-4 mt-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold mb-1">
          {t("addFactory.productsManagement.title")}
        </h3>
        <Button
          type="button"
          onClick={() =>
            append({ nameAr: "", nameEn: "", price: "", isActive: true })
          }
          className="min-w-46 min-h-12 rounded-xl bg-[#00A63E] text-white p-3 flex justify-center items-center gap-2"
        >
          <CirclePlus />
          {t("addFactory.productsManagement.addBtn")}
        </Button>
      </div>

      {fields.length === 0 ? (
        <NpProducts />
      ) : (
        <div className="border border-[#E5E7EB] rounded-xl bg-gray-50 overflow-hidden">
          <div className="grid grid-cols-[48px_1fr_1fr_1fr_48px] gap-x-3 px-4 py-2 bg-gray-100 text-sm font-semibold text-gray-600 text-right">
            <div className="text-center">
              {t("addFactory.productsManagement.columns.index")}
            </div>
            <div>{t("addFactory.productsManagement.columns.nameAr")}</div>
            <div>{t("addFactory.productsManagement.columns.nameEn")}</div>
            <div>{t("addFactory.productsManagement.columns.price")}</div>
            <div />
          </div>

          <div className="divide-y divide-[#E5E7EB]">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-[48px_1fr_1fr_1fr_48px] gap-x-3 px-4 py-3 items-center"
              >
                <div className="flex items-center justify-center">
                  <span className="w-7 h-7 rounded-full bg-[#00A63E]/10 text-[#00A63E] text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>

                <div>
                  <Input
                    placeholder={t(
                      "addFactory.productsManagement.fields.nameAr.placeholder",
                    )}
                    {...register(`products.${index}.nameAr`)}
                    className={
                      errors?.products?.[index]?.nameAr ? "border-red-500" : ""
                    }
                  />
                  {errors?.products?.[index]?.nameAr && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.products[index].nameAr.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    placeholder={t(
                      "addFactory.productsManagement.fields.nameEn.placeholder",
                    )}
                    {...register(`products.${index}.nameEn`)}
                    className={
                      errors?.products?.[index]?.nameEn ? "border-red-500" : ""
                    }
                  />
                  {errors?.products?.[index]?.nameEn && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.products[index].nameEn.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    type="number"
                    min="0"
                    placeholder={t(
                      "addFactory.productsManagement.fields.price.placeholder",
                    )}
                    {...register(`products.${index}.price`)}
                    className={
                      errors?.products?.[index]?.price ? "border-red-500" : ""
                    }
                  />
                  {errors?.products?.[index]?.price && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.products[index].price.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="w-7 h-7 rounded-full bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 hover:border-red-400 transition-colors flex items-center justify-center"
                  >
                    <span className="text-sm font-bold leading-none">×</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
