import { authOptions } from "@/src/auth";
import NextAuth from "next-auth";

const hander = NextAuth(authOptions);

export { hander as GET, hander as POST };
