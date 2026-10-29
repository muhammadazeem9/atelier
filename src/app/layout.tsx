import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ATELIER | Considered Living",
    template: "%s | ATELIER",
  },
  description:
    "Discover thoughtfully selected fashion and timeless lifestyle essentials.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable} flex min-h-screen flex-col antialiased`}
      >
        <CartProvider>
          <Header />

          <div className="flex-1">{children}</div>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
