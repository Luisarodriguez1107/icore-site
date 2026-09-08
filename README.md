# Sitio web de iCore

Sitio estático (catálogo de productos + contacto por WhatsApp), listo para publicarse gratis en Vercel o Netlify.

## Estructura

- `index.html` — la página completa.
- `css/styles.css` — estilos (tema oscuro + naranja, inspirado en @icore_bg).
- `js/main.js` — lógica del catálogo, filtros y enlaces de WhatsApp.
- `data/products.json` — **el catálogo de productos**. Editar este archivo para agregar/quitar/actualizar productos, no hay que tocar el HTML.
- `assets/` — logo e imágenes.

## Pendiente de tu parte (para pasar de "borrador" a "real")

1. **Número(s) de WhatsApp reales** → editar `js/main.js`, arriba, en `CONFIG.whatsappGeneral` / `whatsappChia` / `whatsappArauca`. Formato: código de país + número, sin "+" ni espacios. Ej: `573001234567`.
2. **Productos reales**: nombre, precio, condición, descripción, foto → editar `data/products.json` (o mandarme la lista y yo lo hago).
3. **Fotos**: subir imágenes de cada producto/tienda a `assets/` y referenciarlas en `products.json` (campo `"imagen"`).
4. **Logo en alta calidad**: hoy estamos usando un recorte de tu captura de Instagram como referencia (`assets/logo-crop-raw.png`). Ideal: que envíes el archivo del logo en PNG con fondo transparente.
5. **Direcciones exactas y horarios** de las tiendas de Chía y Arauca, si quieres mostrarlos con más detalle (mapa, horario, etc).

## Cómo verlo en tu computador

Con Python instalado, desde esta carpeta:

```
python3 -m http.server 8080
```

Y abrir `http://localhost:8080` en el navegador.

## Cómo publicarlo gratis (Vercel — recomendado)

1. Crear cuenta gratis en https://vercel.com (con GitHub, Google o email).
2. Subir esta carpeta a un repositorio de GitHub (o usar `vercel` CLI directamente sin GitHub).
3. En Vercel: "Add New Project" → importar el repo → Framework Preset: "Other" → Deploy.
4. Vercel entrega una URL pública gratis tipo `icore.vercel.app`.
5. (Opcional) Conectar un dominio propio como `icore.com.co` desde la configuración del proyecto en Vercel.

Alternativa igual de válida: **Netlify** (arrastrar la carpeta directamente a https://app.netlify.com/drop para publicarla en segundos).

## Plan general del proyecto

1. ✅ Definir estructura y contenido base (catálogo + WhatsApp), estilo visual inspirado en Instagram.
2. ✅ Armar el código del sitio (HTML/CSS/JS).
3. ⏳ Cargar productos, fotos y WhatsApp reales.
4. ⏳ Publicar en Vercel/Netlify con URL pública gratuita.
5. ⏳ (Opcional) Conectar dominio propio.
