import "next-auth";
import "next-auth/jwt";

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
  }
}
