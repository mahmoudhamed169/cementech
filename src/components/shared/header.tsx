import { Bell } from "lucide-react";
import SearchInput from "./search-input";

export default function Header() {
  return (
    <header className=" h-[74.5px] flex justify-between items-center px-6 border-b-[0.8px] border-[#E5E7EB] bg-white">
      <SearchInput />

      <div className="flex items-center gap-4">
 
        <Bell />
        <h2 className="text-sm font-medium text-zinc-700 font-ibm">تسجيل الخروج</h2>
      </div>
    </header>
  );
}
