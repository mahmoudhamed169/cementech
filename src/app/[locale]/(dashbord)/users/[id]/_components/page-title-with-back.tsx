import { Link } from "@/src/i18n/navigation";
import { ChevronLeft } from "lucide-react";

interface PageTitleWithBackProps {
  title: string;
  backHref: string;
}

export default function PageTitleWithBack({
  title,
  backHref,
}: PageTitleWithBackProps) {
  return (
    <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-4">
      <h1 className="text-xl font-bold text-[#101828]">{title}</h1>

      <Link
        href={backHref}
        className="text-lg font-semibold mt-2 flex items-center text-[#344054] gap-1"
      >
        رجوع
        <ChevronLeft size={20} />
      </Link>
    </div>
  );
}
