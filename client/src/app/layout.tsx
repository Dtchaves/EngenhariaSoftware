// app/layout.js
import "./globals.css";
import TopBar from "./shared/components/TopBar";
import { Tomorrow } from 'next/font/google'

const tomorrow = Tomorrow({
  variable: "--font-tomorrow",
  display: "swap",
  weight: ["100", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={tomorrow.className}>
      <body className="antialiased min-h-screen flex flex-col">
        <TopBar />
        <main>{children}</main>
      </body>
    </html>
  );
}