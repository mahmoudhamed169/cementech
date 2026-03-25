import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/verifyOTP`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              OTP: credentials.otp,
              // transactionId: credentials.transactionId,
              transactionId: "1234567890",
            }),
          },
        );

        const json = await res.json();
        if (!res.ok || !json.success) return null;

        return {
          id: json.data.id,
          phone: json.data.phone,
          name: json.data.name,
          role: json.data.role,
          code: json.data.code,
          permissions_id: json.data.permissions_id,
          verified: json.data.verified,
          firstTime: json.firstTime,
          accessToken: json.accessToken,
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
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.phone = token.phone as string;
      session.user.name = token.name as string;
      session.user.role = token.role as string;
      session.user.code = token.code as string;
      session.user.permissions_id = token.permissions_id as string;
      session.user.verified = token.verified as boolean;
      session.user.firstTime = token.firstTime as boolean;
      session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
};
