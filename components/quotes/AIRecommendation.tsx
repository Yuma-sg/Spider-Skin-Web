'use client'

import { useState, useEffect } from 'react'

interface AIRecommendationProps {
  usage?: string
  style?: string
  onClose: () => void
}

interface Recommendation {
  vinylType: string
  color: string
  reason: string
  confidence: number
}

export function AIRecommendation({ usage, style, onClose }: AIRecommendationProps) {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular recomendación de IA
    // En producción, esto haría una llamada a una API de IA
    const getRecommendation = async () => {
      setLoading(true)
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Lógica de recomendación básica
      let vinylType = 'gloss'
      let color = 'Negro'
      let reason = ''
      
      if (usage === 'track' || style === 'aggressive') {
        vinylType = 'carbon'
        color = 'Negro/Carbono'
        reason = 'Para uso en pista, recomendamos fibra de carbono por su resistencia y estética deportiva.'
      } else if (style === 'elegant' || style === 'classic') {
        vinylType = 'satin'
        color = 'Gris Satinado'
        reason = 'Un acabado satinado ofrece elegancia y sofisticación para un estilo clásico.'
      } else if (usage === 'show') {
        vinylType = 'color-shift'
        color = 'Cambio de Color'
        reason = 'Para exhibición, un vinil con cambio de color crea un impacto visual único.'
      } else if (usage === 'daily') {
        vinylType = 'matte'
        color = 'Gris Mate'
        reason = 'Para uso diario, un acabado mate es más fácil de mantener y oculta mejor las imperfecciones.'
      } else {
        vinylType = 'gloss'
        color = 'Azul Brillante'
        reason = 'Un acabado brillante ofrece un look moderno y llamativo.'
      }

      setRecommendation({
        vinylType,
        color,
        reason,
        confidence: 85,
      })
      
      setLoading(false)
    }

    getRecommendation()
  }, [usage, style])

  if (!usage && !style) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-dark-900 border border-dark-800 rounded-2xl max-w-2xl w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-white">
            Recomendación IA
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mb-4"></div>
            <p className="text-gray-400">Analizando tus preferencias...</p>
          </div>
        ) : recommendation ? (
          <div className="space-y-6">
            <div className="card bg-gradient-to-br from-primary-600/10 to-primary-800/10 border-primary-600/30">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🤖</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-2">
                    Basado en tu perfil:
                  </h3>
                  <p className="text-gray-300 mb-4">{recommendation.reason}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Tipo de Vinil:</span>
                      <span className="text-white font-semibold">{recommendation.vinylType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Color Recomendado:</span>
                      <span className="text-white font-semibold">{recommendation.color}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Confianza:</span>
                      <span className="text-primary-500 font-semibold">{recommendation.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
              <p className="text-sm text-gray-400">
                <strong className="text-white">Nota:</strong> Esta es una recomendación basada en 
                tus preferencias. Puedes elegir cualquier opción disponible en nuestro catálogo.
              </p>
            </div>

            <button
              onClick={onClose}
              className="btn-primary w-full"
            >
              Entendido
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
