# 🏍️ Spider Skin - Sitio Web para Vinil Automotriz

Sitio web profesional para un garage especializado en wraps, PPF y cromado para motocicletas. Desarrollado con Next.js, TypeScript, Tailwind CSS y Supabase.

## 🚀 Características

- ✅ **Sistema de Citas**: Calendario interactivo con bloqueo automático de fechas
- ✅ **Sistema de Pagos**: Integración con Stripe y Mercado Pago
- ✅ **Sistema de Cotización**: Cotizaciones automáticas con envío por WhatsApp/Email
- ✅ **Customizador de Moto**: Visualizador interactivo con Canvas
- ✅ **Recomendador IA**: Sugerencias inteligentes de vinil según uso y estilo
- ✅ **Diseño Responsive**: Mobile First, optimizado para todos los dispositivos
- ✅ **Tema Oscuro**: Estética racing/custom/underground premium

## 📋 Requisitos Previos

- Node.js 18+ y npm/yarn
- Cuenta de Supabase (gratuita)
- Cuenta de Stripe (para pagos con tarjeta)
- Cuenta de Mercado Pago (opcional, para pagos alternativos)

## 📁 Estructura del Proyecto

```
spider-skin-web/
├── app/                    # Páginas y rutas de Next.js
│   ├── api/               # API Routes
│   │   ├── appointments/  # Endpoints de citas
│   │   ├── quotes/        # Endpoints de cotizaciones
│   │   ├── contact/       # Endpoints de contacto
│   │   └── payments/      # Endpoints de pagos
│   ├── citas/             # Página de reserva de citas
│   ├── cotizacion/        # Página de cotización
│   ├── customizador/      # Página del customizador
│   ├── contacto/          # Página de contacto
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── sections/         # Componentes de secciones
│   ├── appointments/     # Componentes de citas
│   ├── quotes/           # Componentes de cotizaciones
│   ├── customizer/       # Componentes del customizador
│   └── contact/          # Componentes de contacto
├── lib/                  # Utilidades y configuraciones
│   └── supabase.ts       # Cliente de Supabase
├── public/               # Archivos estáticos
└── supabase-schema.sql   # Esquema de la base de datos
```

## 🎨 Cómo Editar

### Editar Textos

Los textos principales están en:
- `components/sections/Hero.tsx` - Texto del hero principal
- `components/sections/Services.tsx` - Descripción de servicios
- `app/layout.tsx` - Metadata y título del sitio

### Editar Imágenes

1. **Imágenes de la galería**: Reemplaza las imágenes en `public/images/gallery/`
2. **Imágenes de motos**: Agrega imágenes base en `public/motos/` con los nombres:
   - `yamaha-r1.png`
   - `honda-cbr.png`
   - `kawasaki-ninja.png`
   - `ducati-panigale.png`

3. **Logo**: Reemplaza el logo en `components/Navbar.tsx` (actualmente es un placeholder con la letra "S")

### Cambiar Precios

Los precios están definidos en:
- `components/appointments/AppointmentBooking.tsx` - Precios base de servicios
- `components/quotes/QuoteForm.tsx` - Precios y multiplicadores de vinil

Ejemplo:
```typescript
const services = [
  {
    id: 'wrap-completo',
    name: 'Wrap Completo',
    duration: 5,
    basePrice: 8000,  // Cambia este valor
    depositPercentage: 30,
  },
  // ...
]
```

### Agregar Nuevos Modelos de Moto

1. **En el customizador** (`components/customizer/MotoCustomizer.tsx`):
   ```typescript
   const motoModels = [
     { id: 'nuevo-modelo', name: 'Nuevo Modelo', image: '/motos/nuevo-modelo.png' },
     // ...
   ]
   ```

2. **Agregar la imagen base** en `public/motos/nuevo-modelo.png`

3. **En el formulario de cotización** (`components/quotes/QuoteForm.tsx`):
   ```typescript
   const brands = [
     'Nueva Marca',
     // ...
   ]
   ```

