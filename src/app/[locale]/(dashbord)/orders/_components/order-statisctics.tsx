const statistics = [
  { name: "مجموع الطلبات", value: 423 },
  { name: "الطلبات المكتملة", value: 320 },
  { name: "الطلبات المعلقة", value: 48 },
  { name: "الطلبات الجارية", value: 35 },
  { name: "الطلبات الملغاة", value: 20 },
];

export default function OrdersStatistics() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {statistics.map((item) => (
          <OrderStatisticsItem
            key={item.name}
            title={item.name}
            value={item.value}
          />
        ))}
      </div>
    </section>
  );
}

function OrderStatisticsItem({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="h-33 bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col justify-between">
      <h4 className="text-sm text-[#4A5565]">{title}</h4>
      <h5 className="font-bold text-2xl text-[#101828]">{value}</h5>
    </div>
  );
}
