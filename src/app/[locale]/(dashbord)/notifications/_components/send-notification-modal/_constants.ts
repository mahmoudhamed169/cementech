import { Users, Car } from "lucide-react";
import { RecipientType } from "./_types";

export const RECIPIENT_OPTIONS: {
  key: RecipientType;
  icon: React.ElementType;
}[] = [
  { key: "allDrivers", icon: Car },
  { key: "allUsers", icon: Users },
  { key: "specificDriver", icon: Car },
  { key: "specificUser", icon: Users },
];

export const SPECIFIC_RECIPIENTS: RecipientType[] = [
  "specificDriver",
  "specificUser",
];
