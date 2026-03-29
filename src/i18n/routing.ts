import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "ar",
  pathnames: {
    "/": { en: "/", ar: "/" },
    "/orders": { en: "/orders", ar: "/orders" },
  },
});

export const defaultLocale = routing.defaultLocale;