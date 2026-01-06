'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const services = [
  {
    title: 'Wrap Completo',
    description: 'Cubre toda tu motocicleta con vinil de alta calidad. Protección y estilo en un solo servicio.',
    duration: '5-7 días',
    price: 'Desde $8,000 MXN',
    icon: '🎨',
  },
  {
    title: 'Wrap Parcial',
    description: 'Personaliza secciones específicas de tu moto. Ideal para acentos y detalles únicos.',
    duration: '2-3 días',
    price: 'Desde $3,500 MXN',
    icon: '✨',
  },
  {
    title: 'PPF (Paint Protection Film)',
    description: 'Protección invisible de alta resistencia. Mantén tu pintura original como nueva.',
    duration: '3-5 días',
    price: 'Desde $6,000 MXN',
    icon: '🛡️',
  },
  {
    title: 'Cromado',
    description: 'Acabado cromado premium para piezas específicas. Brillo y elegancia duraderos.',
    duration: '4-6 días',
    price: 'Desde $4,500 MXN',
    icon: '💎',
  },
]

export function Services() {
  return (
    <section id="servicios" className="section-container bg-dark-900/50">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-display font-bold mb-4"
        >
          Nuestros <span className="gradient-text">Servicios</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          Servicios especializados para transformar tu motocicleta
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="card hover:border-primary-600 transition-all duration-300 group"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-display font-semibold mb-2 text-white group-hover:text-primary-500 transition-colors">
              {service.title}
            </h3>
            <p className="text-gray-400 mb-4 text-sm">{service.description}</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {service.duration}
              </div>
              <div className="text-primary-500 font-semibold">{service.price}</div>
            </div>
            <Link
              href="/cotizacion"
              className="text-primary-500 hover:text-primary-400 text-sm font-medium inline-flex items-center group-hover:underline"
            >
              Cotizar ahora →
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
