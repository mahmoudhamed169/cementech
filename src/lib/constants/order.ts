import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/* =======================
   Types
======================= */

export type DriverStatus = "assigned" | "unassigned";
export type OrderStatus = "pending" | "delivering" | "completed";

export interface Customer {
  name: string;
  phone: string;
}

export interface Driver {
  name: string;
  phone: string;
  trackingUrl: string;
}

type AssignedDriver = {
  driverStatus: "assigned";
  driver: Driver;
};

type UnassignedDriver = {
  driverStatus: "unassigned";
  driver: null;
};

export type Order = {
  id: string;
  customer: Customer;

  orderStatus: OrderStatus;

  shipments: number;
  quantity: number;
  price: number;

  pickupLocation: string;
  deliveryLocation: string;

  time: string; // ISO string
  lastUpdate: string; // ISO string
} & (AssignedDriver | UnassignedDriver);

/* =======================
   Data
======================= */

export const Orders: Order[] = [
  {
    id: "1282",
    customer: {
      name: "أحمد محمد",
      phone: "0551234567",
    },
    driverStatus: "assigned",
    driver: {
      name: "سعيد القحطاني",
      phone: "0509876543",
      trackingUrl: "https://maps.google.com/?q=24.7136,46.6753",
    },
    orderStatus: "delivering",
    shipments: 2,
    quantity: 5,
    price: 1000,
    pickupLocation: "123 شارع الإنشاء، الرياض",
    deliveryLocation: "45 شارع الملك فهد، الرياض",
    time: dayjs().subtract(20, "minute").toISOString(),
    lastUpdate: dayjs().subtract(15, "minute").toISOString(),
  },
  {
    id: "1283",
    customer: {
      name: "سارة علي",
      phone: "0534567890",
    },
    driverStatus: "unassigned",
    driver: null,
    orderStatus: "pending",
    shipments: 1,
    quantity: 3,
    price: 7500,
    pickupLocation: "88 شارع العليا، الرياض",
    deliveryLocation: "12 شارع التحلية، جدة",
    time: dayjs().subtract(1, "hour").toISOString(),
    lastUpdate: dayjs().subtract(45, "minute").toISOString(),
  },
  {
    id: "1284",
    customer: {
      name: "محمد حسن",
      phone: "0561122334",
    },
    driverStatus: "assigned",
    driver: {
      name: "عبدالله الشهري",
      phone: "0556677889",
      trackingUrl: "https://maps.google.com/?q=21.4858,39.1925",
    },
    orderStatus: "completed",
    shipments: 3,
    quantity: 1,
    price: 1200,
    pickupLocation: "9 شارع السلام، مكة",
    deliveryLocation: "77 شارع النور، جدة",
    time: dayjs().subtract(2, "hour").toISOString(),
    lastUpdate: dayjs().subtract(1, "hour").toISOString(),
  },
  {
    id: "1285",
    customer: {
      name: "خالد عبد الله",
      phone: "0549988776",
    },
    driverStatus: "assigned",
    driver: {
      name: "ناصر الدوسري",
      phone: "0591122334",
      trackingUrl: "https://maps.google.com/?q=26.4207,50.0888",
    },
    orderStatus: "delivering",
    shipments: 2,
    quantity: 6,
    price: 1600,
    pickupLocation: "15 شارع الأمير محمد، الدمام",
    deliveryLocation: "200 شارع الخليج، الخبر",
    time: dayjs().subtract(5, "minute").toISOString(),
    lastUpdate: dayjs().subtract(3, "minute").toISOString(),
  },
  {
    id: "1286",
    customer: {
      name: "نورة صالح",
      phone: "0573344556",
    },
    driverStatus: "unassigned",
    driver: null,
    orderStatus: "pending",
    shipments: 1,
    quantity: 2,
    price: 5000,
    pickupLocation: "60 شارع الجامعة، القصيم",
    deliveryLocation: "10 شارع المطار، بريدة",
    time: dayjs().subtract(45, "minute").toISOString(),
    lastUpdate: dayjs().subtract(30, "minute").toISOString(),
  },
  {
    id: "1287",
    customer: {
      name: "عبد الرحمن علي",
      phone: "0587788990",
    },
    driverStatus: "assigned",
    driver: {
      name: "فيصل المطيري",
      phone: "0532211445",
      trackingUrl: "https://maps.google.com/?q=24.7743,46.7386",
    },
    orderStatus: "delivering",
    shipments: 4,
    quantity: 10,
    price: 2500,
    pickupLocation: "33 شارع اليرموك، الرياض",
    deliveryLocation: "90 شارع الصحافة، الرياض",
    time: dayjs().subtract(3, "hour").toISOString(),
    lastUpdate: dayjs().subtract(20, "minute").toISOString(),
  },
  {
    id: "1288",
    customer: {
      name: "ريم أحمد",
      phone: "0504455667",
    },
    driverStatus: "assigned",
    driver: {
      name: "ماجد الحربي",
      phone: "0569988771",
      trackingUrl: "https://maps.google.com/?q=24.4539,39.6103",
    },
    orderStatus: "completed",
    shipments: 1,
    quantity: 4,
    price: 1000,
    pickupLocation: "7 شارع قباء، المدينة",
    deliveryLocation: "55 شارع الهجرة، المدينة",
    time: dayjs().subtract(1, "day").toISOString(),
    lastUpdate: dayjs().subtract(20, "hour").toISOString(),
  },
  {
    id: "1289",
    customer: {
      name: "فهد العتيبي",
      phone: "0526677889",
    },
    driverStatus: "unassigned",
    driver: null,
    orderStatus: "pending",
    shipments: 2,
    quantity: 7,
    price: 1900,
    pickupLocation: "101 شارع الصناعية، الطائف",
    deliveryLocation: "5 شارع الشفا، الطائف",
    time: dayjs().subtract(10, "minute").toISOString(),
    lastUpdate: dayjs().subtract(8, "minute").toISOString(),
  },
];
