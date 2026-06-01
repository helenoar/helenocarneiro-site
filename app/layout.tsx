import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-barlow-var',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-barlow-condensed-var',
})

export const metadata: Metadata = {
  title: 'Heleno Carneiro',
  description: 'Dancer, Choreographer, Teacher',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={`${barlow.variable} ${barlowCondensed.variable} bg-bg text-white font-barlow`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
