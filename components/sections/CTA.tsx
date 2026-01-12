'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function CTA() {
  return (
    <section className="relative py-32 bg-dark-950">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-6xl mx-auto px-6"
      >
        <div className="relative overflow-hidden rounded-2xl border border-dark-800 bg-dark-900 p-14 text-center">

          {/* Accent Glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[180px]" />

          <div className="relative z-10">
            <h2 className="font-display uppercase tracking-widest text-4xl sm:text-5xl mb-6">
              Tu Moto No Es Genérica
            </h2>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
              Aparta tu fecha o cotiza tu proyecto con especialistas en vinil
              premium para motocicletas.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/citas"
                className="btn-primary font-display uppercase tracking-widest px-10 py-4 text-lg"
              >
                Apartar Fecha
              </Link>

              <Link
                href="/cotizacion"
                className="btn-outline font-display uppercase tracking-widest px-10 py-4 text-lg"
              >
                Cotizar Moto
              </Link>
            </div>

            {/* Trust line */}
            <div className="mt-12 text-xs text-gray-500 uppercase tracking-widest">
              Instalación profesional · Materiales premium · Resultados reales
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
