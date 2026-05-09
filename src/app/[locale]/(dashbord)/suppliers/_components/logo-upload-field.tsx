"use client";

import { useRef, useState } from "react";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { ImagePlus, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface LogoUploadFieldProps {
  value?: File | string | null;
  onChange: (value: File | null) => void;
  hasError?: boolean;
}

export function LogoUploadField({ value, onChange, hasError }: LogoUploadFieldProps) {
  const t = useTranslations("suppliersPage");
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(
    typeof value === "string" ? value : null,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(file);
    setPreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setPreview(null);
  };

  const hasLogo = preview !== null;

  return (
    <FormItem className="flex flex-col items-center gap-3">
      <FormControl>
        <div className="flex flex-col items-center gap-3">
          {/* Clickable avatar circle */}
          <div
            onClick={() => inputRef.current?.click()}
            className={cn(
              "relative w-24 h-24 rounded-full cursor-pointer overflow-hidden",
              "border-2 border-dashed transition-all duration-200",
              "flex items-center justify-center bg-gray-50",
              hasError
                ? "border-red-400 bg-red-50"
                : "border-[#D1D5DC] hover:border-[#00A63E] hover:bg-green-50",
              hasLogo && "border-solid border-[#D1D5DC]",
            )}
          >
            {hasLogo ? (
              <>
                <img
                  src={preview!}
                  alt="logo"
                  className="w-full h-full object-contain"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <ImagePlus className="w-7 h-7 text-gray-300" />
              </div>
            )}
          </div>

          {/* Label + actions row */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-sm font-medium text-[#364153] hover:text-[#00A63E] transition-colors flex items-center gap-1.5"
            >
              <Pencil className="w-3.5 h-3.5" />
              {hasLogo
                ? t("addFactory.fields.logo.change")
                : t("addFactory.fields.logo.upload")}
            </button>

            {hasLogo && (
              <>
                <span className="w-px h-4 bg-gray-300" />
                <button
                  type="button"
                  onClick={handleRemove}
                  className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {t("addFactory.fields.logo.remove")}
                </button>
              </>
            )}
          </div>
        </div>
      </FormControl>

      <FormMessage className="text-red-500 text-xs" />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </FormItem>
  );
}