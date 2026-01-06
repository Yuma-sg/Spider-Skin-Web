'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Consulta y Cotización',
    description: 'Cuéntanos sobre tu moto y el estilo que buscas. Te enviamos una cotización detallada.',
  },
  {
    number: '02',
    title: 'Reserva tu Fecha',
    description: 'Aparta tu cita con un anticipo. Bloqueamos la fecha en nuestro calendario.',
  },
  {
    number: '03',
    title: 'Preparación',
    description: 'Preparamos el vinil y las herramientas necesarias para tu proyecto.',
  },
  {
    number: '04',
    title: 'Instalación',
    description: 'Nuestros expertos instalan el vinil con precisión y cuidado en cada detalle.',
  },
  {
    number: '05',
    title: 'Entrega',
    description: 'Revisamos contigo el resultado final y te entregamos tu moto transformada.',
  },
]

export function Process() {
  return (
    <section className="section-container bg-dark-900/50">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-display font-bold mb-4"
        >
          Nuestro <span className="gradient-text">Proceso</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          Un proceso simple y transparente desde la consulta hasta la entrega
        </motion.p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary-600 to-primary-800" style={{ top: '2rem', bottom: '2rem' }} />

        <div className="space-y-12 lg:space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              <div className="lg:w-1/2">
                <div className="card">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center text-2xl font-bold text-white">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
              
              {/* Timeline Dot */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-dark-900" style={{ marginTop: `${index * 20}%` }} />
              
              <div className="lg:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
