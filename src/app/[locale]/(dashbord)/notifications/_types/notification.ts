export type NotificationType =
  | "auto_assign_failed"
  | "driver_rejected"
  | "driver_join_request"
  | "payment_received"
  | "order_rejected";

export type NotificationSeverity = "error" | "warning" | "info" | "success";

export interface Notification {
  id: string;
  type: NotificationType;
  severity: NotificationSeverity;
  title: string;
  description: string;
  timestamp: string; // ISO string
  read: boolean;
  actions?: NotificationAction[];
  meta?: Record<string, string | number>;
}

export interface NotificationAction {
  label: string;
  href?: string;
  onClick?: string; // action key for dynamic handling
  variant?: "default" | "outline" | "ghost";
}
