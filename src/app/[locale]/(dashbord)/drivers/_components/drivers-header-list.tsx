import SearchInput from "@/src/components/shared/search-input";
import DriversFilter from "./drivers-filter";

export default function DriversHeaderList() {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <h3 className="font-bold text-lg text-[#101828]">السائقين</h3>

      <div className="flex flex-wrap items-center gap-4">
        <DriversFilter />
        <div className="w-65">
          <SearchInput placeholder="ابحث عن اسم او رقم جوال ..." />
        </div>
      </div>
    </div>
  );
}
