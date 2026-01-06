import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Customizer } from '@/components/sections/Customizer'
import { Process } from '@/components/sections/Process'
import { Gallery } from '@/components/sections/Gallery'
import { CTA } from '@/components/sections/CTA'

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
