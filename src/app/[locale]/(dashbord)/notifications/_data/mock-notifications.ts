import { Notification } from "../_types/notification";

export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "auto_assign_failed",
    severity: "error",
    title: "فشل التخصيص التلقائي لسائق",
    description:
      "لم يتم تخصيص سائق لطلب رقم #1234 تلقائياً. 4 شحنات بانتظار التخصيص اليدوي.",
    timestamp: "2026-01-31T08:45:00Z",
    read: false,
    actions: [
      {
        label: "تخصيص الآن",
        onClick: "assign_now",
        variant: "default",
      },
      {
        label: "تعليم كمقروء",
        onClick: "mark_read",
        variant: "ghost",
      },
    ],
    meta: {
      orderId: "1234",
      pendingCount: 4,
    },
  },
  {
    id: "notif-2",
    type: "driver_rejected",
    severity: "warning",
    title: "تنبيه رفض سائق",
    description:
      "رفض السائق (يوسف عمر - DRV-004) 3 طلبات متتالية في الساعة الأخيرة.",
    timestamp: "2026-01-31T08:30:00Z",
    read: false,
    actions: [
      {
        label: "مراجعة ملف السائق",
        onClick: "view_driver",
        variant: "default",
      },
      {
        label: "تعليم كمقروء",
        onClick: "mark_read",
        variant: "ghost",
      },
    ],
    meta: {
      driverName: "يوسف عمر",
      driverId: "DRV-004",
      rejectedCount: 3,
    },
  },
  {
    id: "notif-3",
    type: "driver_join_request",
    severity: "info",
    title: "طلب انضمام سائق جديد",
    description: "قدّم (حسن أحمد) طلباً للانضمام للمنصة. المستندات قيد التحقق.",
    timestamp: "2026-01-31T07:15:00Z",
    read: false,
    actions: [
      {
        label: "مراجعة طلب الانضمام",
        onClick: "review_join",
        variant: "default",
      },
    ],
    meta: {
      applicantName: "حسن أحمد",
    },
  },
  {
    id: "notif-4",
    type: "payment_received",
    severity: "success",
    title: "تم استلام الدفعة",
    description:
      "تم استلام دفعة للطلب رقم (ORD-1234) عبر بطاقة الائتمان بقيمة 16350 ﷼.",
    timestamp: "2026-01-31T10:35:00Z",
    read: true,
    meta: {
      orderId: "ORD-1234",
      amount: 16350,
      paymentMethod: "credit_card",
    },
  },
  {
    id: "notif-5",
    type: "order_rejected",
    severity: "error",
    title: "رفض متكرر للطلبات",
    description:
      "تم رفض الطلب #1245 من قبل 3 سائقين. يرجى النظر في إمكانية التعيين اليدوي.",
    timestamp: "2026-01-30T18:20:00Z",
    read: false,
    actions: [
      {
        label: "تخصيص الآن",
        onClick: "assign_now",
        variant: "default",
      },
    ],
    meta: {
      orderId: "1245",
      rejectedByCount: 3,
    },
  },
];
