'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { StripePayment } from './StripePayment'
import { MercadoPagoPayment } from './MercadoPagoPayment'
import toast from 'react-hot-toast'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  appointmentData: {
    service: {
      id: string
      name: string
      duration: number
      basePrice: number
      depositPercentage: number
    }
    date: Date
    customer: {
      name: string
      email: string
      phone: string
      motoBrand: string
      motoModel: string
      motoYear: string
      notes: string
    }
    depositAmount: number
  }
}

type PaymentMethod = 'stripe' | 'mercadopago' | null

export function PaymentModal({ isOpen, onClose, appointmentData }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)

  if (!isOpen) return null

  const handlePaymentSuccess = async () => {
    // Aquí harías la llamada a la API para guardar la cita
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...appointmentData,
          status: 'confirmed',
          paymentStatus: 'deposit_paid',
        }),
      })

      if (response.ok) {
        toast.success('¡Cita confirmada! Recibirás un email y WhatsApp de confirmación.')
        onClose()
        // Redirigir o recargar
        window.location.href = '/citas?success=true'
      } else {
        throw new Error('Error al confirmar la cita')
      }
    } catch (error) {
      toast.error('Error al confirmar la cita. Por favor contacta con soporte.')
      console.error(error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-dark-900 border border-dark-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-white">
              Confirmar Reserva
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

          {/* Resumen */}
          <div className="card mb-6">
            <h3 className="font-semibold text-white mb-4">Resumen de tu Reserva</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Servicio:</span>
                <span className="text-white">{appointmentData.service.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fecha:</span>
                <span className="text-white">
                  {format(appointmentData.date, "dd 'de' MMMM, yyyy", { locale: es })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Duración:</span>
                <span className="text-white">{appointmentData.service.duration} días</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Moto:</span>
                <span className="text-white">
                  {appointmentData.customer.motoBrand} {appointmentData.customer.motoModel} {appointmentData.customer.motoYear}
                </span>
              </div>
              <div className="pt-4 border-t border-dark-700 mt-4">
                <div className="flex justify-between text-lg">
                  <span className="text-white font-semibold">Anticipo a pagar:</span>
                  <span className="text-primary-500 font-bold">
                    ${appointmentData.depositAmount.toLocaleString()} MXN
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  El resto se paga al momento de la entrega
                </p>
              </div>
            </div>
          </div>

          {/* Selección de método de pago */}
          {!paymentMethod ? (
            <div>
              <h3 className="font-semibold text-white mb-4">Selecciona método de pago</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('stripe')}
                  className="card hover:border-primary-600 transition-all cursor-pointer group"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">💳</div>
                    <div className="font-semibold text-white group-hover:text-primary-500">
                      Tarjeta (Stripe)
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      Visa, Mastercard, Amex
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('mercadopago')}
                  className="card hover:border-primary-600 transition-all cursor-pointer group"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">💵</div>
                    <div className="font-semibold text-white group-hover:text-primary-500">
                      Mercado Pago
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      Tarjetas y efectivo
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setPaymentMethod(null)}
                className="text-primary-500 hover:text-primary-400 text-sm mb-4 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Cambiar método de pago
              </button>

              {paymentMethod === 'stripe' && (
                <StripePayment
                  amount={appointmentData.depositAmount}
                  onSuccess={handlePaymentSuccess}
                  appointmentData={appointmentData}
                />
              )}

              {paymentMethod === 'mercadopago' && (
                <MercadoPagoPayment
                  amount={appointmentData.depositAmount}
                  onSuccess={handlePaymentSuccess}
                  appointmentData={appointmentData}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
