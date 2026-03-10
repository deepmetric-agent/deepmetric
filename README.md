# DeepMetric Web

Plataforma web para **DeepMetric.fit** — Sports Tech & Data-Driven Coaching. Herramientas propias y servicios de coaching basados en datos para atletas de resistencia.

## Stack Tecnológico

- **Framework**: Next.js 16 (App Router, React 19)
- **Styling**: Tailwind CSS v4 + shadcn/ui (base-nova theme)
- **CMS**: Keystatic (local storage, MDX/Markdoc)
- **Auth**: NextAuth v5 + GitHub OAuth
- **Database**: Prisma v7 + SQLite (libsql adapter)
- **i18n**: next-intl (ES/EN)
- **Fonts**: Inter (body) + Roboto Slab (headings)

## Requisitos Previos

- Node.js 18+ 
- npm o pnpm
- Cuenta de GitHub (para OAuth)

## Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/luisma/deepmetric-web.git
cd deepmetric-web
```

2. **Instalar dependencias**
```bash
npm install --legacy-peer-deps
```

3. **Configurar variables de entorno**

Copia el archivo de ejemplo y configura tus credenciales:
```bash
cp env.example .env
```

Edita `.env` y añade:
- `AUTH_GITHUB_ID`: Client ID de tu GitHub OAuth App
- `AUTH_GITHUB_SECRET`: Client Secret de tu GitHub OAuth App
- `NEXTAUTH_SECRET`: Ya generado (o genera uno nuevo con `openssl rand -base64 32`)

**Crear GitHub OAuth App:**
1. Ve a GitHub Settings → Developer settings → OAuth Apps → New OAuth App
2. Homepage URL: `http://localhost:3000`
3. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

4. **Generar Prisma Client y migrar base de datos**
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. **Ejecutar servidor de desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
src/
├── app/                    # App Router (Next.js 16)
│   ├── (routes)/          # Rutas públicas
│   ├── admin/             # Panel de administración
│   ├── blog/              # Blog con Keystatic
│   ├── login/             # Página de login
│   └── api/               # API routes (NextAuth)
├── components/
│   ├── landing/           # Componentes de landing page
│   ├── blog/              # Componentes de blog
│   ├── auth/              # Componentes de autenticación
│   ├── mdx/               # Componentes MDX personalizados
│   └── ui/                # shadcn/ui components
├── content/
│   └── posts/             # Posts del blog (.mdoc)
├── i18n/                  # Configuración next-intl
├── lib/
│   ├── auth/              # NextAuth config
│   ├── keystatic/         # Keystatic reader
│   └── db.ts              # Prisma client
└── middleware.ts          # Auth middleware

messages/                   # Traducciones (ES/EN)
prisma/
├── schema.prisma          # Esquema de base de datos
└── migrations/            # Migraciones
```

## Características Principales

### 🏠 Landing Page
- Hero con métricas en tiempo real
- Grid de herramientas de análisis
- Sección "Sobre mí" del fundador
- Servicios especializados (Coaching, Tools, Consulting)
- Footer con selector de idioma

### 📝 Blog
- CMS headless con Keystatic
- Posts en formato MDX/Markdoc
- Componentes personalizados (Callout, YouTube, ComparisonTable, etc.)
- SEO optimizado (OG tags, JSON-LD)
- Soporte multiidioma (ES/EN)

### 🔐 Autenticación
- NextAuth v5 con GitHub OAuth
- Sistema de roles (ADMIN, CONTENT_MANAGER, COLLABORATOR, VIEWER)
- Middleware de protección de rutas
- Componentes: AuthGuard, PermissionGate, UserNav

### 👨‍💼 Panel de Administración
- Dashboard con métricas y actividad reciente
- Gestión de usuarios con roles
- Analytics de plataforma
- Protegido por middleware y roles

### 🌍 Internacionalización
- next-intl con detección automática de locale
- Selector de idioma en footer
- Mensajes en ES/EN
- Cookie-based locale storage

### 🚀 SEO & Performance
- Sitemap dinámico generado desde posts
- robots.txt
- Open Graph y Twitter Cards
- JSON-LD structured data (Article schema)
- Página 404 personalizada

## Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
npx prisma studio    # Prisma Studio (DB GUI)
npx prisma generate  # Generar Prisma Client
```

## Acceso al CMS

Una vez autenticado como ADMIN o CONTENT_MANAGER:
- Keystatic Admin: `http://localhost:3000/keystatic`
- Crear/editar posts, herramientas, y contenido "About"

## Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno en Vercel Dashboard
3. Deploy automático en cada push a `main`

**Variables de entorno requeridas:**
- `AUTH_GITHUB_ID`
- `AUTH_GITHUB_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (URL de producción)

### Otros Providers

El proyecto usa `output: "standalone"` en `next.config.ts` para optimizar el bundle de producción.

## Notas Técnicas

- **Prisma v7**: Requiere driver adapter (`@prisma/adapter-libsql`)
- **Keystatic**: Usa formato single-file `.mdoc` con `fields.document`
- **Middleware**: Configuración edge-compatible separada en `lib/auth/config.ts`
- **shadcn/ui**: No soporta `asChild`; usar `Link` con `buttonVariants`

## Licencia

© 2024 DeepMetric.fit. Todos los derechos reservados.
