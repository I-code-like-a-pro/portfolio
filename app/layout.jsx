import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Emaediong Chrysanthus - Web Developer',
  description: 'Professional portfolio of Emaediong Chrysanthus, a skilled web developer creating beautiful and functional web experiences',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-light text-dark antialiased`}>
        {children}
      </body>
    </html>
  )
}