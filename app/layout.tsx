import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'

import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/next'

import Script from 'next/script'


// ─────────────────────────────────────────────
// Fonts
// ─────────────────────────────────────────────

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const codeBold = localFont({
  src: '../public/fonts/CODE-Bold.otf',
  variable: '--font-display',
  display: 'swap',
})

// ─────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL('https://spider-skin-web.vercel.app'),


  title: {
    default: 'Spider Skin | Vinil Premium para Motocicletas',
    template: '%s | Spider Skin',
  },

  description:
    'Garage especializado en vinil premium para motocicletas. Wraps personalizados, PPF y cromado de alta calidad para motos deportivas y urbanas.',

  keywords: [
    'vinil para motos',
    'wrap motocicletas',
    'ppf motos',
    'cromado motos',
    'custom motos',
    'vinil premium motos',
  ],

  authors: [{ name: 'Spider Skin' }],
  creator: 'Spider Skin',
  publisher: 'Spider Skin',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://spiderskin.mx',
    siteName: 'Spider Skin',
    title: 'Spider Skin | Vinil Premium para Motocicletas',
    description:
      'Transforma tu moto con vinil premium, wraps personalizados y protección PPF.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Spider Skin – Vinil premium para motocicletas',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Spider Skin | Vinil Premium para Motocicletas',
    description:
      'Wraps personalizados, PPF y cromado premium para motocicletas.',
    images: ['/og-image.jpg'],
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

// ─────────────────────────────────────────────
// Root Layout
// ─────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${bodyFont.variable} ${codeBold.variable} scroll-smooth`}>
        <Script
  id="schema-local-business"
  type="application/ld+json"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AutomotiveBusiness",
      "@id": "https://spiderskin.mx",
      "name": "Spider Skin",
      "url": "https://spiderskin.mx",
      "logo": "https://spiderskin.mx/apple-touch-icon.png",
      "image": "https://spiderskin.mx/og-image.jpg",
      "telephone": "+524498181939",
      "priceRange": "$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Spider Skin Vinil Automotriz, 20277, Pirámides, 20277 Aguascalientes, Ags.",
        "addressLocality": "Aguascalientes",
        "addressRegion": "Aguascalientes",
        "postalCode": "20277",
        "addressCountry": "MX"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 21.856343998636937,
        "longitude": -102.27979523114489
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "10:00",
          "closes": "19:00"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/spiderskin.ags",
        "https://maps.app.goo.gl/m4y7ihixYkngCECV9"
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wrap para Motocicletas"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "PPF para Motocicletas"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cromado Automotriz"
          }
        }
      ]
    }),
  }}
/>

      <body className="bg-background text-text-primary font-body antialiased">
        <Navbar />

        <main className="min-h-screen">
          {children}
          <Analytics />
        </main>

        <Footer />
        <WhatsAppButton />

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#121214',
              color: '#F5F5F7',
              border: '1px solid #1F1F23',
            },
          }}
        />
      </body>
    </html>
  )
}
