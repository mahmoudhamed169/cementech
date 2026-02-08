"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeliveryStatusBadge } from "./deliver-status-badge";
import { AlertCircle, EllipsisVertical, UserRoundPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import TimeAgo from "@/src/components/providers/shared/_components/time-ago";

dayjs.extend(relativeTime);

const orders = [
  {
    id: "1282",
    customer: "أحمد محمد",
    driverStatus: "assigned",
    orderStatus: "delivering",
    shipments: 2,
    quantity: 5,
    price: 1000,
    time: dayjs().subtract(20, "minute").toISOString(),
  },
  {
    id: "1283",
    customer: "سارة علي",
    driverStatus: "unassigned",
    orderStatus: "pending",
    shipments: 1,
    quantity: 3,
    price: 7500,
    time: dayjs().subtract(1, "hour").toISOString(),
  },
  {
    id: "1284",
    customer: "محمد حسن",
    driverStatus: "assigned",
    orderStatus: "completed",
    shipments: 3,
    quantity: 1,
    price: 1200,
    time: dayjs().subtract(2, "hour").toISOString(),
  },
  {
    id: "1285",
    customer: "خالد عبد الله",
    driverStatus: "assigned",
    orderStatus: "delivering",
    shipments: 2,
    quantity: 6,
    price: 1600,
    time: dayjs().subtract(5, "minute").toISOString(),
  },
  {
    id: "1286",
    customer: "نورة صالح",
    driverStatus: "unassigned",
    orderStatus: "pending",
    shipments: 1,
    quantity: 2,
    price: 5000,
    time: dayjs().subtract(45, "minute").toISOString(),
  },
  {
    id: "1287",
    customer: "عبد الرحمن علي",
    driverStatus: "assigned",
    orderStatus: "delivering",
    shipments: 4,
    quantity: 10,
    price: 2500,
    time: dayjs().subtract(3, "hour").toISOString(),
  },
  {
    id: "1288",
    customer: "ريم أحمد",
    driverStatus: "assigned",
    orderStatus: "completed",
    shipments: 1,
    quantity: 4,
    price: 1000,
    time: dayjs().subtract(1, "day").toISOString(),
  },
  {
    id: "1289",
    customer: "فهد العتيبي",
    driverStatus: "unassigned",
    orderStatus: "pending",
    shipments: 2,
    quantity: 7,
    price: 1900,
    time: dayjs().subtract(10, "minute").toISOString(),
  },
];

function mapOrderStatus(status: string) {
  switch (status) {
    case "delivering":
      return "delivering";
    case "completed":
      return "completed";
    default:
      return "pending";
  }
}

export function RecentOrdersTable() {
  const t = useTranslations("recentOrders");
  const headers = [
    "index",
    "orderId",
    "customer",
    "driverStatus",
    "deliveryStatus",
    "shipments",
    "quantity",
    "price",
    "time",
    "actions",
  ];

  return (
    <Table>
      {/* Header */}
      <TableHeader>
        <TableRow>
          {headers.map((key) => (
            <TableHead
              key={key}
              className="text-center text-[#364153] font-bold h-11"
            >
              {t(`header.${key}`)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      {/* Body */}
      <TableBody>
        {orders.slice(0, 8).map((order, index) => (
          <TableRow
            key={order.id}
            className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-muted/40 h-14 text-center"
          >
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell className="text-center font-medium">
              {order.id}
            </TableCell>
            <TableCell className="text-center">
              {order.customer} <p className="text-[#6A7282]">+966558547348</p>
            </TableCell>
            <TableCell className="text-center">
              {order.driverStatus === "unassigned" ? (
                <span className="font-medium text-[#9F0712] ">
                  ( {t(`driverStatus.${order.driverStatus}`)} )
                </span>
              ) : (
                <span className="text-[#364153] font-medium">
                  {t(`driverStatus.${order.driverStatus}`)}
                </span>
              )}
            </TableCell>

            <TableCell className="text-center">
              <DeliveryStatusBadge status={mapOrderStatus(order.orderStatus)} />
            </TableCell>
            <TableCell className="text-center">
              {order.shipments}{" "}
              {order.shipments === 1
                ? t("shipmentLabel.one")
                : t("shipmentLabel.many")}
            </TableCell>

            <TableCell className="text-center">
              {order.quantity}{" "}
              {order.quantity === 1
                ? t("weightUnit.one")
                : t("weightUnit.many")}
            </TableCell>

            <TableCell className="text-center flex items-center justify-center gap-1 mt-3.5">
              <span className="text-sm leading-none">{order.price}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="align-middle"
              >
                <path
                  d="M12 10.957C11.9207 11.5981 11.8859 11.8761 11.5898 12.501L7.04199 13.4404C7.14653 12.7647 7.28619 12.2433 7.5127 11.9307L12 10.957ZM5.66504 6.53418L7.02441 6.23926V1.94531C7.53075 1.37693 7.84196 1.12144 8.45312 0.798828V5.92871L12 5.15918C11.9207 5.80031 11.8858 6.07829 11.5898 6.70312L8.45312 7.36621V8.80762L12 8.05762C11.9207 8.69893 11.886 8.97744 11.5898 9.60254L8.45312 10.249V10.2637L7.02441 10.5586V7.66797L5.66504 7.95508V9.77734L5.64062 9.78223C5.32811 10.3301 4.88791 10.9884 4.46289 11.5137L0 12.3633C0.04003 11.7893 0.123247 11.4659 0.382812 10.8877L4.23633 10.0518V8.25781L0.665039 9.01367C0.705056 8.43943 0.788222 8.11547 1.04785 7.53711L4.23633 6.84375V1.14648C4.74258 0.578196 5.05406 0.322539 5.66504 0V6.53418Z"
                  fill="#404040"
                />
              </svg>
            </TableCell>

            {/* الوقت النسبي */}
            <TableCell className="text-center">
              <TimeAgo time={order.time} />
            </TableCell>

            <TableCell className="text-center">
              <div className="flex items-center justify-center gap-2.5">
                {/* مساحة ثابتة للأيقونة التحذيرية */}
                <div className="w-5 h-5 flex items-center justify-center">
                  {order.driverStatus === "unassigned" && (
                    <div title="لم يتم تعيين سائق">
                      <UserRoundPlus className="stroke-[#FB2C36] "  size={24}/>
                    </div>
                  )}
                </div>

                {/* أيقونة الإجراءات (ثابتة دائمًا) */}
                <div className="w-6 h-6 bg-[#5E5C5C] p-0.5 flex justify-center items-center rounded-lg cursor-pointer">
                  <EllipsisVertical className="stroke-white w-4 h-4" />
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
