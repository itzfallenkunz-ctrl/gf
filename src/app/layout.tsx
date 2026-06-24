import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "Greenfields — 100% Fresh Milk, Naturally Full Cream",
  description: "Experience the highland goodness of Greenfields. From pasture to pack, managed with 100% cold-chain single-source integrated farms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-white text-[#1C4E80]">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
