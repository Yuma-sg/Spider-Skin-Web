'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const services = [
  {
    title: 'Wrap Completo',
    description:
      'Cobertura total con vinil premium. Protección, presencia y acabado profesional.',
    duration: '5–7 días',
    price: 'Desde $8,000 MXN',
    highlight: 'Más solicitado',
  },
  {
    title: 'Wrap Parcial',
    description:
      'Personalización estratégica para acentos agresivos y detalles únicos.',
    duration: '2–3 días',
    price: 'Desde $3,500 MXN',
  },
  {
    title: 'PPF Protección',
    description:
      'Película protectora invisible contra rayones, impactos y desgaste.',
    duration: '3–5 días',
    price: 'Desde $6,000 MXN',
  },
  {
    title: 'Cromado & Detalles',
    description:
      'Acabados especiales, texturas y detalles de alto impacto visual.',
    duration: '4–6 días',
    price: 'Desde $4,500 MXN',
  },
]

export function Services() {
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
            Servicios Premium
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Customización profesional en vinil para motocicletas
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-dark-900 border border-dark-800 p-8 rounded-xl hover:border-primary-500 transition-all duration-300 group"
            >
              {/* Highlight */}
              {service.highlight && (
                <span className="absolute top-4 right-4 text-xs uppercase tracking-widest text-primary-500">
                  {service.highlight}
                </span>
              )}

              <h3 className="font-display uppercase tracking-widest text-xl mb-4 group-hover:text-primary-500 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="text-sm text-gray-500 mb-2">
                Duración estimada: <span className="text-gray-300">{service.duration}</span>
              </div>

              <div className="text-primary-500 font-semibold mb-6">
                {service.price}
              </div>

              <Link
                href="/cotizacion"
                className="inline-flex items-center text-sm uppercase tracking-widest text-primary-500 group-hover:gap-3 transition-all"
              >
                Cotizar
                <span className="ml-2">→</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <Link
            href="/cotizacion"
            className="btn-outline font-display uppercase tracking-widest"
          >
            Cotiza tu Moto
          </Link>
        </div>

      </div>
    </section>
  )
}
