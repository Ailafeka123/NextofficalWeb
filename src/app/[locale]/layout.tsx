import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/style/globals.css";
import Menu from "@/component/Menu"
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import Footer from "@/component/Footer";
import ChangeDarkMode from "@/component/ChangeDarkMode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
  const { locale } = await params;
   return{
      openGraph:{
        locale:`${locale}`,
      },
   }
}


export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale:string}>
}>) {
  const {locale} = await params;
  if(!hasLocale(routing.locales, locale)){
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <Menu/>
          {children}
          <ChangeDarkMode/>
          <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
