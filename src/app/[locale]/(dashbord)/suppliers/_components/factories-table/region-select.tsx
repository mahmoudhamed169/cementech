"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "next-intl";
import { SAUDI_REGIONS } from "@/src/lib/constants/saudi-regions";
import { cn } from "@/lib/utils";

interface RegionSelectProps {
  value?: string;
  onChange: (nameAr: string, nameEn: string) => void;
  placeholder?: string;
  hasError?: boolean;
}

export function RegionSelect({
  value,
  onChange,
  placeholder,
  hasError,
}: RegionSelectProps) {
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  const handleChange = (id: string) => {
    const region = SAUDI_REGIONS.find((r) => r.id === id);
    if (region) {
      onChange(region.nameAr, region.nameEn);
    }
  };

  const selectedRegion = SAUDI_REGIONS.find(
    (r) => r.nameAr === value || r.nameEn === value,
  );

  return (
    <Select value={selectedRegion?.id ?? ""} onValueChange={handleChange}>
      <SelectTrigger
        dir={dir}
        className={cn(
          "h-11 py-2 px-4 rounded-xl w-full bg-white transition-all duration-200 text-sm",
          "border focus-visible:ring-0 focus:ring-0",
          hasError
            ? "border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
            : "border-[#D1D5DC] focus-visible:border-[#101828] focus-visible:shadow-[0_0_0_3px_rgba(16,24,40,0.15)]",
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        dir={dir}
        className="bg-white border border-[#E5E7EB] rounded-xl  shadow-md max-h-72"
      >
        {SAUDI_REGIONS.map((region) => (
          <SelectItem
            key={region.id}
            value={region.id}
            className="h-10 text-sm cursor-pointer hover:bg-gray-50 rounded-lg"
          >
            {locale === "ar" ? region.nameAr : region.nameEn}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
