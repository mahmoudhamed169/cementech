import { RecentOrdersTable } from "../../_components/recent-orders-table";
import SearchInput from "@/src/components/shared/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrdersList() {
  return (
    <section className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h3 className="font-bold text-lg text-[#101828]">الطلبات</h3>

        <div className="flex flex-wrap items-center gap-4">
          <div className="w-65">
            <SearchInput placeholder="ابحث عن اسم او رقم الطلب ..." />
          </div>

          {/* Time Filter */}
          <FilterBox label="فلتر حسب الوقت">
            <Select>
              <SelectTrigger
                className="
      w-[100px] h-9
      text-sm text-[#101828]
      bg-[#F9FAFB]
      border border-[#E5E7EB]
      rounded-2xl min-h-10.5
      px-3
      hover:bg-white
      focus:ring-2 focus:ring-[#155DFC]/20
      transition-all duration-150
      text-center
    "
              >
                <SelectValue placeholder="اليوم" />
              </SelectTrigger>

              <SelectContent
                align="start"
                className="
      w-[100px]
      rounded-lg
      border border-[#E5E7EB]
      shadow-md
      bg-white
      animate-slide-down-fade
    "
              >
                <SelectItem
                  value="today"
                  className="
        text-sm px-2 py-1 rounded-md
        hover:bg-[#F2F4F7]
        data-[state=checked]:bg-[#155DFC]/10
        transition-colors duration-150
      "
                >
                  اليوم
                </SelectItem>

                <SelectItem
                  value="week"
                  className="
        text-sm px-2 py-1 rounded-md
        hover:bg-[#F2F4F7]
        data-[state=checked]:bg-[#155DFC]/10
        transition-colors duration-150
      "
                >
                  هذا الأسبوع
                </SelectItem>

                <SelectItem
                  value="month"
                  className="
        text-sm px-2 py-1 rounded-md
        hover:bg-[#F2F4F7]
        data-[state=checked]:bg-[#155DFC]/10
        transition-colors duration-150
      "
                >
                  هذا الشهر
                </SelectItem>
              </SelectContent>
            </Select>
          </FilterBox>

          {/* Status Filter */}
          <FilterBox label="فلتر حسب الحالة">
            <Select>
              <SelectTrigger
                className="
      w-[100px] h-10
      text-sm text-[#101828]
      bg-[#F9FAFB]
      border border-[#E5E7EB]
      rounded-2xl min-h-10.5
      px-3
      hover:bg-white
      focus:ring-2 focus:ring-[#155DFC]/30
      transition-all duration-150
    "
              >
                <SelectValue placeholder="الكل" />
              </SelectTrigger>

              <SelectContent
                align="end"
                className="
      w-[120px] rounded-lg border border-[#E5E7EB] shadow-lg bg-white
      animate-slide-down-fade
    "
              >
                <SelectItem
                  className="
        text-sm px-2 py-1 rounded-md
        hover:bg-[#F2F4F7] 
        data-[state=checked]:bg-[#155DFC]/10
        transition-colors duration-150
      "
                  value="all"
                >
                  الكل
                </SelectItem>

                <SelectItem
                  className="
        text-sm px-2 py-1 rounded-md
        hover:bg-[#F2F4F7] 
        data-[state=checked]:bg-[#155DFC]/10
        transition-colors duration-150
      "
                  value="completed"
                >
                  مكتملة
                </SelectItem>

                <SelectItem
                  className="
        text-sm px-2 py-1 rounded-md
        hover:bg-[#F2F4F7] 
        data-[state=checked]:bg-[#155DFC]/10
        transition-colors duration-150
      "
                  value="pending"
                >
                  معلقة
                </SelectItem>

                <SelectItem
                  className="
        text-sm px-2 py-1 rounded-md
        hover:bg-[#F2F4F7] 
        data-[state=checked]:bg-[#155DFC]/10
        transition-colors duration-150
      "
                  value="ongoing"
                >
                  جارية
                </SelectItem>

                <SelectItem
                  className="
        text-sm px-2 py-1 rounded-md
        hover:bg-[#F2F4F7] 
        data-[state=checked]:bg-[#155DFC]/10
        transition-colors duration-150
      "
                  value="canceled"
                >
                  ملغاة
                </SelectItem>
              </SelectContent>
            </Select>
          </FilterBox>
        </div>
      </div>

      <RecentOrdersTable />

      <div>
        <h3 className="text-end"> عرض (1-8) من أصل 150 طلب</h3>
      </div>
    </section>
  );
}

/* UI helper فقط */
function FilterBox({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#4A5565] whitespace-nowrap">{label}</span>
      {children}
    </div>
  );
}
