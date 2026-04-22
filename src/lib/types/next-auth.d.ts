import "next-auth";
import "next-auth/jwt";
import { Permissions } from "@/src/lib/types/permissions"; // ← عدّل الـ path حسب مشروعك

declare module "next-auth" {
  interface User {
    id: string;
    phone: string;
    role: string;
    code: string;
    permissions_id: string;
    verified: boolean;
    firstTime: boolean;
    accessToken: string;
    permissions: Permissions | null; // ✅
  }

  interface Session {
    user: {
      name: string;
      id: string;
      phone: string;
      role: string;
      code: string;
      permissions_id: string;
      verified: boolean;
      firstTime: boolean;
      accessToken: string;
      permissions: Permissions | null; // ✅
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    phone: string;
    role: string;
    code: string;
    permissions_id: string;
    verified: boolean;
    firstTime: boolean;
    accessToken: string;
    permissions: Permissions | null; // ✅
  }
}