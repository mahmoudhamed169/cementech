export type Invoice = {
  id: number;
  invoiceId: string;
  orderId: string;
  userName: string;
  userPhoneNumber: string;
  date: string; // ISO Date
  totalPaid: number;
};

export const invoicesData: Invoice[] = [
  {
    id: 1,
    invoiceId: "INV-1001",
    orderId: "ORD-4501",
    userName: "Ahmed Ali",
    userPhoneNumber: "+966512345678",
    date: "2026-01-05",
    totalPaid: 250,
  },
  {
    id: 2,
    invoiceId: "INV-1002",
    orderId: "ORD-4502",
    userName: "Sara Mohamed",
    userPhoneNumber: "+966534567891",
    date: "2026-01-07",
    totalPaid: 420,
  },
  {
    id: 3,
    invoiceId: "INV-1003",
    orderId: "ORD-4503",
    userName: "Khaled Hassan",
    userPhoneNumber: "+966556789123",
    date: "2026-01-10",
    totalPaid: 180,
  },
  {
    id: 4,
    invoiceId: "INV-1004",
    orderId: "ORD-4504",
    userName: "Nour Adel",
    userPhoneNumber: "+966578912345",
    date: "2026-01-12",
    totalPaid: 610,
  },
  {
    id: 5,
    invoiceId: "INV-1005",
    orderId: "ORD-4505",
    userName: "Mohamed Samir",
    userPhoneNumber: "+966501234567",
    date: "2026-01-15",
    totalPaid: 95,
  },
  {
    id: 6,
    invoiceId: "INV-1006",
    orderId: "ORD-4506",
    userName: "Laila Fathy",
    userPhoneNumber: "+966509876543",
    date: "2026-01-18",
    totalPaid: 320,
  },
  {
    id: 7,
    invoiceId: "INV-1007",
    orderId: "ORD-4507",
    userName: "Omar Nasser",
    userPhoneNumber: "+966567890123",
    date: "2026-01-20",
    totalPaid: 540,
  },
  {
    id: 8,
    invoiceId: "INV-1008",
    orderId: "ORD-4508",
    userName: "Huda Mahmoud",
    userPhoneNumber: "+966598765432",
    date: "2026-01-22",
    totalPaid: 275,
  },
];
