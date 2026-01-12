import { QuoteForm } from '@/components/quotes/QuoteForm'

export const metadata = {
  title: 'Cotiza Vinil y Wrap para tu Moto en Aguascalientes | Spider Skin',
  description:
    'Cotiza vinil premium, wrap o PPF para tu motocicleta en Spider Skin Aguascalientes. Precio estimado rápido y sin compromiso.',
}

export default function CotizacionPage() {
  return (
    <div className="section-container">
       <div className="text-center mb-12">
         <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
          Cotiza el <span className="gradient-text">Vinil de tu Moto</span>
          </h1>

         <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Obtén un precio estimado según tu motocicleta y el tipo de personalización.
          Sin compromiso y atención directa por WhatsApp.
          </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-10">
        <span>✔ Atención personalizada</span>
        <span>✔ Materiales premium</span>
        <span>✔ Garage especializado</span>
        <span>✔ Cotización sin compromiso</span>
      </div>
      <div className="max-w-3xl mx-auto mb-8 text-center text-gray-400">
        <p>
        Completa el formulario y te enviaremos tu cotización estimada.
        Si necesitas ajustes, lo vemos directo por WhatsApp.
        </p>
      </div>

        <QuoteForm />

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
        ¿Prefieres atención inmediata?
          </p>

        <a
        href="https://wa.me/524498181939?text=Hola,%20quiero%20cotizar%20vinil%20para%20mi%20moto"
        target="_blank"
        className="inline-block bg-[#25D366] text-white font-semibold px-8 py-3 rounded-lg hover:scale-105 transition">
        Cotizar por WhatsApp
        </a>
      </div>

    </div>
  )
}
