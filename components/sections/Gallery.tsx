'use client'

import { motion } from 'framer-motion'

// Placeholder images - en producción, estas serían imágenes reales
const galleryImages = [
  { id: 1, title: 'Yamaha R1 - Wrap Completo', category: 'Wrap Completo' },
  { id: 2, title: 'Honda CBR - PPF', category: 'PPF' },
  { id: 3, title: 'Kawasaki Ninja - Wrap Parcial', category: 'Wrap Parcial' },
  { id: 4, title: 'Ducati Panigale - Cromado', category: 'Cromado' },
  { id: 5, title: 'BMW S1000RR - Wrap Completo', category: 'Wrap Completo' },
  { id: 6, title: 'Suzuki GSX-R - PPF', category: 'PPF' },
]

export function Gallery() {
  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-display font-bold mb-4"
        >
          Nuestra <span className="gradient-text">Galería</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          Proyectos realizados con nuestros servicios premium
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl bg-dark-900 border border-dark-800 aspect-square cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-primary-800/20 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-6xl mb-4">🏍️</div>
                <h3 className="text-white font-semibold mb-2">{image.title}</h3>
                <span className="text-primary-400 text-sm">{image.category}</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <div>
                <h3 className="text-white font-semibold mb-1">{image.title}</h3>
                <span className="text-primary-400 text-sm">{image.category}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
