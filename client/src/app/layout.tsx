// app/layout.js
import "./globals.css";
import TopBar from "./shared/components/TopBar";
import { Tomorrow } from "next/font/google";

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
