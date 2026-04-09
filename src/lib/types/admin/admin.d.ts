export interface ApiSupervisor {
  id: string;
  phone: string;
  code: string;
  name: string;
  permissions: {
    name: string;
  };
  status: "active" | "inactive" | "blocked";
  role: "admin";
  verified: boolean;
  is_blocked: boolean;
  OTPTransactionId: string;
  created_at: string;
  updated_at: string;
}
