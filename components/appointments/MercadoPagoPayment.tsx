'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface MercadoPagoPaymentProps {
  amount: number
  onSuccess: () => void
  appointmentData: any
}

export function MercadoPagoPayment({ amount, onSuccess, appointmentData }: MercadoPagoPaymentProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)

    try {
      // Crear preferencia de pago en el backend
      const response = await fetch('/api/payments/mercadopago/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'MXN',
          appointmentData,
        }),
      })

      const { init_point, id } = await response.json()

      if (init_point) {
        // Redirigir a Mercado Pago
        window.location.href = init_point
      } else {
        throw new Error('No se pudo crear la preferencia de pago')
      }
    } catch (error) {
      toast.error('Error al procesar el pago con Mercado Pago')
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <h4 className="font-semibold text-white mb-2">Pago con Mercado Pago</h4>
        <p className="text-sm text-gray-400 mb-4">
          Serás redirigido a Mercado Pago para completar el pago de forma segura.
          Puedes pagar con tarjeta, efectivo o transferencia.
        </p>
      </div>

      <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total a pagar:</span>
          <span className="text-2xl font-bold text-primary-500">
            ${amount.toLocaleString()} MXN
          </span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Procesando...' : `Pagar con Mercado Pago`}
      </button>
    </div>
  )
}
