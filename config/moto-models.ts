/**
 * Configuración de modelos de motocicletas
 * 
 * Para agregar un nuevo modelo:
 * 1. Agrega el objeto aquí
 * 2. Agrega la imagen en public/motos/[id].png
 * 3. El customizador lo detectará automáticamente
 */

export interface MotoModel {
  id: string
  name: string
  brand: string
  image: string
  year?: string
  category?: 'sport' | 'cruiser' | 'touring' | 'naked' | 'adventure'
}

export const motoModels: MotoModel[] = [
  {
    id: 'yamaha-r1',
    name: 'Yamaha R1',
    brand: 'Yamaha',
    image: '/motos/yamaha-r1.png',
    category: 'sport',
  },
  {
    id: 'honda-cbr',
    name: 'Honda CBR',
    brand: 'Honda',
    image: '/motos/honda-cbr.png',
    category: 'sport',
  },
  {
    id: 'kawasaki-ninja',
    name: 'Kawasaki Ninja',
    brand: 'Kawasaki',
    image: '/motos/kawasaki-ninja.png',
    category: 'sport',
  },
  {
    id: 'ducati-panigale',
    name: 'Ducati Panigale',
    brand: 'Ducati',
    image: '/motos/ducati-panigale.png',
    category: 'sport',
  },
  {
    id: 'bmw-s1000rr',
    name: 'BMW S1000RR',
    brand: 'BMW',
    image: '/motos/bmw-s1000rr.png',
    category: 'sport',
  },
  {
    id: 'suzuki-gsxr',
    name: 'Suzuki GSX-R',
    brand: 'Suzuki',
    image: '/motos/suzuki-gsxr.png',
    category: 'sport',
  },
  // Agrega más modelos aquí
]

/**
 * Obtener modelos por marca
 */
export function getModelsByBrand(brand: string): MotoModel[] {
  return motoModels.filter(model => model.brand.toLowerCase() === brand.toLowerCase())
}

/**
 * Obtener modelo por ID
 */
export function getModelById(id: string): MotoModel | undefined {
  return motoModels.find(model => model.id === id)
}
