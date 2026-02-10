export type Order = {
  orderId: number;
  date: string; // أو Date لو تحب
  status: "pending" | "completed" | "cancelled";
  quantity: number; // كمية الطلب
  price: number; // سعر الطلب الإجمالي
};

export type User = {
  id: string;
  userName: string;
  organizationName: string | null;
  phoneNumber: string;
  status: "active" | "inactive" | "blocked";
  orders: Order[];
};
export const dummyUsers: User[] = [
  {
    id: "USR001",
    userName: "أحمد علي",
    organizationName: "مؤسسة النور",
    phoneNumber: "0501234567",
    status: "active",
    orders: [
      {
        orderId: 101,
        date: "2026-02-01",
        status: "completed",
        quantity: 5,
        price: 500,
      },
      {
        orderId: 102,
        date: "2026-02-03",
        status: "pending",
        quantity: 3,
        price: 360,
      },
      {
        orderId: 103,
        date: "2026-02-05",
        status: "completed",
        quantity: 2,
        price: 220,
      },
      {
        orderId: 104,
        date: "2026-02-07",
        status: "cancelled",
        quantity: 1,
        price: 120,
      },
      {
        orderId: 105,
        date: "2026-02-09",
        status: "completed",
        quantity: 4,
        price: 480,
      },
    ],
  },
  {
    id: "USR002",
    userName: "سارة محمد",
    organizationName: null,
    phoneNumber: "0502345678",
    status: "inactive",
    orders: [
      {
        orderId: 201,
        date: "2026-01-28",
        status: "completed",
        quantity: 2,
        price: 200,
      },
      {
        orderId: 202,
        date: "2026-01-30",
        status: "pending",
        quantity: 6,
        price: 660,
      },
      {
        orderId: 203,
        date: "2026-02-02",
        status: "completed",
        quantity: 1,
        price: 120,
      },
      {
        orderId: 204,
        date: "2026-02-04",
        status: "completed",
        quantity: 3,
        price: 330,
      },
      {
        orderId: 205,
        date: "2026-02-08",
        status: "cancelled",
        quantity: 5,
        price: 550,
      },
    ],
  },
  {
    id: "USR003",
    userName: "خالد حسن",
    organizationName: "مؤسسة الأمل",
    phoneNumber: "0503456789",
    status: "blocked",
    orders: [
      {
        orderId: 301,
        date: "2026-01-25",
        status: "pending",
        quantity: 4,
        price: 400,
      },
      {
        orderId: 302,
        date: "2026-01-27",
        status: "completed",
        quantity: 3,
        price: 330,
      },
      {
        orderId: 303,
        date: "2026-01-29",
        status: "completed",
        quantity: 2,
        price: 210,
      },
      {
        orderId: 304,
        date: "2026-02-01",
        status: "completed",
        quantity: 5,
        price: 520,
      },
      {
        orderId: 305,
        date: "2026-02-05",
        status: "cancelled",
        quantity: 1,
        price: 120,
      },
    ],
  },
  {
    id: "USR004",
    userName: "مريم يوسف",
    organizationName: null,
    phoneNumber: "0504567890",
    status: "active",
    orders: [
      {
        orderId: 401,
        date: "2026-02-02",
        status: "completed",
        quantity: 3,
        price: 330,
      },
      {
        orderId: 402,
        date: "2026-02-03",
        status: "completed",
        quantity: 2,
        price: 220,
      },
      {
        orderId: 403,
        date: "2026-02-05",
        status: "pending",
        quantity: 1,
        price: 120,
      },
      {
        orderId: 404,
        date: "2026-02-07",
        status: "completed",
        quantity: 4,
        price: 440,
      },
      {
        orderId: 405,
        date: "2026-02-09",
        status: "completed",
        quantity: 5,
        price: 550,
      },
    ],
  },
  {
    id: "USR005",
    userName: "ليلى محمود",
    organizationName: "مؤسسة الفجر",
    phoneNumber: "0505678901",
    status: "inactive",
    orders: [
      {
        orderId: 501,
        date: "2026-01-20",
        status: "completed",
        quantity: 2,
        price: 200,
      },
      {
        orderId: 502,
        date: "2026-01-22",
        status: "pending",
        quantity: 3,
        price: 330,
      },
      {
        orderId: 503,
        date: "2026-01-25",
        status: "completed",
        quantity: 5,
        price: 550,
      },
      {
        orderId: 504,
        date: "2026-01-28",
        status: "completed",
        quantity: 1,
        price: 120,
      },
      {
        orderId: 505,
        date: "2026-02-01",
        status: "cancelled",
        quantity: 4,
        price: 440,
      },
    ],
  },
  {
    id: "USR006",
    userName: "عمرو سامي",
    organizationName: "مؤسسة الغد",
    phoneNumber: "0506789012",
    status: "active",
    orders: [
      {
        orderId: 601,
        date: "2026-01-18",
        status: "completed",
        quantity: 3,
        price: 330,
      },
      {
        orderId: 602,
        date: "2026-01-20",
        status: "pending",
        quantity: 2,
        price: 220,
      },
      {
        orderId: 603,
        date: "2026-01-23",
        status: "completed",
        quantity: 4,
        price: 440,
      },
      {
        orderId: 604,
        date: "2026-01-25",
        status: "completed",
        quantity: 5,
        price: 550,
      },
      {
        orderId: 605,
        date: "2026-01-28",
        status: "cancelled",
        quantity: 1,
        price: 120,
      },
    ],
  },
  {
    id: "USR007",
    userName: "ندى أحمد",
    organizationName: null,
    phoneNumber: "0507890123",
    status: "blocked",
    orders: [
      {
        orderId: 701,
        date: "2026-01-15",
        status: "completed",
        quantity: 5,
        price: 500,
      },
      {
        orderId: 702,
        date: "2026-01-17",
        status: "pending",
        quantity: 2,
        price: 220,
      },
      {
        orderId: 703,
        date: "2026-01-20",
        status: "completed",
        quantity: 3,
        price: 330,
      },
      {
        orderId: 704,
        date: "2026-01-22",
        status: "completed",
        quantity: 4,
        price: 440,
      },
      {
        orderId: 705,
        date: "2026-01-25",
        status: "cancelled",
        quantity: 1,
        price: 120,
      },
    ],
  },
  {
    id: "USR008",
    userName: "سامية خالد",
    organizationName: "مؤسسة الرؤية",
    phoneNumber: "0508901234",
    status: "active",
    orders: [
      {
        orderId: 801,
        date: "2026-01-10",
        status: "completed",
        quantity: 3,
        price: 330,
      },
      {
        orderId: 802,
        date: "2026-01-12",
        status: "pending",
        quantity: 1,
        price: 120,
      },
      {
        orderId: 803,
        date: "2026-01-15",
        status: "completed",
        quantity: 4,
        price: 440,
      },
      {
        orderId: 804,
        date: "2026-01-18",
        status: "completed",
        quantity: 5,
        price: 550,
      },
      {
        orderId: 805,
        date: "2026-01-20",
        status: "cancelled",
        quantity: 2,
        price: 220,
      },
    ],
  },
];
