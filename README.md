# 🚀 Portafolio Web Profesional

[![Astro Badge](https://img.shields.io/badge/Astro-BC52EE?logo=astro&logoColor=fff&style=flat)](https://astro.build/)
[![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat)](https://tailwindcss.com/)
[![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat)](https://www.typescriptlang.org/)

Este proyecto es un portafolio web personal desarrollado con Astro y Tailwind CSS, diseñado para mostrar habilidades, experiencia y proyectos de forma elegante y profesional. Ideal para desarrolladores que buscan destacar su trabajo y experiencia en el mundo digital.

## ✨ Demo

![Portafolio Web Screenshot](public/logo.webp)

## 🛠️ Tecnologías Utilizadas

- **[Astro](https://astro.build/)**: Framework web para crear sitios estáticos rápidos y optimizados
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS para diseño rápido, responsivo y personalizable
- **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript con tipado estático para código más robusto
- **[Bun](https://bun.sh/)**: Runtime y gestor de paquetes JavaScript ultrarrápido
- **[Fontsource](https://fontsource.org/)**: Para la fuente Onest Variable, proporcionando tipografía moderna y legible

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- Bun (opcional, pero recomendado para mejor rendimiento)
- Git (para clonar el repositorio)

## 🔧 Instalación

1. Clona este repositorio
   ```bash
   git clone https://github.com/tu-usuario/portfolio.git
   cd portfolio
   ```

2. Instala las dependencias
   ```bash
   # Usando npm
   npm install
   
   # O usando Bun (recomendado por su velocidad)
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
│   └── tasky.webp
│   └── uptask.webp
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

- **Diseño Responsivo**: Adaptable a diferentes tamaños de pantalla (móvil, tablet, escritorio)
- **Modo Oscuro/Claro**: Cambio automático según preferencias del sistema o selección manual
- **Animaciones Suaves**: Transiciones entre páginas con ViewTransitions API de Astro
- **Iconografía Rica**: Amplia colección de iconos para tecnologías y redes sociales
- **Optimización SEO**: Metadatos configurados para mejor indexación en motores de búsqueda
- **Rendimiento Optimizado**: Puntuación alta en Lighthouse gracias a la arquitectura de Astro
- **Accesibilidad**: Diseñado siguiendo las mejores prácticas de accesibilidad web

## 🌐 Personalización

Para personalizar el portafolio con tu información:

1. Modifica los datos en los componentes principales:
   - `Hero.astro`: Información personal y enlaces
   - `Experience.astro`: Experiencia laboral
   - `Projects.astro`: Proyectos personales
   - `AboutMe.astro`: Información sobre ti

2. Actualiza las imágenes en la carpeta `/public`

3. Ajusta los colores y estilos en `tailwind.config.mjs` según tus preferencias

4. Personaliza el tema oscuro/claro modificando las clases en los componentes relevantes

## 🤝 Contribuir

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está disponible como código abierto bajo la licencia MIT.

## 👏 Agradecimientos

- [Astro](https://astro.build/) por proporcionar un framework increíble
- [Tailwind CSS](https://tailwindcss.com/) por simplificar el diseño
- [Fontsource](https://fontsource.org/) por las fuentes web optimizadas