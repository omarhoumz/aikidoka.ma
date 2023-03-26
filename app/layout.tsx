import { IBM_Plex_Sans } from '@next/font/google'
import './globals.css'

const inter = IBM_Plex_Sans({
  weight: ['200', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='bg-zinc-900 text-slate-300'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
