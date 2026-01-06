import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'mxn', appointmentData } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Monto inválido' },
        { status: 400 }
      )
    }

    // Crear Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: currency.toLowerCase(),
      metadata: {
        appointment_id: appointmentData?.id || '',
        customer_email: appointmentData?.customer?.email || '',
        service_type: appointmentData?.service?.id || '',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error: any) {
    console.error('Error creating Stripe payment intent:', error)
    return NextResponse.json(
      { error: error.message || 'Error al crear el intent de pago' },
      { status: 500 }
    )
  }
}
