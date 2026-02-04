import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async (requestLocale) => {
  //variable locale can be set dynamically based on request headers or user preferences
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    timeZone: "UTC",
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
