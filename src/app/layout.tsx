import './globals.css'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZooLogic - Gestão de Zoológicos",
  description: "Sistema de gestão para zoológicos - Controle de animais, funcionários e visitantes",
  keywords: ["zoológico", "gestão", "animais", "funcionários", "visitantes"],
  authors: [{ name: "ZooLogic" }],
  creator: "ZooLogic",
  publisher: "ZooLogic",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
