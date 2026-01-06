import { NextRequest, NextResponse } from 'next/server'
import { supabase, ContactMessage } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const message: ContactMessage = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      status: 'new',
    }

    const { data: inserted, error } = await supabase
      .from('contact_messages')
      .insert([message])
      .select()
      .single()

    if (error) {
      console.error('Error inserting contact message:', error)
      return NextResponse.json(
        { error: 'Error al enviar el mensaje' },
        { status: 500 }
      )
    }

    // Enviar notificación por email
    // await sendContactNotification(message)

    return NextResponse.json({ success: true, message: inserted })
  } catch (error) {
    console.error('Error in POST /api/contact:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
