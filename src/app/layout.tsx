import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Ziggy Bent",
  description: "Mirrors for consciousness exploration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-white text-gray-900 font-sans min-h-screen flex flex-col">
        <header className="w-full py-6 px-6 md:px-12 flex justify-between items-center z-10 relative">
          <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 z-20">
            ZIGGY BENT
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-medium rounded-full transition-colors z-20"
          >
            Sign up for Mirrors
          </Link>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="py-12 text-center text-sm text-gray-900">
          <p>&copy; {new Date().getFullYear()} Ziggy Bent. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
