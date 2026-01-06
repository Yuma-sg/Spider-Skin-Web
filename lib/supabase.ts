import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para la base de datos
export interface Appointment {
  id?: string
  service_type: string
  service_name: string
  date: string
  customer_name: string
  customer_email: string
  customer_phone: string
  moto_brand: string
  moto_model: string
  moto_year: string
  notes?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  payment_status: 'pending' | 'deposit_paid' | 'paid' | 'refunded'
  deposit_amount: number
  total_amount: number
  created_at?: string
}

export interface Quote {
  id?: string
  brand: string
  model: string
  year: string
  service_type: string
  vinyl_type: string
  usage?: string
  style?: string
  estimated_price: number
  customer_name: string
  customer_email: string
  customer_phone: string
  status: 'pending' | 'sent' | 'accepted' | 'rejected'
  created_at?: string
}

export interface ContactMessage {
  id?: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied'
  created_at?: string
}
