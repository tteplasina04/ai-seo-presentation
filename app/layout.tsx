import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI × SEO — нейросети в оптимизации сайтов",
  description:
    "Интерактивная презентация о SEO-текстах, метатегах и анализе поведения пользователей.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
