import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The 502 Project",
  description: "Emprendedores, founders y builders de Guatemala construyendo tecnología de nivel mundial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
