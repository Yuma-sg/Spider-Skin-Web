import { NextRequest, NextResponse } from 'next/server'
import { supabase, Appointment } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const appointment: Appointment = {
      service_type: data.service.id,
      service_name: data.service.name,
      date: data.date.toISOString(),
      customer_name: data.customer.name,
      customer_email: data.customer.email,
      customer_phone: data.customer.phone,
      moto_brand: data.customer.motoBrand,
      moto_model: data.customer.motoModel,
      moto_year: data.customer.motoYear,
      notes: data.customer.notes || '',
      status: data.status || 'confirmed',
      payment_status: data.paymentStatus || 'deposit_paid',
      deposit_amount: data.depositAmount,
      total_amount: data.service.basePrice,
    }

    const { data: inserted, error } = await supabase
      .from('appointments')
      .insert([appointment])
      .select()
      .single()

    if (error) {
      console.error('Error inserting appointment:', error)
      return NextResponse.json(
        { error: 'Error al crear la cita' },
        { status: 500 }
      )
    }

    // Enviar confirmación por email (implementar servicio de email)
    // await sendConfirmationEmail(appointment)

    // Enviar confirmación por WhatsApp (implementar servicio de WhatsApp)
    // await sendWhatsAppConfirmation(appointment)

    return NextResponse.json({ success: true, appointment: inserted })
  } catch (error) {
    console.error('Error in POST /api/appointments:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    let query = supabase
      .from('appointments')
      .select('*')
      .eq('status', 'confirmed')

    if (date) {
      query = query.eq('date', date)
    }

    const { data, error } = await query.order('date', { ascending: true })

    if (error) {
      console.error('Error fetching appointments:', error)
      return NextResponse.json(
        { error: 'Error al obtener las citas' },
        { status: 500 }
      )
    }

    return NextResponse.json({ appointments: data || [] })
  } catch (error) {
    console.error('Error in GET /api/appointments:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
