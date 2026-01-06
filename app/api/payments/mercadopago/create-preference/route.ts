import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
  options: {
    timeout: 5000,
  },
})

const preference = new Preference(client)

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'MXN', appointmentData } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Monto inválido' },
        { status: 400 }
      )
    }

    // Crear preferencia de pago
    const preferenceData = {
  items: [
    {
      id: 'vinil-moto-servicio',
      title: 'Servicio de vinil para motocicleta',
      quantity: 1,
      unit_price: amount, // 👈 usamos amount
      currency_id: currency,
    },
    {
      id: 'vinil-moto-anticipo', // ✅ id obligatorio
      title: `Anticipo - ${appointmentData?.service?.name || 'Servicio'}`,
      quantity: 1,
      unit_price: amount,
      currency_id: currency,
    },
  ],
  payer: {
    name: appointmentData?.customer?.name || '',
    email: appointmentData?.customer?.email || '',
    phone: {
      area_code: '52',
      number: appointmentData?.customer?.phone || '',
    },
  },
  back_urls: {
    success: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/citas?payment=success`,
    failure: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/citas?payment=failure`,
    pending: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/citas?payment=pending`,
  },
  auto_return: 'approved',
  metadata: {
    appointment_id: appointmentData?.id || '',
    service_type: appointmentData?.service?.id || '', 
  },
}


    const response = await preference.create({ body: preferenceData })

    return NextResponse.json({
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
    })
  } catch (error: any) {
    console.error('Error creating Mercado Pago preference:', error)
    return NextResponse.json(
      { error: error.message || 'Error al crear la preferencia de pago' },
      { status: 500 }
    )
  }
}
