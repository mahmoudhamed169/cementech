export type ApiOrderStatus =
  | "under_review"
  | "canceled"
  | "delivered"
  | "delivery"
  | "in_preparation";

export type DeliveryStatus = ApiOrderStatus;
