import React from "react";
import ReactQueryProvider from "./shared/_components/react-query.prodvider";
import NextAuthProvider from "./shared/_components/next-auth.provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      {/* react query dev tools */}
      <ReactQueryDevtools initialIsOpen={false} />
      <NextAuthProvider>{children}</NextAuthProvider>
    </ReactQueryProvider>
  );
}
