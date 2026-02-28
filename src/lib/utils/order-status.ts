export type ApiOrderStatus =
  | "under_review"
  | "canceled"
  | "deliverd"
  | "delivery"
  | "in_preparation";

export type DeliveryStatus = ApiOrderStatus;

export function mapOrderStatus(status: ApiOrderStatus): DeliveryStatus {
  switch (status) {
    case "under_review":
      return "under_review";
    case "in_preparation":
      return "in_preparation";
    case "delivery":
      return "delivery";
    case "deliverd":
      return "deliverd";
    case "canceled":
      return "canceled";
    default:
      return "under_review";
  }
}
