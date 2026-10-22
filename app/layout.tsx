import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRUD de anotações",
  description: "O melhor app de anotações que nem o Elon Musk consegue fazer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
