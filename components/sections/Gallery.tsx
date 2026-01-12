'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const gallery = [
  {
    src: '/gallery/moto-01.jpg',
    alt: 'Wrap completo motocicleta',
  },
  {
    src: '/gallery/moto-02.jpg',
    alt: 'Detalle vinil premium',
  },
  {
    src: '/gallery/moto-03.jpg',
    alt: 'PPF protección motocicleta',
  },
  {
    src: '/gallery/moto-04.jpg',
    alt: 'Customización deportiva',
  },
  {
    src: '/gallery/moto-05.jpg',
    alt: 'Detalle acabado premium',
  },
  {
    src: '/gallery/moto-06.jpg',
    alt: 'Motocicleta personalizada',
  },
]

export function Gallery() {
  return (
    <section className="relative py-32 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display uppercase tracking-widest text-4xl sm:text-5xl mb-6"
          >
            Trabajos Reales
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Vinil premium aplicado por especialistas
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, index) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-dark-900 border border-dark-800"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs uppercase tracking-widest text-gray-300">
                  {item.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
