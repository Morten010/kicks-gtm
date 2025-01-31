import './globals.css'
import type { Metadata } from 'next'
import Provider from '@/src/context/provider'
import { Rubik } from 'next/font/google'
import Script from 'next/script'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'


const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL("https://kicks-webshop.vercel.app/"),
  title: {
    default: 'Kicks',
    template: `Kicks | %s`
  },
  description: "Discover trendy footwear at Kicks! Shop top brands like Nike, Adidas, and Puma for style and performance. Elevate your look with our curated collection of sneakers and classics. Unbeatable style and comfort, delivered to your door!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script
        defer
        src="https://analytics.mortenra.com/script.js"
        data-website-id="a0488504-232a-4524-861f-53d81acdf97e"
      />
      <GoogleTagManager gtmId="GTM-W657L4PM" />
      <GoogleAnalytics gaId="G-GT4FN58C45" />
      <body className={`bg-grayish ${rubik.className}`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
