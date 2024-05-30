import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/auth";

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
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
