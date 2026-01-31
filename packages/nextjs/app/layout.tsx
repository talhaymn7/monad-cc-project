import { Inter } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
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
        <div className="flex flex-col min-h-screen">
          <main className="relative flex flex-col flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
