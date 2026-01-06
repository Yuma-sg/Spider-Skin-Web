'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'

const contactSchema = z.object({
  name: z.string().min(1, 'Ingresa tu nombre'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Teléfono inválido'),
  subject: z.string().min(1, 'Ingresa un asunto'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('¡Mensaje enviado! Te contactaremos pronto.')
        reset()
      } else {
        throw new Error('Error al enviar el mensaje')
      }
    } catch (error) {
      toast.error('Error al enviar el mensaje. Por favor intenta de nuevo.')
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nombre Completo *
          </label>
          <input
            type="text"
            {...register('name')}
            className="input-field"
            placeholder="Juan Pérez"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            {...register('email')}
            className="input-field"
            placeholder="juan@example.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Teléfono *
        </label>
        <input
          type="tel"
          {...register('phone')}
          className="input-field"
          placeholder="+52 123 456 7890"
        />
        {errors.phone && (
          <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Asunto *
        </label>
        <input
          type="text"
          {...register('subject')}
          className="input-field"
          placeholder="Consulta sobre servicios"
        />
        {errors.subject && (
          <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Mensaje *
        </label>
        <textarea
          {...register('message')}
          className="input-field"
          rows={5}
          placeholder="Cuéntanos en qué podemos ayudarte..."
        />
        {errors.message && (
          <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:opacity-50"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  )
}
