'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Consulta & Diagnóstico',
    description:
      'Analizamos tu motocicleta, uso y estilo deseado para definir la mejor solución.',
  },
  {
    number: '02',
    title: 'Cotización & Reserva',
    description:
      'Recibes una cotización clara. Al confirmar con anticipo, bloqueamos tu fecha.',
  },
  {
    number: '03',
    title: 'Preparación Técnica',
    description:
      'Seleccionamos materiales, cortamos vinil y preparamos cada componente.',
  },
  {
    number: '04',
    title: 'Instalación Profesional',
    description:
      'Aplicación precisa por especialistas, cuidando cada curva y superficie.',
  },
  {
    number: '05',
    title: 'Control & Entrega',
    description:
      'Revisión final, limpieza y entrega de tu moto lista para rodar.',
  },
]

export function Process() {
  return (
    <section className="relative py-32 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display uppercase tracking-widest text-4xl sm:text-5xl mb-6"
          >
            Nuestro Proceso
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Un flujo claro, profesional y sin sorpresas
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-dark-800" />

          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="lg:w-1/2">
                  <div className="bg-dark-900 border border-dark-800 p-8 rounded-xl">
                    <div className="flex items-center gap-6 mb-6">
                      <span className="font-display text-4xl text-primary-500 tracking-widest">
                        {step.number}
                      </span>
                      <h3 className="font-display uppercase tracking-widest text-xl text-white">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Dot */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                  <div className="w-4 h-4 bg-primary-500 rounded-full ring-8 ring-dark-950" />
                </div>

                <div className="lg:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
