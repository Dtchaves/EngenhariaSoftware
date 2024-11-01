// app/layout.js
"use client";
import "./globals.css";
import { Tomorrow } from "next/font/google";
import TopBar from "./shared/components/TopBar";

const tomorrow = Tomorrow({
  variable: "--font-tomorrow",
  display: "swap",
  weight: ["100", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={tomorrow.className}>
      <body className="antialiased min-h-screen">
        <TopBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
