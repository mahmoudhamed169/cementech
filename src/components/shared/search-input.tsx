"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"; // ✅ عشان منبعتش request كل حرف

export default function SearchInput({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.set("page", "1"); // ✅ يرجع للصفحة الأولى عند البحث
    router.push(`?${params.toString()}`);
  }, 500);

  return (
    <div className="relative flex items-center gap-3">
      <Search className="absolute start-4 text-zinc-400" size={18} />
      <Input
        placeholder={placeholder}
        defaultValue={searchParams.get("search") ?? ""} // ✅ يحتفظ بقيمة البحث لو refresh
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full h-12 py-1 ps-12 rounded-2xl text-zinc-400 text-sm border-zinc-300 focus:outline-none focus:ring-2 focus:ring-soft-pink-300"
      />
    </div>
  );
}
