import React from "react";
import ReactQueryProvider from "./shared/_components/react-query.prodvider";
import NextAuthProvider from "./shared/_components/next-auth.provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import NextIntlProvider from "./shared/_components/next-intl.provider";

interface ProvidersProps {
  children: React.ReactNode;
  locale?: string;
  messages?: Record<string, any>;
}

export default function Providers({
  children,
  locale,
  messages,
}: ProvidersProps) {
  return (
    <NextIntlProvider locale={locale} messages={messages}>
      <ReactQueryProvider>
        {/* react query dev tools */}
        <ReactQueryDevtools initialIsOpen={false} />
        <NextAuthProvider>{children}</NextAuthProvider>
      </ReactQueryProvider>
    </NextIntlProvider>
  );
}
