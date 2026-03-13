import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { Eye, Trash2 } from "lucide-react";

type ManagementType =
  | "حسابات"
  | "عمليات"
  | "عامة"
  | "مالية"
  | "إدارة"
  | "إعدادات";

type Supervisor = {
  id: number;
  name: string;
  email: string;
  phone: string;
  management: ManagementType[];
  status: "active" | "inactive";
  lastLogin: string;
};

const supervisors: Supervisor[] = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "0501234567",
    management: ["حسابات", "عمليات"],
    status: "active",
    lastLogin: "2025-01-10T08:30:00",
  },
  {
    id: 2,
    name: "خالد العمري",
    email: "khaled@example.com",
    phone: "0557654321",
    management: ["مالية"],
    status: "active",
    lastLogin: "2025-01-09T14:20:00",
  },
  {
    id: 3,
    name: "سارة الأحمدي",
    email: "sara@example.com",
    phone: "0531112233",
    management: ["عامة", "إعدادات"],
    status: "inactive",
    lastLogin: "2025-01-05T10:00:00",
  },
  {
    id: 4,
    name: "محمد العتيبي",
    email: "mohammed@example.com",
    phone: "0509876543",
    management: ["إدارة"],
    status: "active",
    lastLogin: "2025-01-10T11:45:00",
  },
  {
    id: 5,
    name: "نورة السالم",
    email: "noura@example.com",
    phone: "0544433221",
    management: ["حسابات", "عمليات"],
    status: "inactive",
    lastLogin: "2025-01-01T09:15:00",
  },
];

function formatDateOnly(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function formatTimeOnly(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatAgo(dateStr: string): string {
  return formatDistanceToNow(new Date(dateStr), {
    addSuffix: true,
    locale: ar,
  });
}

export default function SupervisorsTableBody() {
  return (
    <TableBody>
      {supervisors.map((supervisor, index) => (
        <TableRow
          key={supervisor.id}
          className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-muted/40 h-14 text-center"
        >
          {/* index */}
          <TableCell className="text-center">{index + 1}</TableCell>

          {/* name */}
          <TableCell className="text-center">
            <p className="font-medium text-[#101828]">{supervisor.name}</p>
          </TableCell>

          {/* contact - phone + email */}
          <TableCell className="text-center">
            <p className="text-[#101828]">{supervisor.phone}</p>
            <p className="text-sm text-[#6A7282]">{supervisor.email}</p>
          </TableCell>

          {/* status */}
          <TableCell className="text-center">
            <Badge
              className={
                supervisor.status === "active"
                  ? "bg-[#DCFCE7] text-[#16A34A] hover:bg-[#DCFCE7]"
                  : "bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FEE2E2]"
              }
            >
              {supervisor.status === "active" ? "نشط" : "غير نشط"}
            </Badge>
          </TableCell>

          {/* management */}
          <TableCell className="text-center">
            <div className="flex flex-col items-center gap-1.5">
              {supervisor.management.map((item) => (
                <Badge
                  key={item}
                  className="bg-[#DBEAFE] text-[#193CB8] hover:bg-[#DBEAFE] rounded-md px-3 py-1 text-xs font-medium"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </TableCell>

          {/* lastLogin */}
          <TableCell className="text-center">
            <p className="text-[#101828] text-sm">
              {formatDateOnly(supervisor.lastLogin)}
            </p>
            <p className="text-[#6A7282] text-xs">
              {formatTimeOnly(supervisor.lastLogin)}
            </p>
            <p className="text-[#6A7282] text-xs mt-0.5">
              {formatAgo(supervisor.lastLogin)}
            </p>
          </TableCell>

          {/* actions */}
          <TableCell className="text-center">
            <div className="flex items-center justify-center gap-2">
              <button className="p-2 rounded-lg hover:bg-[#FEE2E2] text-[#6A7282] hover:text-[#DC2626] transition-colors">
                <Trash2 size={16} />
              </button>
              <button className="p-2 rounded-lg hover:bg-[#DBEAFE] text-[#6A7282] hover:text-[#193CB8] transition-colors">
                <Eye size={16} />
              </button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
