# 🤝 Guía de Contribución

Gracias por tu interés en contribuir al proyecto Spider Skin.

## 📝 Estructura del Código

- **`app/`**: Páginas y rutas de Next.js
- **`components/`**: Componentes React reutilizables
- **`lib/`**: Utilidades y configuraciones
- **`config/`**: Archivos de configuración
- **`public/`**: Archivos estáticos

## 🎨 Convenciones de Código

### TypeScript
- Usa TypeScript para todos los archivos nuevos
- Define tipos e interfaces claramente
- Evita `any` cuando sea posible

### Estilos
- Usa Tailwind CSS para estilos
- Sigue el sistema de diseño existente
- Usa las clases utilitarias definidas en `globals.css`

### Componentes
- Usa componentes funcionales con hooks
- Mantén los componentes pequeños y enfocados
- Usa nombres descriptivos

### Commits
- Usa mensajes de commit claros y descriptivos
- Formato: `tipo: descripción breve`
- Ejemplos:
  - `feat: agregar nuevo modelo de moto`
  - `fix: corregir cálculo de precio`
  - `style: mejorar diseño del calendario`

## 🚀 Proceso de Desarrollo

1. Crea una rama desde `main`
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

2. Desarrolla tu funcionalidad
   - Sigue las convenciones de código
   - Agrega comentarios cuando sea necesario
   - Prueba tu código localmente

3. Commit tus cambios
   ```bash
   git add .
   git commit -m "feat: descripción de cambios"
   ```

4. Push y crea un Pull Request
   ```bash
   git push origin feature/nueva-funcionalidad
   ```

## ✅ Checklist antes de hacer PR

- [ ] El código compila sin errores
- [ ] No hay errores de TypeScript
- [ ] Los estilos se ven correctos en mobile y desktop
- [ ] Las funcionalidades nuevas están probadas
- [ ] El código sigue las convenciones establecidas
- [ ] Los comentarios están en español
- [ ] El README está actualizado si es necesario

## 🐛 Reportar Bugs

Si encuentras un bug:

1. Verifica que no esté ya reportado
2. Crea un issue con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots si aplica

## 💡 Sugerir Mejoras

Las sugerencias son bienvenidas:

1. Crea un issue con la etiqueta "enhancement"
2. Describe la mejora propuesta
3. Explica por qué sería útil

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)

---

¡Gracias por contribuir! 🎉
