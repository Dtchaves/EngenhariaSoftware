// app/layout.js
import "./globals.css";
import { Tomorrow } from "next/font/google";
import TopBar from "./shared/components/TopBar";
import { useAuthentication } from "./shared/hooks/use-authentication";

const tomorrow = Tomorrow({
  variable: "--font-tomorrow",
  display: "swap",
  weight: ["400", "900"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await useAuthentication();
  const showSidebar = user !== null;
  const userRole = user?.role;

  return (
    <html lang="en" className={tomorrow.className}>
      <body className="antialiased min-h-screen">
        <TopBar showSidebar={showSidebar} userRole={userRole ?? ""} />
        <main>{children}</main>
      </body>
    </html>
  );
}
