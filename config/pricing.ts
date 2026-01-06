/**
 * Configuración de precios y servicios
 * 
 * Para cambiar precios, edita los valores basePrice aquí
 * Los multiplicadores de vinil están en components/quotes/QuoteForm.tsx
 */

export interface Service {
  id: string
  name: string
  description: string
  duration: number // días
  basePrice: number // MXN
  depositPercentage: number // porcentaje del anticipo
  icon: string
}

export const services: Service[] = [
  {
    id: 'wrap-completo',
    name: 'Wrap Completo',
    description: 'Cubre toda tu motocicleta con vinil de alta calidad. Protección y estilo en un solo servicio.',
    duration: 5,
    basePrice: 8000,
    depositPercentage: 30,
    icon: '🎨',
  },
  {
    id: 'wrap-parcial',
    name: 'Wrap Parcial',
    description: 'Personaliza secciones específicas de tu moto. Ideal para acentos y detalles únicos.',
    duration: 2,
    basePrice: 3500,
    depositPercentage: 30,
    icon: '✨',
  },
  {
    id: 'ppf',
    name: 'PPF (Paint Protection Film)',
    description: 'Protección invisible de alta resistencia. Mantén tu pintura original como nueva.',
    duration: 3,
    basePrice: 6000,
    depositPercentage: 30,
    icon: '🛡️',
  },
  {
    id: 'cromado',
    name: 'Cromado',
    description: 'Acabado cromado premium para piezas específicas. Brillo y elegancia duraderos.',
    duration: 4,
    basePrice: 4500,
    depositPercentage: 30,
    icon: '💎',
  },
]

/**
 * Obtener servicio por ID
 */
export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id)
}

/**
 * Calcular precio con multiplicador de vinil
 */
export function calculatePrice(
  serviceId: string,
  vinylMultiplier: number = 1.0
): number {
  const service = getServiceById(serviceId)
  if (!service) return 0
  return Math.round(service.basePrice * vinylMultiplier)
}

/**
 * Calcular anticipo
 */
export function calculateDeposit(serviceId: string, vinylMultiplier: number = 1.0): number {
  const service = getServiceById(serviceId)
  if (!service) return 0
  const totalPrice = calculatePrice(serviceId, vinylMultiplier)
  return Math.round(totalPrice * (service.depositPercentage / 100))
}
