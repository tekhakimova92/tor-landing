import type { Metadata, Viewport } from "next";
import { Jost, Manrope } from "next/font/google";
import { StoreProvider } from "@/components/StoreProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "TÖR — жильё и впечатления по всему Кыргызстану",
    template: "%s · TÖR",
  },
  description: "Бронирование юрт, гостевых домов, отелей и домов у Иссык-Куля, в Нарыне, Оше и по всему Кыргызстану.",
};

export const viewport: Viewport = {
  themeColor: "#1F3A2E",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${manrope.variable} ${jost.variable} antialiased`}>
      <body className="min-h-screen pb-[96px] font-sans md:pb-0">
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileNav />
        </StoreProvider>
      </body>
    </html>
  );
}
