import { Inter } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
// 1. BU IMPORTU EKLE:
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import "~~/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Clear Cart",
  description: "Monad Hackathon Project",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black`}>
        {/* 2. TÜM İÇERİĞİ BU BİLEŞENLE SARMALA: */}
        <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
      </body>
    </html>
  );
}
