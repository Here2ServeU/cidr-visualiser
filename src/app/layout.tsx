import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CIDR Pro Visualizer",
  description: "Visualize CIDR ranges and VPC subnetting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex items-center gap-6 px-6 py-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 shadow-sm">
          <Link href="/" className="font-semibold text-sm hover:underline">
            CIDR Tool
          </Link>
          <Link href="/vpc-subnetting" className="font-semibold text-sm hover:underline">
            VPC Subnetting
          </Link>
        </nav>
        <main className="px-6 py-4">{children}</main>
      </body>
    </html>
  );
}
