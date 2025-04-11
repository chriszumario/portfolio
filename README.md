# Portafolio

Este proyecto es un portafolio web personal desarrollado con Astro y Tailwind CSS, diseñado para mostrar habilidades, experiencia y proyectos de forma elegante y profesional.

## 🚀 Tecnologías Utilizadas

- **[Astro](https://astro.build/)**: Framework web para crear sitios estáticos rápidos
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS para diseño rápido y responsivo
- **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript con tipado estático
- **[Bun](https://bun.sh/)**: Runtime y gestor de paquetes JavaScript rápido
- **[Fontsource](https://fontsource.org/)**: Para la fuente Onest Variable

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- Bun (opcional, pero recomendado para mejor rendimiento)

## 🔧 Instalación

1. Clona este repositorio
   ```bash
   git clone <url-del-repositorio>
   cd portfolio
   ```

2. Instala las dependencias
   ```bash
   # Usando npm
   npm install
   
   # O usando Bun
   bun install
   ```

## 🖥️ Desarrollo Local

Para iniciar el servidor de desarrollo:

```bash
# Usando npm
npm run dev

# O usando Bun
bun dev
```

El sitio estará disponible en `http://localhost:4321`

## 🏗️ Construcción para Producción

Para construir el sitio para producción:

```bash
# Usando npm
npm run build

# O usando Bun
bun run build
```

Para previsualizar la versión de producción:

```bash
# Usando npm
npm run preview

# O usando Bun
bun run preview
```

## 📁 Estructura del Proyecto

```
/
├── public/             # Archivos estáticos (imágenes, favicon)
│   ├── favicon.svg
│   ├── logo.webp
│   └── p.webp
├── src/
│   ├── components/     # Componentes reutilizables
│   │   ├── AboutMe.astro
│   │   ├── Badge.astro
│   │   ├── Experience.astro
│   │   ├── ExperienceItem.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Projects.astro
│   │   └── ... (otros componentes)
│   ├── icons/          # Componentes de iconos
│   │   ├── GitHub.astro
│   │   ├── LinkedIn.astro
│   │   └── ... (otros iconos)
│   ├── layouts/        # Plantillas de página
│   │   └── Layout.astro
│   └── pages/          # Páginas del sitio
│       └── index.astro
├── astro.config.mjs    # Configuración de Astro
├── package.json        # Dependencias y scripts
├── tailwind.config.mjs # Configuración de Tailwind CSS
└── tsconfig.json       # Configuración de TypeScript
```

## 🧩 Componentes Principales

- **Hero**: Sección principal con información personal y enlaces a redes sociales
- **Experience**: Muestra la experiencia laboral en formato cronológico
- **Projects**: Galería de proyectos con descripciones y tecnologías utilizadas
- **AboutMe**: Información personal y profesional

## 🎨 Características

- **Diseño Responsivo**: Adaptable a diferentes tamaños de pantalla
- **Modo Oscuro/Claro**: Cambio automático según preferencias del sistema
- **Animaciones Suaves**: Transiciones entre páginas con ViewTransitions API
- **Iconografía Rica**: Amplia colección de iconos para tecnologías y redes sociales

## 🌐 Personalización

Para personalizar el portafolio con tu información:

1. Modifica los datos en los componentes principales:
   - `Hero.astro`: Información personal y enlaces
   - `Experience.astro`: Experiencia laboral
   - `Projects.astro`: Proyectos personales
   - `AboutMe.astro`: Información sobre ti

2. Actualiza las imágenes en la carpeta `/public`

3. Ajusta los colores y estilos en `tailwind.config.mjs` según tus preferencias

## 📄 Licencia

Este proyecto está disponible como código abierto bajo la licencia MIT.