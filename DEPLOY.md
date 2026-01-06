# 🚀 Guía de Deploy

Esta guía te ayudará a desplegar el sitio web de Spider Skin en producción.

## Opción 1: Vercel (Recomendado)

Vercel es la plataforma oficial de Next.js y ofrece el mejor rendimiento.

### Pasos:

1. **Instala Vercel CLI** (opcional, también puedes usar la interfaz web)
   ```bash
   npm i -g vercel
   ```

2. **Conecta tu repositorio**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu repositorio de GitHub/GitLab
   - Vercel detectará automáticamente que es un proyecto Next.js

3. **Configura las variables de entorno**
   - En el dashboard de Vercel, ve a Settings > Environment Variables
   - Agrega todas las variables de `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - `STRIPE_SECRET_KEY`
     - `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY`
     - `MERCADOPAGO_ACCESS_TOKEN`
     - `NEXT_PUBLIC_WHATSAPP_NUMBER`
     - `NEXT_PUBLIC_BASE_URL` (tu dominio de Vercel)

4. **Deploy**
   - Vercel hará deploy automáticamente en cada push a la rama principal
   - O puedes hacer deploy manual desde el dashboard

### Configuración adicional:

- **Dominio personalizado**: En Settings > Domains, agrega tu dominio
- **SSL**: Se configura automáticamente
- **Build Command**: `npm run build` (automático)
- **Output Directory**: `.next` (automático)

## Opción 2: Netlify

1. **Conecta tu repositorio** en [netlify.com](https://netlify.com)

2. **Configuración de build**:
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Variables de entorno**: Agrega todas las variables en Site settings > Environment variables

4. **Deploy**: Netlify hará deploy automático en cada push

## Opción 3: Railway

1. **Conecta tu repositorio** en [railway.app](https://railway.app)

2. **Crea un nuevo proyecto** desde GitHub

3. **Configura las variables de entorno** en Variables

4. **Railway detectará Next.js** y configurará automáticamente

## Opción 4: Servidor VPS (DigitalOcean, AWS, etc.)

### Requisitos:
- Node.js 18+
- PM2 para gestión de procesos
- Nginx como reverse proxy
- Certificado SSL (Let's Encrypt)

### Pasos:

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repo>
   cd spider-skin-web
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Crear archivo .env**
   ```bash
   cp .env.example .env
   # Editar .env con tus credenciales
   ```

4. **Build de producción**
   ```bash
   npm run build
   ```

5. **Instalar PM2**
   ```bash
   npm install -g pm2
   ```

6. **Iniciar con PM2**
   ```bash
   pm2 start npm --name "spider-skin" -- start
   pm2 save
   pm2 startup
   ```

7. **Configurar Nginx**
   ```nginx
   server {
       listen 80;
       server_name tudominio.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Configurar SSL con Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d tudominio.com
   ```

## Configuración Post-Deploy

### 1. Actualizar URLs en servicios externos

- **Stripe**: Actualiza las URLs de webhook en el dashboard
- **Mercado Pago**: Actualiza las URLs de retorno en la configuración
- **Supabase**: Verifica que las políticas RLS permitan acceso desde tu dominio

### 2. Verificar funcionalidades

- [ ] Sistema de citas funciona correctamente
- [ ] Pagos de Stripe procesan correctamente
- [ ] Pagos de Mercado Pago redirigen correctamente
- [ ] Formularios envían datos a la BD
- [ ] WhatsApp button funciona
- [ ] Customizador carga correctamente

### 3. Optimizaciones

- **Imágenes**: Usa Next.js Image component para optimización
- **CDN**: Configura un CDN para assets estáticos
- **Caching**: Configura headers de cache apropiados
- **Monitoring**: Configura servicios de monitoreo (Sentry, LogRocket, etc.)

## Troubleshooting

### Error: "Module not found"
- Verifica que todas las dependencias estén instaladas
- Ejecuta `npm install` nuevamente

### Error: "Environment variables not found"
- Verifica que todas las variables estén configuradas
- Reinicia el servidor después de agregar variables

### Error: "Database connection failed"
- Verifica las credenciales de Supabase
- Revisa que las tablas estén creadas
- Verifica las políticas RLS

### Error: "Payment processing failed"
- Verifica las API keys de Stripe/Mercado Pago
- Revisa los logs del servicio de pago
- Verifica que estés usando keys de producción (no test)

## Monitoreo y Mantenimiento

### Logs

- **Vercel**: Dashboard > Deployments > View Function Logs
- **PM2**: `pm2 logs spider-skin`
- **Nginx**: `/var/log/nginx/error.log`

### Actualizaciones

1. Hacer cambios en el código
2. Commit y push a GitHub
3. Deploy automático (si está configurado)
4. Verificar que todo funcione correctamente

### Backups

- **Base de datos**: Configura backups automáticos en Supabase
- **Código**: GitHub actúa como backup
- **Variables de entorno**: Guarda una copia segura

---

**¡Listo para producción!** 🎉
