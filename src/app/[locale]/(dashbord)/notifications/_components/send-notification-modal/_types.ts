export type RecipientType =
  | "allDrivers"
  | "allUsers"
  | "specificDriver"
  | "specificUser";

export interface SendNotificationForm {
  recipient: RecipientType;
  search: string;
  title: string;
  body: string;
}

export interface SendNotificationFormErrors {
  search?: string;
  title?: string;
  body?: string;
}
