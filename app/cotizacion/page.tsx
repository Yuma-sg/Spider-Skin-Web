import { QuoteForm } from '@/components/quotes/QuoteForm'

export const metadata = {
  title: 'Cotiza tu Moto - Spider Skin',
  description: 'Obtén una cotización personalizada para tu motocicleta',
}

export default function CotizacionPage() {
  return (
    <div className="section-container">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
          Cotiza tu <span className="gradient-text">Moto</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Selecciona los detalles de tu motocicleta y servicio para obtener un precio estimado
        </p>
      </div>
      <QuoteForm />
    </div>
  )
}
