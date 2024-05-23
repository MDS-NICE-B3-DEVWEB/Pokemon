"use client";

import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("light", `${poppins.variable}`)}>
      <body className={cn('min-h-screen font-title antialiased dark:bg-KolectorsRed')}>
        {children}
      </body>
    </html>
  );
}
