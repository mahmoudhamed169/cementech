import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Permissions } from "./lib/types/permissions";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        otp: {},
        transactionId: {},
      },
      async authorize(credentials) {
        if (!credentials?.otp || !credentials?.transactionId) return null;

        // ── Step 1: verify OTP وجيب الـ accessToken ──────────────────────────
        const otpRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/verifyOTP`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              OTP: credentials.otp,
              transactionId: credentials.transactionId,
            }),
          }
        );

        const otpJson = await otpRes.json();
        console.log("🔐 otpJson:", otpJson);
        if (!otpRes.ok || !otpJson.success) return null;

        const accessToken: string = otpJson.accessToken;

        // ── Step 2: جيب الـ user مع الـ permissions ──────────────────────────
        const meRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const meJson = await meRes.json();
        console.log("👤 meJson:", meJson);
        if (!meRes.ok || !meJson.success) return null;

        const userData = meJson.data;
        // console.log("✅ permissions:", userData.permissions);

        const permissions: Permissions = userData.permissions;

        // ── Step 3: رجّع كل البيانات + الـ permissions ────────────────────────
        return {
          id: userData.id,
          phone: userData.phone,
          name: userData.name,
          role: userData.role,
          code: userData.code,
          permissions_id: userData.permission_id,
          verified: userData.verified,
          firstTime: otpJson.firstTime ?? false,
          accessToken,
          permissions,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
        token.name = user.name;
        token.role = user.role;
        token.code = user.code;
        token.permissions_id = user.permissions_id;
        token.verified = user.verified;
        token.firstTime = user.firstTime;
        token.accessToken = user.accessToken;
        token.permissions = user.permissions;
        console.log("🔑 JWT token permissions:", token.permissions);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.phone = token.phone;
      session.user.name = token.name;
      session.user.role = token.role;
      session.user.code = token.code;
      session.user.permissions_id = token.permissions_id;
      session.user.verified = token.verified;
      session.user.firstTime = token.firstTime;
      session.user.accessToken = token.accessToken;
      session.user.permissions = token.permissions;
      // console.log("📦 session permissions:", session.user.permissions);
      return session;
    },
  },
};