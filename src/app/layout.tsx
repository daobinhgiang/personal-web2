import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Giang Dao - Personal Website",
  description: "A personal website and blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body 
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased bg-[#0a0a0a] text-gray-100 min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <LoadingScreen />
        <CustomCursor />
        <main className="flex-1 min-h-0 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
