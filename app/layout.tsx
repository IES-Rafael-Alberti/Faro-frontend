import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "./ui/fonts";
import Navbar from "@/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Faro",
  description: "La mejor web para encontrar prácticas de ciclo formativo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      {/* SupressHydrationsWarning remove hydration warnings caused by server-rendered components */}
      <body className={`${montserrat.className} antialiased`} suppressHydrationWarning={true}>
        
        {/* <Navbar /> */}
        {children}
      
      </body>
    </html>
  );
}
