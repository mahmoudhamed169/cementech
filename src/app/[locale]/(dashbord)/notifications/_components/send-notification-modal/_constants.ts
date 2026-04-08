import { Users, Car, UsersRound, ShieldCheck } from "lucide-react";
import { RecipientType } from "./_types";

export const RECIPIENT_OPTIONS: {
  key: RecipientType;
  icon: React.ElementType;
}[] = [
  { key: "allDrivers", icon: Car },
  { key: "allUsers", icon: Users },
  { key: "all", icon: UsersRound },
  { key: "allSupervisors", icon: ShieldCheck },
];
