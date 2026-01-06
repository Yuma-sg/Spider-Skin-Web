'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import toast from 'react-hot-toast'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

interface StripePaymentProps {
  amount: number
  onSuccess: () => void
  appointmentData: any
}

function StripePaymentForm({ amount, onSuccess, appointmentData }: StripePaymentProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)

    try {
      // Crear Payment Intent en el backend
      const response = await fetch('/api/payments/stripe/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convertir a centavos
          currency: 'mxn',
          appointmentData,
        }),
      })

      const { clientSecret } = await response.json()

      // Confirmar el pago
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      })

      if (error) {
        toast.error(error.message || 'Error al procesar el pago')
        setLoading(false)
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        toast.success('¡Pago exitoso!')
        onSuccess()
      }
    } catch (error) {
      toast.error('Error al procesar el pago')
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="card">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Información de la Tarjeta
        </label>
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <CardElement
            options={{
              style: {
                base: {
                  color: '#f9fafb',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '16px',
                  '::placeholder': {
                    color: '#6b7280',
                  },
                },
                invalid: {
                  color: '#ef4444',
                },
              },
            }}
          />
        </div>
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
        type="submit"
        disabled={!stripe || loading}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Procesando...' : `Pagar $${amount.toLocaleString()} MXN`}
      </button>
    </form>
  )
}

export function StripePayment(props: StripePaymentProps) {
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm {...props} />
    </Elements>
  )
}
