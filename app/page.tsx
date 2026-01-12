import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Customizer } from '@/components/sections/Customizer'
import { Process } from '@/components/sections/Process'
import { Gallery } from '@/components/sections/Gallery'
import { CTA } from '@/components/sections/CTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vinil Premium y Wraps para Motocicletas',
  description:
    'Especialistas en vinil premium, wraps personalizados y PPF para motocicletas. Cotiza y reserva tu cita hoy.',
}


export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Customizer />
      <Process />
      <Gallery />
      <CTA />
    </>
  )
}
