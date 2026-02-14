import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

export default function SearchInput({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative flex items-center gap-3 ">
      <Search className=" absolute start-4 text-zinc-400" size={18} />
      {/* search input field */}
      <Input
        placeholder={placeholder}
        className="w-full  h-12 py-1 ps-12 rounded-2xl text-zinc-400 text-sm border-zinc-300 focus:outline-none focus:ring-2 focus:ring-soft-pink-300"
      />
    </div>
  );
}
