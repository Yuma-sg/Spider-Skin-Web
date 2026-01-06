'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function Customizer() {
  return (
    <section className="section-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Visualiza tu <span className="gradient-text">Moto</span>
          </h2>
          <p className="text-gray-400 text-lg mb-6">
            Nuestro customizador interactivo te permite experimentar con diferentes 
            colores, texturas y acabados antes de tomar una decisión. 
            Ve cómo se verá tu motocicleta con diferentes opciones de vinil.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              'Colores ilimitados',
              'Texturas y acabados realistas',
              'Vista en tiempo real',
              'Compatible con múltiples modelos',
            ].map((feature) => (
              <li key={feature} className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <Link href="/customizador" className="btn-primary inline-block">
            Probar Customizador
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-dark-900 to-dark-800 rounded-2xl p-8 border border-dark-700">
            <div className="aspect-square bg-dark-800 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-6xl mb-4">🏍️</div>
                <p className="text-gray-500 text-sm">Vista previa del customizador</p>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              {['Rojo', 'Azul', 'Negro', 'Blanco'].map((color) => (
                <div
                  key={color}
                  className="w-12 h-12 rounded-lg border-2 border-dark-700 bg-gradient-to-br from-dark-700 to-dark-800 cursor-pointer hover:border-primary-500 transition-colors"
                  style={{
                    backgroundColor: color === 'Rojo' ? '#ef4444' : color === 'Azul' ? '#3b82f6' : color === 'Negro' ? '#000' : '#fff',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
