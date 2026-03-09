import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { SessionProvider } from "@/components/auth/session-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DeepMetric — Sports Tech & Data-Driven Coaching",
    template: "%s | DeepMetric",
  },
  description:
    "Herramientas propias y servicios de coaching basados en datos para atletas que buscan la máxima precisión en su entrenamiento y competición.",
  metadataBase: new URL("https://deepmetric.fit"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t?t==='dark':true)}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${robotoSlab.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <NextIntlClientProvider messages={messages}>
          <SessionProvider>{children}</SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
