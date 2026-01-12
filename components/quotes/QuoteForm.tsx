'use client'

import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { AIRecommendation } from './AIRecommendation'

/* =======================
   VALIDACIÓN
======================= */
const quoteSchema = z.object({
  brand: z.string().min(1, 'Selecciona una marca'),
  model: z.string().min(1, 'Ingresa el modelo'),
  year: z.string().min(4, 'Ingresa un año válido'),
  serviceType: z.string().min(1, 'Selecciona un tipo de servicio'),
  vinylType: z.string().min(1, 'Selecciona un tipo de vinil'),
  usage: z.string().optional(),
  style: z.string().optional(),
  name: z.string().min(1, 'Ingresa tu nombre'),
  email: z.string().email('Email inválido'),
  phone: z
    .string()
    .regex(/^\+?52\d{10}$/, 'Ingresa un teléfono válido en México'),
})

type QuoteFormData = z.infer<typeof quoteSchema>

/* =======================
   DATA
======================= */
const brands = [
  'Yamaha', 'Honda', 'Kawasaki', 'Suzuki', 'Ducati',
  'BMW', 'Triumph', 'Harley-Davidson', 'KTM', 'Aprilia', 'Otra',
]

const serviceTypes = [
  { id: 'wrap-completo', name: 'Wrap Completo', basePrice: 8000 },
  { id: 'wrap-parcial', name: 'Wrap Parcial', basePrice: 3500 },
  { id: 'ppf', name: 'PPF', basePrice: 6000 },
  { id: 'cromado', name: 'Cromado', basePrice: 4500 },
]

const vinylTypes = [
  { id: 'gloss', name: 'Brillante', multiplier: 1.0 },
  { id: 'matte', name: 'Mate', multiplier: 1.1 },
  { id: 'satin', name: 'Satinado', multiplier: 1.15 },
  { id: 'carbon', name: 'Fibra de Carbono', multiplier: 1.3 },
  { id: 'chrome', name: 'Cromado', multiplier: 1.5 },
  { id: 'color-shift', name: 'Cambio de Color', multiplier: 1.4 },
]

/* =======================
   COMPONENT
======================= */
export function QuoteForm() {
  const [showAIRecommendation, setShowAIRecommendation] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  })

  const selectedService = watch('serviceType')
  const selectedVinyl = watch('vinylType')
  const usage = watch('usage')
  const style = watch('style')

  /* =======================
     PRECIO
  ======================= */
  const estimatedPrice = useMemo(() => {
    if (!selectedService || !selectedVinyl) return null

    const service = serviceTypes.find(s => s.id === selectedService)
    const vinyl = vinylTypes.find(v => v.id === selectedVinyl)

    if (!service || !vinyl) return null
    return Math.round(service.basePrice * vinyl.multiplier)
  }, [selectedService, selectedVinyl])

  /* =======================
     SUBMIT
  ======================= */
  const onSubmit = async (data: QuoteFormData) => {
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          estimatedPrice,
          location: 'Aguascalientes, México',
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) throw new Error()

      toast.success('¡Cotización enviada!')

      const whatsappNumber =
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '521234567890'

      const message = encodeURIComponent(
        `Hola, solicité una cotización:\n\n` +
        `Moto: ${data.brand} ${data.model} ${data.year}\n` +
        `Servicio: ${serviceTypes.find(s => s.id === data.serviceType)?.name}\n` +
        `Vinil: ${vinylTypes.find(v => v.id === data.vinylType)?.name}\n` +
        `Precio estimado: $${estimatedPrice?.toLocaleString()} MXN\n` +
        `Ubicación: Aguascalientes, México`
      )

      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
    } catch {
      toast.error('Error al enviar la cotización')
    }
  }

  /* =======================
     UI
  ======================= */
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-2 card space-y-6"
        >
          <input type="hidden" value="Aguascalientes, México" />

          {/* INFO MOTO */}
          <h3 className="text-xl font-display font-semibold text-white">
            Información de tu Motocicleta
          </h3>

          {/* (resto del formulario queda IGUAL que el tuyo visualmente) */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full disabled:opacity-50"
          >
            {isSubmitting
              ? 'Enviando...'
              : 'Recibir Cotización por WhatsApp'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            No compartimos tu información. Solo te contactamos por tu cotización.
          </p>
        </form>

        {/* SIDEBAR */}
        <div className="card sticky top-24">
          <h3 className="text-xl font-display font-semibold text-white mb-4">
            Precio Estimado
          </h3>

          {estimatedPrice ? (
            <>
              <div className="text-4xl font-bold text-primary-500">
                ${estimatedPrice.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Precio promedio en Aguascalientes para este servicio
              </p>
            </>
          ) : (
            <a
              href="https://wa.me/521234567890?text=Hola,%20quiero%20cotizar%20vinil%20para%20mi%20moto"
              target="_blank"
              className="text-primary-500 underline text-sm"
            >
              Cotiza directo por WhatsApp
            </a>
          )}
        </div>
      </div>

      {showAIRecommendation && (usage || style) && (
        <AIRecommendation
          usage={usage}
          style={style}
          onClose={() => setShowAIRecommendation(false)}
        />
      )}
    </div>
  )
}
