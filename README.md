# Casa Villarrica · Landing page

Landing de una sola página para una casa de vacaciones en Villarrica (Región de La Araucanía).
React + Vite + TypeScript + Tailwind CSS. Sin pagos, sin reservas automáticas, sin panel admin.

## Inicio rápido

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera /dist listo para publicar (Vercel, Netlify, etc.)
```

## Qué debes reemplazar (checklist)

| Qué | Dónde |
|---|---|
| Fotografías | Copia tus archivos en `public/images/` (nombres en `public/images/LEEME.txt`). Mientras no existan, se ve el recuadro "Agregar fotografía". |
| Nombre, huéspedes, dormitorios, baños, estacionamiento, textos | `src/data/property.ts` (`null` = pendiente, se muestra "—") |
| WhatsApp, email, Instagram | `src/data/property.ts` o `.env.local` (`VITE_WHATSAPP_NUMBER=569XXXXXXXX`, solo dígitos con código de país) |
| Comodidades | `src/data/amenities.ts` → `available: true` **solo** en las que realmente existen |
| Galería (rutas, textos alternativos, proporción) | `src/data/gallery.ts` |
| Lugares cercanos (nombre, descripción, distancia, imagen, URL) | `src/data/places.ts` (distancia `null` = no se muestra) |
| Imagen al compartir el link | `public/images/og-cover.jpg` y, al publicar, cambia `og:image` en `index.html` por la URL absoluta (`https://tudominio.cl/images/og-cover.jpg`) |
| Título/descripción SEO | `index.html` |

Si no configuras el WhatsApp, el botón flotante **no aparece en producción** (nunca se usa un número ficticio).

## Conectar Supabase

1. Crea un proyecto en Supabase y ejecuta `supabase/schema.sql` en el SQL Editor.
2. Copia `.env.example` a `.env.local` y completa `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` (la clave **anon**; jamás la `service_role`).
3. Para marcar fechas ocupadas, agrega filas en la tabla `reservas` (Table Editor) con estado `reservado` o `bloqueado`.
   - `fecha_inicio` = día de llegada, `fecha_fin` = día de salida. Las noches ocupadas son `[inicio, fin)`; el día de salida queda libre para otra llegada.
4. Las consultas del formulario se guardan en la tabla `consultas`.

**Privacidad:** el navegador nunca lee la tabla `reservas` (tiene nombre/teléfono/email de clientes). Lee la vista `disponibilidad_publica`, que solo expone fechas y estado.

Sin credenciales: en `npm run dev` el calendario muestra fechas ocupadas **de ejemplo** (con un aviso) y el formulario simula el envío; en producción el calendario aparece todo disponible y el formulario muestra un error amable.

## Estructura

```
src/
  components/   Navbar, Hero, PropertyHighlights, AboutHouse, Gallery (+Lightbox), Amenities,
                AvailabilityCalendar, WeatherWidget, NearbyPlaces, BookingForm, Contact,
                WhatsAppButton, Footer (+ Reveal, SmartImage, Placeholder, Icons)
  data/         property.ts, amenities.ts, gallery.ts, places.ts
  lib/          config.ts, supabase.ts, reservations.ts, inquiries.ts, availability.ts,
                weather.ts (Open-Meteo), whatsapp.ts, dates.ts
supabase/schema.sql
```

La capa `lib/reservations.ts` y `lib/inquiries.ts` es el único punto que habla con Supabase: un futuro panel de administración puede agregarse sin tocar los componentes visuales.

## Notas

- Clima: Open-Meteo (gratis, sin API key), se actualiza cada 10 minutos y al volver a la pestaña.
- Accesibilidad: navegación por teclado, foco visible, labels, `aria-*`, disponibilidad indicada con color **y** patrón/texto, y `prefers-reduced-motion` respetado.
- Fotos: exporta en WebP (calidad 75–80, máx. 2400 px). El Hero idealmente pesa menos de 400 KB. Puedes usar `srcSet` en `gallery.ts` para versiones responsive.
- Antes de publicar: reemplaza todos los textos/datos pendientes y revisa que no queden `[EMAIL]` / `[WHATSAPP]` visibles en la sección de contacto.
- El formulario incluye un campo trampa anti-spam; para tráfico alto conviene sumar un captcha (Turnstile/hCaptcha) y una Edge Function.
