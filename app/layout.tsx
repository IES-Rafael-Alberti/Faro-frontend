import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/auth";
import { montserrat } from "./ui/fonts";
import Navbar from "@/components/navbar/navbar";

AuthProvider
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
      <body className={`${montserrat.className} antialiased`} suppressHydrationWarning={true}>
        <Navbar />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
