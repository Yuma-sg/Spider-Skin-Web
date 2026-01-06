'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function CTA() {
  return (
    <section className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-12 text-center"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative z-10">
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4 text-white">
            ¿Listo para transformar tu moto?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Aparta tu fecha ahora y dale a tu motocicleta el estilo que siempre quisiste
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/citas" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Reservar Cita
            </Link>
            <Link href="/cotizacion" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-all duration-200">
              Obtener Cotización
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
