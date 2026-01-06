# ⚡ Inicio Rápido

Guía rápida para poner en marcha el proyecto Spider Skin.

## 🚀 Setup en 5 minutos

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales mínimas:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
NEXT_PUBLIC_WHATSAPP_NUMBER=521234567890
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Configurar base de datos
- Ve a Supabase Dashboard
- SQL Editor
- Ejecuta `supabase-schema.sql`

### 4. Ejecutar en desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## ✅ Verificar que funciona

- [ ] La página principal carga
- [ ] El menú de navegación funciona
- [ ] Puedes acceder a /citas
- [ ] Puedes acceder a /cotizacion
- [ ] El botón de WhatsApp aparece al hacer scroll

## 🔧 Configuración completa (opcional)

Para habilitar todas las funcionalidades:

1. **Stripe** (pagos con tarjeta)
   - Crea cuenta en stripe.com
   - Obtén API keys
   - Agrega a `.env.local`

2. **Mercado Pago** (pagos alternativos)
   - Crea cuenta en mercadopago.com.mx
   - Obtén credenciales
   - Agrega a `.env.local`

## 📝 Próximos pasos

1. Lee el [README.md](README.md) completo
2. Personaliza textos e imágenes
3. Ajusta precios en `config/pricing.ts`
4. Agrega modelos de motos en `config/moto-models.ts`

## 🆘 Problemas comunes

**Error: "Cannot find module"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Error: "Supabase connection failed"**
- Verifica que las variables de entorno estén correctas
- Asegúrate de que las tablas estén creadas

**El calendario no carga**
- Verifica que la API `/api/appointments` funcione
- Revisa la consola del navegador para errores

---

¿Todo funcionando? ¡Sigue con el README completo para personalizar el sitio! 🎉
