import localFont from 'next/font/local'
import clsx from 'clsx'
import './globals.css'
import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'

export const metadata: Metadata = {
  metadataBase: new URL("https://leoarayav.vercel.app"),
  title: {
    default: 'Leo Araya',
    template: '%s | Leo Araya'
  },
  description: 'My personal portfolio website',
  openGraph: {
    title: 'Leo Araya',
    description: 'My personal portfolio website',
    type: 'website',
    locale: 'en_US',
    siteName: 'leoarayav',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const graphik = localFont({
  src: [
    {
      path: '../public/fonts/Graphik-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Graphik-Medium.ttf',
      weight: '600',
      style: 'bold',
    },
  ],
  variable: '--font-leo',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en"
      className={clsx(
        'text-neutral-50 bg-[#090909]',
        graphik.variable
      )}
    >
      <body className='antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-2 lg:mx-auto'>
          <main className='flex-auto min-w-0 mt-10 flex flex-col px-2 md:px-0'>
            <Navigation />
            {children}
          </main>
      </body>
    </html>
  )
}
