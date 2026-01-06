import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Spider Skin - Vinil Premium para Motocicletas',
  description: 'Garage especializado en wraps, PPF y cromado para motocicletas. Customización premium con vinil de alta calidad.',
  keywords: 'vinil motos, wrap motocicletas, PPF motos, cromado motos, customización motos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-dark-950 text-gray-100 antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1f2937',
              color: '#f9fafb',
              border: '1px solid #374151',
            },
          }}
        />
      </body>
    </html>
  )
}
