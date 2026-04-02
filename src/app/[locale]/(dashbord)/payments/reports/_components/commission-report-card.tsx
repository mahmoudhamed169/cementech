export function CommissionReportCard() {
  const stats = [
    { label: "المعدل المتوسط", value: "20%", color: "text-gray-800" },
    { label: "اجمالي العمولات", value: "$9,046", color: "text-gray-800" },
    {
      label: "النمو مقارنة بالشهر الماضي",
      value: "+15.3%",
      color: "text-green-600",
    },
  ];

  return (
    <div className="rounded-2xl border border-green-100 bg-green-50 p-5 space-y-3">
      <h3 className="text-base font-bold text-gray-800">تقرير العمولة</h3>
      <div className="space-y-2">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{stat.label}</span>
            <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
