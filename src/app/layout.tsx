import './globals.css'
import { Metadata } from "next";
import { Lemon, Montserrat } from 'next/font/google'

const lemon = Lemon({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lemon',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
})

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
    <html lang="en">
      <body className={`${lemon.variable} ${montserrat.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