## 🔧 Configuración de Servicios

### Configurar Stripe

1. Crea una cuenta en [Stripe](https://stripe.com)
2. Obtén tus API keys desde el Dashboard
3. Agrega las keys a `.env.local`
4. Para pruebas, usa las keys de test mode

### Configurar Mercado Pago

1. Crea una cuenta en [Mercado Pago](https://www.mercadopago.com.mx)
2. Crea una aplicación y obtén tus credenciales
3. Agrega las credenciales a `.env.local`
4. Configura las URLs de retorno en el dashboard de Mercado Pago

### Configurar WhatsApp

1. Obtén el número de WhatsApp (formato: código país + número, sin +)
2. Ejemplo: `521234567890` (México)
3. Agrega a `NEXT_PUBLIC_WHATSAPP_NUMBER` en `.env.local`

## 🚀 Deploy a Producción

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Agrega las variables de entorno en la configuración de Vercel
3. Deploy automático en cada push

### Otros servicios

El proyecto es compatible con cualquier servicio que soporte Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 📱 Funcionalidades Principales

### Sistema de Citas

- Calendario interactivo con bloqueo de fechas ocupadas
- Selección de servicio con duración estimada
- Formulario completo de información del cliente
- Pago de anticipo para confirmar la cita
- Confirmación automática por email y WhatsApp

### Sistema de Pagos

- **Stripe**: Pagos con tarjeta (Visa, Mastercard, Amex)
- **Mercado Pago**: Pagos con tarjeta, efectivo y transferencia
- Pago de anticipo configurable (por defecto 30%)
- Confirmación automática después del pago

### Sistema de Cotización

- Selección de marca, modelo y año
- Tipo de servicio y vinil
- Cálculo automático de precio estimado
- Recomendación IA basada en uso y estilo
- Envío automático por WhatsApp

### Customizador de Moto

- Visualización en tiempo real con Canvas
- Múltiples capas de vinil
- Control de color, textura y acabado
- Opacidad ajustable
- Preparado para integración con Three.js

## 🤖 Recomendador IA

El sistema de recomendación IA analiza:
- **Uso de la moto**: Diario, fines de semana, pista, exhibición
- **Estilo preferido**: Deportivo, clásico, agresivo, elegante

Y sugiere:
- Tipo de vinil más adecuado
- Color recomendado
- Nivel de confianza de la recomendación

*Nota: Actualmente usa lógica básica. Puede mejorarse con integración de APIs de IA como OpenAI.*

## 🐛 Solución de Problemas

### Error de conexión a Supabase

- Verifica que las variables de entorno estén correctas
- Asegúrate de que las tablas estén creadas (ejecuta `supabase-schema.sql`)
- Revisa los permisos de RLS (Row Level Security) en Supabase

### Error en pagos de Stripe

- Verifica que estés usando las keys correctas (test vs production)
- Revisa los logs en el dashboard de Stripe
- Asegúrate de que el webhook esté configurado (si es necesario)

### El calendario no bloquea fechas

- Verifica que la API `/api/appointments` esté funcionando
- Revisa que las fechas en la BD estén en el formato correcto
- Asegúrate de que el componente esté haciendo la llamada correcta

## 📝 Notas Adicionales

- El proyecto usa TypeScript para type safety
- Tailwind CSS para estilos (configuración en `tailwind.config.js`)
- Framer Motion para animaciones
- React Hook Form + Zod para validación de formularios
- React Hot Toast para notificaciones

## 🔐 Seguridad

- Las variables de entorno nunca deben committearse
- Usa HTTPS en producción
- Implementa rate limiting en las APIs
- Valida todos los inputs del usuario
- Usa RLS (Row Level Security) en Supabase

## 📄 Licencia

Este proyecto es privado y propiedad de Spider Skin.

## 👨‍💻 Soporte

Para soporte técnico o preguntas, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para Spider Skin**
