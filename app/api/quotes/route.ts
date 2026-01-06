import { NextRequest, NextResponse } from 'next/server'
import { supabase, Quote } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const quote: Quote = {
      brand: data.brand,
      model: data.model,
      year: data.year,
      service_type: data.serviceType,
      vinyl_type: data.vinylType,
      usage: data.usage || null,
      style: data.style || null,
      estimated_price: data.estimatedPrice,
      customer_name: data.name,
      customer_email: data.email,
      customer_phone: data.phone,
      status: 'pending',
    }

    const { data: inserted, error } = await supabase
      .from('quotes')
      .insert([quote])
      .select()
      .single()

    if (error) {
      console.error('Error inserting quote:', error)
      return NextResponse.json(
        { error: 'Error al crear la cotización' },
        { status: 500 }
      )
    }

    // Enviar cotización por email
    // await sendQuoteEmail(quote)

    return NextResponse.json({ success: true, quote: inserted })
  } catch (error) {
    console.error('Error in POST /api/quotes:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching quotes:', error)
      return NextResponse.json(
        { error: 'Error al obtener las cotizaciones' },
        { status: 500 }
      )
    }

    return NextResponse.json({ quotes: data || [] })
  } catch (error) {
    console.error('Error in GET /api/quotes:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
