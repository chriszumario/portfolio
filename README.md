# Portfolio público

Sitio público del portfolio construido con Astro 7, SolidJS y Tailwind CSS 4.
Astro genera las páginas de forma estática y obtiene el contenido desde la API
configurada mediante `PUBLIC_API_URL`.

## Requisitos

- Node.js 22.12 o posterior
- Bun
- Una API compatible con los endpoints consumidos desde `src/lib/api.ts` y
  `src/features/blog/api.ts`

`PUBLIC_API_URL` representa la URL base completa de la API. Si no está definida, se usa
`http://127.0.0.1:8000/api/v1`.

## Comandos

Ejecutar desde este directorio:

```sh
bun install
bun dev
bun run check
bun run test
bun run build
bun run verify
bun run preview
```

Según `AGENTS.md`, para mantener el servidor de desarrollo en segundo plano se
puede usar:

```sh
bun astro dev --background
```

## Estructura

- `src/pages/`: portada, índice del blog y rutas estáticas de artículos.
- `src/features/`: secciones y componentes por dominio.
- `src/components/ui/`: componentes visuales compartidos.
- `src/lib/`: cliente HTTP, fallbacks y utilidades.
- `src/styles/global.css`: estilos globales y Tailwind.
- `tests/`: tests de contratos, servicios y componentes con Vitest y Astro Container API.
- `public/`: recursos servidos sin transformación.

La portada usa los fallbacks de `src/lib/fallbacks.ts` cuando una petición de
contenido principal falla durante el build. Las publicaciones solo se generan
cuando la API devuelve artículos publicados.

La API actual incrementa `views_count` al consultar el detalle de un artículo.
Como el sitio es estático, esas consultas se realizan durante el build; corregir la
métrica requiere que el backend exponga una lectura sin efectos secundarios.
