# Contexto del Proyecto: Portfolio Christian Parisca

Este documento proporciona un contexto técnico preciso y libre de redundancias para asistentes de IA y desarrolladores sobre el portfolio.

---

## 1. Objetivos del Proyecto

- **Propósito**: Portfolio web profesional e interactivo de Christian Parisca (Ingeniero de Sistemas & Desarrollador Full Stack).
- **Enfoque de Rendimiento**: Optimización estricta de velocidad de carga y peso de recursos (registrado en `portfolio.md`).
  - _Estado anterior_: Carga inicial de ~8s con ~4.1 MB transferidos.
  - _Estado optimizado_: Reducción a ~3.1 MB usando `astro:assets` en imágenes (e.g. Hero), bajando el tiempo de carga bajo caché a **~881 ms** y sin caché a **1.2s - 1.6s**.

---

## 2. Pila Tecnológica

- **Framework**: [Astro 5](https://astro.build/) (para generación estática y componentes livianos con zero-JS por defecto).
- **Estilado**: [Tailwind CSS v4](https://tailwindcss.com/) (con `tailwind-animations`).
- **Base de Datos / Backend**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`) para almacenamiento dinámico de datos de proyectos.

---

## 3. Arquitectura y Estructura de Ficheros

La estructura de `src/` sigue una división limpia por responsabilidades:

```
src/
├── assets/                  # Recursos estáticos locales (SVGs, imágenes optimizadas)
├── layouts/
│   └── Layout.astro         # Plantilla HTML base, inyecta Header, Footer y Seo
├── styles/
│   └── global.css           # Estilos globales y directivas de Tailwind v4
├── lib/
│   └── supabase.ts          # Cliente de Supabase inicializado con variables de entorno
├── service/
│   └── projects.ts          # Tipado de datos (interface Project) y llamadas a la BD
├── pages/
│   └── index.astro          # Página principal que orquesta todas las secciones del portfolio
└── components/
    ├── Header.astro         # Cabecera de navegación
    ├── Footer.astro         # Pie de página con créditos
    ├── Seo.astro            # Configuración dinámica de metadatos SEO
    ├── ui/                  # Componentes visuales atómicos reutilizables
    │   ├── Button.astro
    │   ├── Link.astro
    │   ├── IconTech.astro
    │   ├── IconSocial.astro
    │   └── style/cloud.astro
    ├── features/            # Bloques funcionales específicos
    │   ├── ProjectCard.astro
    │   ├── linkSoccials.astro
    │   ├── FeatureCard.astro
    │   ├── TechCard.astro
    │   └── ProyectBento.astro
    └── sections/            # Secciones principales del Landing Page
        ├── Hero.astro       # Banner principal
        ├── About.astro      # Información personal / Sobre mí
        ├── Experiences.astro# Historial laboral y profesional
        ├── Projects.astro   # Listado dinámico de proyectos obtenidos de Supabase
        ├── Tech.astro       # Panel de habilidades tecnológicas
        ├── certificates.astro # Logros y certificaciones (no expuestos públicamente por privacidad)
        └── Contact.astro    # Formulario y llamadas a la acción de contacto
```

---

## 4. Flujo de Datos y Backend (Supabase)

### Cliente (`src/lib/supabase.ts`)

Se inicializa usando variables de entorno cargadas en tiempo de build/ejecución:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

### Servicio (`src/service/projects.ts`)

Define la estructura del proyecto e implementa la función `getProjects()` que resuelve relaciones:

```typescript
export interface Project {
  id: number;
  title: string;
  description: string;
  status: boolean;
  image_url: string;
  github: string;
  demo: string;
  used_tech: { tech: { name: string } }[];
}
```

**Consulta relacional**:

```sql
-- Obtiene el proyecto junto a sus tecnologías mediante la tabla intermedia 'used_tech'
project (
  *,
  used_tech (
    tech (name)
  )
)
```

---

## 5. Convenciones y Buenas Prácticas

- **SEO estricto**: Cada sección tiene su semántica bien estructurada (`main`, `section`, `h1`/`h2`, etc.). `Seo.astro` maneja dinámicamente títulos, descripciones y open-graph.
- **Rendimiento**: Evitar componentes hidratados con JS en el cliente si es posible; priorizar renderizado estático de Astro y estilos CSS puros para transiciones.
- **Tailwind CSS v4**: Uso nativo de las nuevas directivas de importación CSS sin necesidad de archivo de configuración complejo en JS.

## -------------------------------------- Extra data --------------------------------------------------------

## Performence and network

speed reload page(cache) = 8.28s
resources(cache) = 4,114 kB

speed reload page(no cache) = 8.02s
resources(no cache) = 4,100 kB

## ompress hero image and use Image astro:assents

speed reload page(cache) = ~7.17s / ~7.82s
resources(cache) = 3,1 kB
load(cache) = 881 ms

speed reload page(no cache) = ~ 7.58s / ~ 7.96s / ~ 8.06s
resources(no cache) = 3,100 kB
load(no cache) = 1.23s - 1.64s
