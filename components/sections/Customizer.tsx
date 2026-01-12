'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const colors = [
  { name: 'Rojo', hex: '#dc2626' },
  { name: 'Azul', hex: '#2563eb' },
  { name: 'Negro', hex: '#020617' },
  { name: 'Blanco', hex: '#f8fafc' },
]

export function Customizer() {
  return (
    <section className="relative py-32 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* COPY */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              Visualiza tu <span className="gradient-text">Moto</span>
            </h2>

            <p className="text-gray-400 text-lg mb-8 max-w-xl">
              Experimenta cómo se vería tu motocicleta con diferentes colores y acabados
              antes de instalar el vinil. Diseña con confianza.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                'Colores y acabados premium',
                'Vista previa realista',
                'Decisiones sin riesgo',
                'Diseño guiado por expertos',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-300">
                  <span className="w-6 h-6 rounded-full bg-primary-600/20 flex items-center justify-center text-primary-500 text-sm">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex gap-4">
              <Link href="/customizador" className="btn-primary">
                Probar Customizador
              </Link>
              <Link href="/cotizacion" className="btn-secondary">
                Cotizar Diseño
              </Link>
            </div>
          </motion.div>

          {/* VISUAL */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-dark-700 bg-dark-800 p-6">

              {/* Preview */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-dark-700 mb-6">
                <Image
                  src="/customizer/preview.jpg"
                  alt="Vista previa customizador"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-xs uppercase tracking-widest text-gray-300">
                    Vista previa simulada
                  </span>
                </div>
              </div>

              {/* Color Picker */}
              <div className="flex justify-center gap-4">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className="w-12 h-12 rounded-lg border-2 border-dark-600 hover:border-primary-500 transition-all"
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  />
                ))}
              </div>

              {/* Badge */}
              <div className="absolute top-4 right-4 text-xs uppercase tracking-widest bg-primary-600/90 text-white px-3 py-1 rounded-full">
                Beta
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
