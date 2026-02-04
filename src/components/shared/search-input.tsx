import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

export default function SearchInput() {
  return (
    <div className="relative flex items-center gap-3 w-lg">
      <Search className=" absolute start-4 text-zinc-400" size={18} />
      {/* search input field */}
      <Input
        placeholder="ابحث عن طلب او عميل او سائق..."
        className="w-full  h-12 py-1 ps-12 rounded-lg text-zinc-400 text-sm border-zinc-300 focus:outline-none focus:ring-2 focus:ring-soft-pink-300"
      />
    </div>
  );
}
