import Providers from "@/src/components/providers";
import { routing } from "@/src/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";

import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import DirectionProvider from "@/src/components/providers/shared/_components/direction-provider";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Import messages for this locale
  const messages = (await import(`@/src/i18n/messages/${locale}.json`)).default;

  return (
    <DirectionProvider locale={locale}>
      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={`${cairo.variable} ${ibmPlex.variable} font-sans`}
      >
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </div>
    </DirectionProvider>
  );
}
