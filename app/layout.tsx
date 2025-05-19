import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import GoogleTagManager from '@/components/GoogleTagManager'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// ID GTM réel
const GTM_ID = 'GTM-WR8BQKDC'

export const metadata: Metadata = {
  title: 'Insytra',
  description: 'Generate market research reports with AI',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleTagManager gtmId={GTM_ID} />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
