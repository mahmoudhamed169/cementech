type DriverStatus = "available" | "unavailable" | "pending" | "banned";
type LoadingStatus = "loaded" | "unloaded" | "pending";
type DocumentStatus = "approved" | "pending" | "rejected";

export type Driver = {
  id: number;
  name: string;
  phone: string;
  status: DriverStatus;
  loadingStatus: LoadingStatus;
  documentStatus: DocumentStatus;
  ordersCount: number;
};

export const dummyDrivers: Driver[] = [
  {
    id: 1001,
    name: "أحمد محمد",
    phone: "0551234567",
    status: "available",
    loadingStatus: "loaded",
    documentStatus: "approved",
    ordersCount: 24,
  },
  {
    id: 1002,
    name: "سعود عبدالله",
    phone: "0559876543",
    status: "pending",
    loadingStatus: "pending",
    documentStatus: "pending",
    ordersCount: 12,
  },
  {
    id: 1003,
    name: "خالد علي",
    phone: "0554567890",
    status: "banned",
    loadingStatus: "unloaded",
    documentStatus: "rejected",
    ordersCount: 8,
  },
  {
    id: 1004,
    name: "ليلى أحمد",
    phone: "0551122334",
    status: "unavailable",
    loadingStatus: "unloaded",
    documentStatus: "approved",
    ordersCount: 0,
  },
];
