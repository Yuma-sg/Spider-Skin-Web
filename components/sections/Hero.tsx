'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 bg-background overflow-hidden">
      {/* Subtle industrial texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:24px_24px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl uppercase tracking-widest">
            Transforma tu
            <span className="block text-primary mt-2">
              Motocicleta
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-text-secondary">
            Vinil premium, wraps personalizados y protección PPF
            para motocicletas que exigen presencia.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/citas"
              className="
                bg-primary text-black
                font-display uppercase tracking-widest
                px-8 py-4
                hover:bg-primary-dark transition
              "
            >
              Apartar fecha
            </Link>

            <Link
              href="/cotizacion"
              className="
                border border-border
                text-text-primary
                font-display uppercase tracking-widest
                px-8 py-4
                hover:bg-surface transition
              "
            >
              Cotizar moto
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-text-muted">
            <span className="text-xs tracking-widest uppercase mb-2">
              Scroll
            </span>
            <div className="w-px h-10 bg-border animate-pulse-slow" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
