'use client'

import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { format, addDays, isBefore, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { PaymentModal } from './PaymentModal'
import toast from 'react-hot-toast'

type ServiceType = 'wrap-completo' | 'wrap-parcial' | 'ppf' | 'cromado'

interface Service {
  id: ServiceType
  name: string
  duration: number // días
  basePrice: number
  depositPercentage: number
}

const services: Service[] = [
  {
    id: 'wrap-completo',
    name: 'Wrap Completo',
    duration: 5,
    basePrice: 8000,
    depositPercentage: 30,
  },
  {
    id: 'wrap-parcial',
    name: 'Wrap Parcial',
    duration: 2,
    basePrice: 3500,
    depositPercentage: 30,
  },
  {
    id: 'ppf',
    name: 'PPF (Paint Protection Film)',
    duration: 3,
    basePrice: 6000,
    depositPercentage: 30,
  },
  {
    id: 'cromado',
    name: 'Cromado',
    duration: 4,
    basePrice: 4500,
    depositPercentage: 30,
  },
]

export function AppointmentBooking() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [blockedDates, setBlockedDates] = useState<Date[]>([])
  const [showPayment, setShowPayment] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    motoBrand: '',
    motoModel: '',
    motoYear: '',
    notes: '',
  })

  // Cargar fechas bloqueadas al montar el componente
  useEffect(() => {
    const loadBlockedDates = async () => {
      try {
        const response = await fetch('/api/appointments')
        if (response.ok) {
          const { appointments } = await response.json()
          const blocked = appointments.map((apt: any) => new Date(apt.date))
          setBlockedDates(blocked)
        } else {
          // Fallback: fechas simuladas para desarrollo
          setBlockedDates([
            addDays(new Date(), 2),
            addDays(new Date(), 5),
            addDays(new Date(), 8),
          ])
        }
      } catch (error) {
        console.error('Error loading blocked dates:', error)
        // Fallback: fechas simuladas para desarrollo
        setBlockedDates([
          addDays(new Date(), 2),
          addDays(new Date(), 5),
          addDays(new Date(), 8),
        ])
      }
    }
    loadBlockedDates()
  }, [])

  const handleDateChange = (date: Date) => {
    // Verificar si la fecha está bloqueada
    const isBlocked = blockedDates.some(blockedDate => isSameDay(blockedDate, date))
    
    if (isBlocked) {
      toast.error('Esta fecha ya está reservada. Por favor selecciona otra.')
      return
    }

    // Verificar que no sea una fecha pasada
    if (isBefore(date, new Date())) {
      toast.error('No puedes seleccionar una fecha pasada.')
      return
    }

    setSelectedDate(date)
  }

  const tileDisabled = ({ date }: { date: Date }) => {
    return (
      isBefore(date, new Date()) ||
      blockedDates.some(blockedDate => isSameDay(blockedDate, date))
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedService || !selectedDate) {
      toast.error('Por favor selecciona un servicio y una fecha')
      return
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error('Por favor completa todos los campos requeridos')
      return
    }

    setShowPayment(true)
  }

  const selectedServiceData = services.find(s => s.id === selectedService)
  const depositAmount = selectedServiceData 
    ? selectedServiceData.basePrice * (selectedServiceData.depositPercentage / 100)
    : 0

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario */}
        <div className="card">
          <h2 className="text-2xl font-display font-bold mb-6">Información del Servicio</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selección de Servicio */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de Servicio *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedService(service.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedService === service.id
                        ? 'border-primary-600 bg-primary-600/10'
                        : 'border-dark-700 bg-dark-800 hover:border-dark-600'
                    }`}
                  >
                    <div className="font-semibold text-white mb-1">{service.name}</div>
                    <div className="text-sm text-gray-400">
                      Duración: {service.duration} días
                    </div>
                    <div className="text-sm text-primary-500 font-semibold mt-1">
                      Desde ${service.basePrice.toLocaleString()} MXN
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Información del Cliente */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Información del Cliente</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="input-field"
                  placeholder="Juan Pérez"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="input-field"
                    placeholder="juan@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="input-field"
                    placeholder="+52 123 456 7890"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Marca *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.motoBrand}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, motoBrand: e.target.value })}
                    className="input-field"
                    placeholder="Yamaha"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Modelo *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.motoModel}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, motoModel: e.target.value })}
                    className="input-field"
                    placeholder="R1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Año *
                  </label>
                  <input
                    type="number"
                    required
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    value={customerInfo.motoYear}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, motoYear: e.target.value })}
                    className="input-field"
                    placeholder="2024"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Notas Adicionales
                </label>
                <textarea
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                  className="input-field"
                  rows={3}
                  placeholder="Detalles adicionales sobre el servicio..."
                />
              </div>
            </div>

            {/* Resumen */}
            {selectedService && selectedDate && (
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <h4 className="font-semibold text-white mb-2">Resumen de Reserva</h4>
                <div className="space-y-1 text-sm text-gray-400">
                  <div>Servicio: {selectedServiceData?.name}</div>
                  <div>Fecha: {format(selectedDate, "dd 'de' MMMM, yyyy", { locale: es })}</div>
                  <div>Duración estimada: {selectedServiceData?.duration} días</div>
                  <div className="pt-2 border-t border-dark-700">
                    <div className="flex justify-between text-white">
                      <span>Anticipo ({selectedServiceData?.depositPercentage}%):</span>
                      <span className="font-semibold text-primary-500">
                        ${depositAmount.toLocaleString()} MXN
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={!selectedService || !selectedDate}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceder al Pago
            </button>
          </form>
        </div>

        {/* Calendario */}
        <div className="card">
          <h2 className="text-2xl font-display font-bold mb-6">Selecciona una Fecha</h2>
          
          <div className="flex justify-center">
            <Calendar
              onChange={handleDateChange as any}
              value={selectedDate}
              tileDisabled={tileDisabled}
              minDate={new Date()}
              className="bg-dark-800 border-dark-700 rounded-lg p-4 w-full"
            />
          </div>

          {selectedDate && (
            <div className="mt-6 p-4 bg-primary-600/10 border border-primary-600/30 rounded-lg">
              <p className="text-sm text-gray-300">
                <strong>Fecha seleccionada:</strong>{' '}
                {format(selectedDate, "dd 'de' MMMM, yyyy", { locale: es })}
              </p>
            </div>
          )}

          <div className="mt-6 space-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-dark-700 rounded border border-dark-600" />
              <span>Fechas disponibles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600/50 rounded border border-red-600" />
              <span>Fechas no disponibles</span>
            </div>
          </div>
        </div>
      </div>

      {showPayment && selectedServiceData && selectedDate && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          appointmentData={{
            service: selectedServiceData,
            date: selectedDate,
            customer: customerInfo,
            depositAmount,
          }}
        />
      )}
    </div>
  )
}
