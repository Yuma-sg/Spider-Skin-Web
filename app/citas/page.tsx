import { AppointmentBooking } from '@/components/appointments/AppointmentBooking'

export const metadata = {
  title: 'Reserva tu Cita - Spider Skin',
  description: 'Aparta tu fecha para el servicio de vinil en tu motocicleta',
}

export default function CitasPage() {
  return (
    <div className="section-container">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
          Reserva tu <span className="gradient-text">Cita</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Selecciona el servicio que necesitas y aparta tu fecha con un anticipo
        </p>
      </div>
      <AppointmentBooking />
    </div>
  )
}
