import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/app/context/auth";
import { montserrat } from "./ui/fonts";

/**
 * Metadata for the document head.
 * 
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: "Faro",
  description: "La mejor web para encontrar prácticas de ciclo formativo.",
};

/**
 * RootLayout component wraps the entire application, providing global styles,
 * authentication context, and setting up the document structure.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {

  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`} suppressHydrationWarning={true}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
