import SearchInput from "@/src/components/shared/search-input";
import UsersFilter from "../users-filters";

export default function UserHeaderList() {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <h3 className="font-bold text-lg text-[#101828]">المستخدمين</h3>

      <div className="flex flex-wrap items-center gap-4">
        <UsersFilter /> {/* ✅ */}
        <div className="w-65">
          <SearchInput placeholder="ابحث عن اسم او رقم جوال ..." />
        </div>
      </div>
    </div>
  );
}
