import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "./ui/fonts";

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
      {/* SupressHydrationsWarning elimina los hydration warning debidos a los componentes renderizados en el servidor */}
      <body className={`${montserrat.className} antialiased`} suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
