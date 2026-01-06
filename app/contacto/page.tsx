import { ContactForm } from '@/components/contact/ContactForm'

export const metadata = {
  title: 'Contacto - Spider Skin',
  description: 'Contáctanos para más información sobre nuestros servicios',
}

export default function ContactoPage() {
  return (
    <div className="section-container">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
          Contáctanos
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Estamos aquí para ayudarte con cualquier pregunta sobre nuestros servicios
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        <ContactForm />
      </div>
    </div>
  )
}
