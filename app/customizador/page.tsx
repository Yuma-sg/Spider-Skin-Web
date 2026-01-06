import { MotoCustomizer } from '@/components/customizer/MotoCustomizer'

export const metadata = {
  title: 'Customiza tu Moto - Spider Skin',
  description: 'Visualiza cómo se verá tu motocicleta con diferentes viniles',
}

export default function CustomizadorPage() {
  return (
    <div className="section-container">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
          Customiza tu <span className="gradient-text">Moto</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Experimenta con diferentes colores, texturas y acabados en tiempo real
        </p>
      </div>
      <MotoCustomizer />
    </div>
  )
}
