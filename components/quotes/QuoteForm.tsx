'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { AIRecommendation } from './AIRecommendation'

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
  phone: z.string().min(10, 'Teléfono inválido'),
})

type QuoteFormData = z.infer<typeof quoteSchema>

const brands = [
  'Yamaha', 'Honda', 'Kawasaki', 'Suzuki', 'Ducati', 
  'BMW', 'Triumph', 'Harley-Davidson', 'KTM', 'Aprilia', 'Otra'
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

export function QuoteForm() {
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)
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

  // Calcular precio estimado
  const calculatePrice = () => {
    if (!selectedService || !selectedVinyl) return null

    const service = serviceTypes.find(s => s.id === selectedService)
    const vinyl = vinylTypes.find(v => v.id === selectedVinyl)

    if (!service || !vinyl) return null

    const basePrice = service.basePrice
    const finalPrice = Math.round(basePrice * vinyl.multiplier)
    
    return finalPrice
  }

  // Actualizar precio cuando cambian las selecciones
  useEffect(() => {
    const price = calculatePrice()
    setEstimatedPrice(price)
  }, [selectedService, selectedVinyl])

  const onSubmit = async (data: QuoteFormData) => {
    try {
      const price = calculatePrice()
      
      const quoteData = {
        ...data,
        estimatedPrice: price,
        timestamp: new Date().toISOString(),
      }

      // Enviar cotización
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData),
      })

      if (response.ok) {
        toast.success('¡Cotización enviada! Te contactaremos pronto.')
        
        // Enviar por WhatsApp
        const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '521234567890'
        const message = encodeURIComponent(
          `Hola, solicité una cotización para:\n` +
          `Moto: ${data.brand} ${data.model} ${data.year}\n` +
          `Servicio: ${serviceTypes.find(s => s.id === data.serviceType)?.name}\n` +
          `Vinil: ${vinylTypes.find(v => v.id === data.vinylType)?.name}\n` +
          `Precio estimado: $${price?.toLocaleString()} MXN`
        )
        
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
      } else {
        throw new Error('Error al enviar la cotización')
      }
    } catch (error) {
      toast.error('Error al enviar la cotización. Por favor intenta de nuevo.')
      console.error(error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="card space-y-6">
            {/* Información de la Moto */}
            <div>
              <h3 className="text-xl font-display font-semibold mb-4 text-white">
                Información de tu Motocicleta
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Marca *
                  </label>
                  <select
                    {...register('brand')}
                    className="input-field"
                  >
                    <option value="">Selecciona...</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  {errors.brand && (
                    <p className="text-red-400 text-sm mt-1">{errors.brand.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Modelo *
                  </label>
                  <input
                    type="text"
                    {...register('model')}
                    className="input-field"
                    placeholder="R1"
                  />
                  {errors.model && (
                    <p className="text-red-400 text-sm mt-1">{errors.model.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Año *
                  </label>
                  <input
                    type="number"
                    {...register('year')}
                    className="input-field"
                    placeholder="2024"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                  />
                  {errors.year && (
                    <p className="text-red-400 text-sm mt-1">{errors.year.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Tipo de Servicio */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de Servicio *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {serviceTypes.map((service) => (
                  <label
                    key={service.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedService === service.id
                        ? 'border-primary-600 bg-primary-600/10'
                        : 'border-dark-700 bg-dark-800 hover:border-dark-600'
                    }`}
                  >
                    <input
                      type="radio"
                      {...register('serviceType')}
                      value={service.id}
                      className="sr-only"
                    />
                    <div className="font-semibold text-white mb-1">{service.name}</div>
                    <div className="text-sm text-gray-400">
                      Desde ${service.basePrice.toLocaleString()} MXN
                    </div>
                  </label>
                ))}
              </div>
              {errors.serviceType && (
                <p className="text-red-400 text-sm mt-1">{errors.serviceType.message}</p>
              )}
            </div>

            {/* Tipo de Vinil */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de Vinil *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {vinylTypes.map((vinyl) => (
                  <label
                    key={vinyl.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedVinyl === vinyl.id
                        ? 'border-primary-600 bg-primary-600/10'
                        : 'border-dark-700 bg-dark-800 hover:border-dark-600'
                    }`}
                  >
                    <input
                      type="radio"
                      {...register('vinylType')}
                      value={vinyl.id}
                      className="sr-only"
                    />
                    <div className="font-semibold text-white">{vinyl.name}</div>
                  </label>
                ))}
              </div>
              {errors.vinylType && (
                <p className="text-red-400 text-sm mt-1">{errors.vinylType.message}</p>
              )}
            </div>

            {/* Uso y Estilo (para IA) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Uso Principal
                </label>
                <select {...register('usage')} className="input-field">
                  <option value="">Selecciona...</option>
                  <option value="daily">Uso Diario</option>
                  <option value="weekend">Fines de Semana</option>
                  <option value="track">Pista/Carreras</option>
                  <option value="show">Exhibición/Show</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Estilo Preferido
                </label>
                <select {...register('style')} className="input-field">
                  <option value="">Selecciona...</option>
                  <option value="sport">Deportivo</option>
                  <option value="classic">Clásico</option>
                  <option value="aggressive">Agresivo</option>
                  <option value="elegant">Elegante</option>
                  <option value="custom">Personalizado</option>
                </select>
              </div>
            </div>

            {/* Información de Contacto */}
            <div>
              <h3 className="text-xl font-display font-semibold mb-4 text-white">
                Información de Contacto
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className="input-field"
                    placeholder="Juan Pérez"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      className="input-field"
                      placeholder="juan@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="input-field"
                      placeholder="+52 123 456 7890"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Cotización'}
              </button>
              
              {(usage || style) && (
                <button
                  type="button"
                  onClick={() => setShowAIRecommendation(true)}
                  className="btn-outline"
                >
                  Ver Recomendación IA
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Sidebar con Precio Estimado */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h3 className="text-xl font-display font-semibold mb-4 text-white">
              Precio Estimado
            </h3>
            
            {estimatedPrice ? (
              <div className="space-y-4">
                <div className="text-4xl font-bold text-primary-500">
                  ${estimatedPrice.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">
                  <p>Precio aproximado basado en:</p>
                  <ul className="mt-2 space-y-1">
                    {selectedService && (
                      <li>• {serviceTypes.find(s => s.id === selectedService)?.name}</li>
                    )}
                    {selectedVinyl && (
                      <li>• {vinylTypes.find(v => v.id === selectedVinyl)?.name}</li>
                    )}
                  </ul>
                </div>
                <div className="pt-4 border-t border-dark-700">
                  <p className="text-xs text-gray-500">
                    * El precio final puede variar según las características específicas de tu moto.
                    Esta es una estimación inicial.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-sm">
                Completa el formulario para ver el precio estimado
              </div>
            )}
          </div>
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
