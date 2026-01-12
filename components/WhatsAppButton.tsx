'use client'

import { useEffect, useState } from 'react'

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '521234567890'

  const message = encodeURIComponent(
    'Hola 👋, quiero cotizar un wrap para mi motocicleta. ¿Me pueden apoyar?'
  )

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={`fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A]
        text-white p-4 rounded-full shadow-2xl
        transform hover:scale-110 transition-all duration-500
        flex items-center justify-center group
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
      </svg>

      <span className="absolute right-full mr-3 px-4 py-2 text-sm rounded-lg bg-dark-900 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Escríbenos por WhatsApp
      </span>
    </a>
  )
}
