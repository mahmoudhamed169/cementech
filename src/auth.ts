import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    // Add your authentication providers here
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        // returning a value that matches NextAuth's User type
        // we include a "user" property since the built-in type expects it
        return {
          user: {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            token: "sample-jwt-token",
          },
        } as any;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = (token as any).id;
      }
      return session;
    },
  },
};
