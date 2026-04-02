export function RevenueReportCard() {
  const stats = [
    { label: "المتوسط اليومي", value: "$1,508" },
    { label: "الإجمالي الأسبوعي", value: "$10,556" },
    { label: "الإجمالي الشهري", value: "$45,231" },
  ];

  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 space-y-3">
      <h3 className="text-base font-bold text-gray-800">تقرير الإيرادات</h3>
      <div className="space-y-2">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{stat.label}</span>
            <span className="font-semibold text-gray-800">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
