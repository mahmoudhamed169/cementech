"use client";

import React from "react";
import ReactQueryProvider from "./shared/_components/react-query.prodvider";
import NextAuthProvider from "./shared/_components/next-auth.provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import NextIntlProvider from "./shared/_components/next-intl.provider";
import { PermissionsProvider } from "./shared/_components/PermissionsProvider";
import { PushNotificationInit } from "../common/PushNotificationInit";

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

        <NextAuthProvider>
          <PermissionsProvider>
            {/* <PushNotificationInit interests={["role-admin"]} /> */}

            {children}
          </PermissionsProvider>
        </NextAuthProvider>
      </ReactQueryProvider>
    </NextIntlProvider>
  );
}
