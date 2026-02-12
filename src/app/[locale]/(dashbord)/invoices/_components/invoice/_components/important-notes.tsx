import { Square } from "lucide-react";

const Notes = [
  "يجب مراجعة البضاعة فور الاستلام وقبل مغادرة السائق.",
  "يجب تخزين الإسمنت في ظروف جافة؛ ولا يتحمل البائع مسؤولية أي تلف بعد التسليم.",
  "تطبق قوانين هيئة الزكاة والضريبة والجمارك بالمملكة العربية السعودية.",
  "في حال التأخر عن السداد لمدة تزيد عن 7 أيام، تفرض رسوم إدارية إضافية.",
];

export default function ImportantNotes() {
  return (
    <div className="space-y-5">
      <h2 className="font-semibold text-[#0A0A0A] text-xl">ملاحظات هامة</h2>
      <div className="space-y-2">
        {Notes.map((item, index) => (
          <NoteItem key={index} note={item} />
        ))}
      </div>
    </div>
  );
}

function NoteItem({ note }: { note: string }) {
  return (
    <div className="flex  items-center  gap-2 text-[#1A1A1A] font-bold ">
      <Square size={16} />
      <p>{note}</p>{" "}
    </div>
  );
}
