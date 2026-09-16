# Portfolio público

Sitio web público del portfolio, construido con [Astro](https://astro.build/),
SolidJS y Tailwind CSS. El contenido se obtiene desde una API y las páginas se
generan de forma estática.

## Proyectos relacionados

Este sitio utiliza los siguientes proyectos:

- **Dashboard de administración:** gestiona el contenido del portfolio desde
  [portfolio-admin](https://github.com/chriszumario/portfolio-admin).
- **API:** proporciona los datos que consume este sitio desde
  [portfolio-api](https://github.com/chriszumario/portfolio-api).

## Requisitos

- Node.js 22.12 o posterior
- [Bun](https://bun.sh/)

## Instalación

```sh
bun install
```

Configura la URL base de la API en un archivo `.env`:

```env
PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
```

Si no defines esta variable, se utilizará esa misma URL local por defecto.

## Desarrollo

```sh
bun dev
```

Para iniciar el servidor en segundo plano:

```sh
bun astro dev --background
```

## Comandos útiles

```sh
bun run check    # Validar el proyecto
bun run test     # Ejecutar los tests
bun run build    # Generar la versión de producción
bun run verify   # Ejecutar validación, tests y build
bun run preview  # Previsualizar la build
```

## Estructura principal

- `src/pages/`: páginas del sitio y del blog.
- `src/features/`: componentes organizados por sección.
- `src/components/ui/`: componentes visuales compartidos.
- `src/lib/`: cliente de la API y utilidades.
- `public/`: archivos públicos.
- `tests/`: pruebas automatizadas.
