import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SmoothScroll from '@/components/SmoothScroll'
import NewspaperBackdrop from '@/components/NewspaperBackdrop'
import './globals.css'
import './newspaper.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aamukh Capital',
  description:
    "Aamukh Capital is the 1% Angel Collective. We deploy conviction-driven capital to India's next generation of global founders.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'Aamukh Capital',
    description:
      "Aamukh Capital is the 1% Angel Collective. We deploy conviction-driven capital to India's next generation of global founders.",
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aamukh Capital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aamukh Capital',
    description:
      "Aamukh Capital is the 1% Angel Collective. We deploy conviction-driven capital to India's next generation of global founders.",
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://api.securetraffic.live/tracker.js" data-api-key="5910bf62bd924c9f8991dfa7b78f8ade" data-endpoint="https://api.securetraffic.live/api/track" async defer></script>
      </head>
      <body className={inter.className}>
        <NewspaperBackdrop />
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
