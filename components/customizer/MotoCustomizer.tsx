'use client'

import { useState, useRef, useEffect } from 'react'

interface VinylLayer {
  color: string
  texture: string
  finish: string
  opacity: number
}

const motoModels = [
  { id: 'yamaha-r1', name: 'Yamaha R1', image: '/motos/yamaha-r1.png' },
  { id: 'honda-cbr', name: 'Honda CBR', image: '/motos/honda-cbr.png' },
  { id: 'kawasaki-ninja', name: 'Kawasaki Ninja', image: '/motos/kawasaki-ninja.png' },
  { id: 'ducati-panigale', name: 'Ducati Panigale', image: '/motos/ducati-panigale.png' },
]

const colors = [
  { name: 'Rojo', value: '#ef4444' },
  { name: 'Azul', value: '#3b82f6' },
  { name: 'Negro', value: '#000000' },
  { name: 'Blanco', value: '#ffffff' },
  { name: 'Verde', value: '#10b981' },
  { name: 'Amarillo', value: '#eab308' },
  { name: 'Naranja', value: '#f97316' },
  { name: 'Morado', value: '#a855f7' },
]

const textures = [
  { id: 'smooth', name: 'Liso' },
  { id: 'carbon', name: 'Fibra de Carbono' },
  { id: 'brushed', name: 'Cepillado' },
  { id: 'perforated', name: 'Perforado' },
]

const finishes = [
  { id: 'gloss', name: 'Brillante' },
  { id: 'matte', name: 'Mate' },
  { id: 'satin', name: 'Satinado' },
  { id: 'chrome', name: 'Cromado' },
]

export function MotoCustomizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedModel, setSelectedModel] = useState(motoModels[0])
  const [layers, setLayers] = useState<VinylLayer[]>([
    {
      color: '#3b82f6',
      texture: 'smooth',
      finish: 'gloss',
      opacity: 1,
    },
  ])

  useEffect(() => {
    drawMoto()
  }, [selectedModel, layers])

  const drawMoto = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Fondo
    ctx.fillStyle = '#111827'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Dibujar capas de vinil
    layers.forEach((layer) => {
      ctx.save()
      
      // Aplicar color
      ctx.fillStyle = layer.color
      ctx.globalAlpha = layer.opacity

      // Aplicar textura (simplificado)
      if (layer.texture === 'carbon') {
        // Patrón de carbono (simplificado)
        ctx.fillStyle = '#1a1a1a'
        ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100)
        // Líneas de carbono
        ctx.strokeStyle = '#333333'
        ctx.lineWidth = 1
        for (let i = 0; i < 20; i++) {
          ctx.beginPath()
          ctx.moveTo(50 + i * 30, 50)
          ctx.lineTo(50 + i * 30, canvas.height - 50)
          ctx.stroke()
        }
      } else {
        ctx.fillStyle = layer.color
        ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100)
      }

      // Aplicar acabado (simplificado - en producción sería más complejo)
      if (layer.finish === 'gloss') {
        // Brillo
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)')
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)')
        ctx.fillStyle = gradient
        ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100)
      }

      ctx.restore()
    })

    // Dibujar silueta de moto (placeholder)
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.strokeRect(100, 100, canvas.width - 200, canvas.height - 200)

    // Texto placeholder
    ctx.fillStyle = '#ffffff'
    ctx.font = '16px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Vista previa de la moto', canvas.width / 2, canvas.height / 2)
  }

  const updateLayer = (index: number, updates: Partial<VinylLayer>) => {
    const newLayers = [...layers]
    newLayers[index] = { ...newLayers[index], ...updates }
    setLayers(newLayers)
  }

  const addLayer = () => {
    setLayers([
      ...layers,
      {
        color: '#3b82f6',
        texture: 'smooth',
        finish: 'gloss',
        opacity: 0.5,
      },
    ])
  }

  const removeLayer = (index: number) => {
    if (layers.length > 1) {
      setLayers(layers.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Canvas */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Modelo de Motocicleta
              </label>
              <select
                value={selectedModel.id}
                onChange={(e) => {
                  const model = motoModels.find(m => m.id === e.target.value)
                  if (model) setSelectedModel(model)
                }}
                className="input-field"
              >
                {motoModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full h-auto rounded-lg bg-dark-900"
                style={{ maxHeight: '600px' }}
              />
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="lg:col-span-1 space-y-6">
          {/* Capas */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Capas de Vinil</h3>
              <button
                onClick={addLayer}
                className="text-primary-500 hover:text-primary-400 text-sm font-medium"
              >
                + Agregar Capa
              </button>
            </div>

            <div className="space-y-4">
              {layers.map((layer, index) => (
                <div key={index} className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-white">Capa {index + 1}</span>
                    {layers.length > 1 && (
                      <button
                        onClick={() => removeLayer(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>

                  {/* Color */}
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Color
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => updateLayer(index, { color: color.value })}
                          className={`w-full h-10 rounded border-2 transition-all ${
                            layer.color === color.value
                              ? 'border-primary-500 scale-110'
                              : 'border-dark-700 hover:border-dark-600'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                    <input
                      type="color"
                      value={layer.color}
                      onChange={(e) => updateLayer(index, { color: e.target.value })}
                      className="mt-2 w-full h-10 rounded border border-dark-700 cursor-pointer"
                    />
                  </div>

                  {/* Textura */}
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Textura
                    </label>
                    <select
                      value={layer.texture}
                      onChange={(e) => updateLayer(index, { texture: e.target.value })}
                      className="input-field text-sm"
                    >
                      {textures.map((texture) => (
                        <option key={texture.id} value={texture.id}>
                          {texture.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Acabado */}
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Acabado
                    </label>
                    <select
                      value={layer.finish}
                      onChange={(e) => updateLayer(index, { finish: e.target.value })}
                      className="input-field text-sm"
                    >
                      {finishes.map((finish) => (
                        <option key={finish.id} value={finish.id}>
                          {finish.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Opacidad */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Opacidad: {Math.round(layer.opacity * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={layer.opacity}
                      onChange={(e) => updateLayer(index, { opacity: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones */}
          <div className="card">
            <button className="btn-primary w-full mb-3">
              Guardar Diseño
            </button>
            <button className="btn-outline w-full">
              Solicitar Cotización
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
