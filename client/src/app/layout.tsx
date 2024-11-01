import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopBar from "./shared/components/TopBar";
import { Tomorrow } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const tomorrow = Tomorrow({
  variable: "--font-tomorrow",
  display: "swap",
  weight: ["100", "900"],
})

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={tomorrow.className}>
      <body
        className={`antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <TopBar />
          {children}
        </div>
      </body>
    </html>
  );
}
