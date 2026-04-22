export interface SendNotificationProps {
  recipientId: string;
  recipientName: string;
  recipientType: "driver" | "customer" | "admin";
}

export interface SendNotificationFormValues {
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
}
