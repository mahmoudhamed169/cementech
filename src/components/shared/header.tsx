import { Bell, LogOut } from "lucide-react";
import SearchInput from "./search-input";
import LanguageSwitcher from "./language-switcher";
import LogoutButton from "./logout-button";

export default function Header() {
  return (
    <header className=" h-[74.5px] flex justify-between items-center px-6 border-b-[0.8px] border-[#E5E7EB] bg-white">
      <div className="w-lg">
        <SearchInput placeholder="ابحث عن طلب او عميل او سائق..." />
      </div>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />

        <Bell />
        <LogoutButton />
      </div>
    </header>
  );
}
