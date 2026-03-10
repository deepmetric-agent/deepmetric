# DeepMetric.fit — Requisitos del Proyecto

## 1. Visión General

Landing page + blog técnico para **DeepMetric** (marca de sports tech). Combina presentación de herramientas propias, servicios de coaching basado en datos, y contenido técnico-científico sobre rendimiento deportivo, HRV, y tecnología aplicada al deporte.

**URL**: https://deepmetric.fit  
**Stack**: Next.js 15 (App Router) + shadcn/ui + Keystatic CMS + NextAuth.js + Tailwind CSS v4 + MDX  
**Idiomas**: Español (por defecto) + Inglés  
**Auth**: GitHub OAuth + role-based access control

---

## 2. Requisitos Funcionales

### 2.1 Landing Page

#### Hero Section
- Título principal con tagline (DeepMetric — Sports Tech & Data-Driven Coaching)
- Subtítulo descriptivo breve
- CTA principal (ej: "Explorar herramientas" / "Leer el blog")
- Fondo visual atractivo (gradientes, animaciones sutiles, o imagen hero)

#### Sección: Herramientas / Tools
- Grid/cards con las herramientas existentes:
  - **Power Guide** — Simulador de pacing ciclista (https://deepmetric.fit/app/)
  - **Route Analyzer** — Análisis táctico de rutas con meteo (https://deepmetric.fit/route/)
  - **HRV Compare** — Comparativa de sensores HRV en tiempo real (https://deepmetric.fit/hrv-compare/)
  - **CPET Report Generator** — Informes de ergoespirometría con IA (https://deepmetric.fit/cpet/)
- Cada card: icono/screenshot, nombre, descripción corta (2 líneas), link a la herramienta
- Posibilidad de añadir más herramientas en el futuro

#### Sección: Sobre Mí / About
- Perfil de Luisma como creador
- Foto (placeholder inicialmente)
- Bio: entrenador, analista de datos, fullstack developer, investigador en sports tech
- Stack tecnológico (iconos o badges)
- Links: GitHub, LinkedIn, contacto

#### Sección: Servicios / Services
- Coaching basado en datos (Intervals.icu, automatizaciones, informes semanales)
- Desarrollo de herramientas deportivas a medida
- Consultoría en sports tech
- CTA de contacto

#### Footer
- Links a herramientas
- Links a blog
- Links sociales (GitHub, LinkedIn)
- Copyright DeepMetric
- Selector de idioma

### 2.2 Blog

#### Listado de posts
- Grid/lista de posts con: imagen hero, título, fecha, tags, tiempo de lectura estimado
- Filtrado por tags/categorías
- Paginación o scroll infinito
- Posts en ambos idiomas (cada post puede tener versión ES y EN independientes)

#### Post individual
- Imagen hero
- Título, fecha, autor, tags, tiempo de lectura
- Contenido MDX con componentes custom
- Tabla de contenidos (TOC) lateral o sticky
- Navegación anterior/siguiente
- Compartir (Twitter/X, LinkedIn, copiar link)
- Posts relacionados al final

#### Componentes MDX custom para posts
- `<Callout type="info|warning|tip|danger">` — avisos/notas destacadas
- `<Collapsible title="...">` — desplegables/accordion
- `<ComparisonTable>` — tablas comparativas con estilo
- `<ImageGallery>` — galería de imágenes con lightbox
- `<YouTube id="...">` — embed de YouTube
- `<ToolDemo src="..." caption="...">` — iframe a herramientas propias
- `<Citation>` — referencia bibliográfica
- `<Tabs>` — contenido en pestañas
- Bloques de código con syntax highlighting y copy button

#### Categorías/Tags sugeridos
- HRV, Cycling, Training, Sensors, Data Analysis, Tools, Research, Coaching

### 2.3 CMS (Keystatic)

- Panel admin en `/keystatic` (o `/admin`)
- Autenticación (GitHub OAuth o modo local)
- Collections:
  - **Posts**: título, slug, idioma (es/en), fecha, autor, tags, imagen hero, excerpt, contenido MDX, draft (boolean)
  - **Tools**: nombre, descripción, url, icono/screenshot, orden
  - **About**: bio en ambos idiomas (singleton)
- Imágenes: almacenadas en `/public/images/blog/` dentro del repo
- Guardado = commit automático al repo GitHub

### 2.4 Autenticación y Control de Acceso

#### Sistema de Auth
- **Provider**: GitHub OAuth (NextAuth.js)
- **Usuarios**:
  - `admin` (Luisma) — acceso total
  - `collaborator` (Juan Quiles, etc.) — acceso limitado configurable
  - `public` — sin autenticación (landing + blog público)

#### Páginas Protegidas
```
/admin/dashboard         -> solo admin
/admin/users            -> solo admin  
/admin/cpet             -> admin + Juan (configurable)
/admin/analytics        -> admin + collaborators permitidos
/admin/tools            -> según permisos
/keystatic              -> admin + content managers
```

#### Middleware de Auth
- Rutas `/admin/*` → requieren autenticación
- Rutas `/keystatic/*` → requieren rol content-manager o admin
- Check de permisos granular por usuario/recurso
- Redirect a login si no autenticado
- Error 403 si sin permisos

### 2.5 Panel de Administración

#### Dashboard Principal (`/admin/dashboard`)
- **Cards resumen**: usuarios activos, posts del blog, métricas de herramientas
- **Quick actions**: crear post, gestionar usuarios, ver analytics
- **Timeline reciente**: últimos cambios, login de usuarios, actividad del CMS

#### Gestión de Usuarios (`/admin/users`) 
- **Lista de usuarios**: foto, nombre, email, rol, último acceso
- **Crear/editar usuarios**: asignar roles, permisos específicos
- **Roles disponibles**:
  - `admin` — control total
  - `content-manager` — crear/editar posts
  - `collaborator` — acceso a herramientas específicas
  - `viewer` — solo lectura en secciones autorizadas

#### Permisos Granulares
- **Por herramienta**: Power Guide, CPET, HRV Compare, Route Analyzer
- **Por sección**: blog management, user management, analytics
- **Por acción**: create, read, update, delete

#### Analytics y Métricas (`/admin/analytics`)
- **Traffic**: visitas landing, posts más leídos, países/idiomas
- **Herramientas**: uso de Power Guide, CPET reports generados
- **Performance**: Core Web Vitals, Lighthouse scores
- **Auth**: logins, usuarios activos, fallos de acceso

#### Componentes del Admin Panel (shadcn/ui)
- `<DataTable>` — listas de usuarios, posts, métricas
- `<Dialog>` — crear/editar usuarios, configuraciones
- `<Card>` — widgets del dashboard, métricas
- `<Badge>` — roles, estados, tags
- `<Tabs>` — secciones del panel
- `<DropdownMenu>` — acciones por fila
- `<Form>` — formularios de configuración
- `<Charts>` — analytics visualization

### 2.6 Internacionalización (i18n)

- Rutas: `/es/...` y `/en/...` (o `/` para español por defecto + `/en/...`)
- Selector de idioma visible (header o footer)
- Contenido estático traducido (landing sections, UI labels, navigation)
- Posts del blog: cada post es independiente por idioma (no traducción automática)
- SEO: hreflang tags, lang attribute, meta tags por idioma
- Alternativa: detectar idioma del navegador en primera visita

### 2.7 SEO

- Meta tags dinámicos por página (title, description, og:image)
- Open Graph y Twitter Cards para cada post
- Sitemap.xml generado automáticamente
- robots.txt
- Schema.org (Article, Person, WebSite)
- URLs limpias y semánticas (`/blog/hrv-sensor-comparison`)

---

## 3. Requisitos No Funcionales

### 3.1 Rendimiento
- Lighthouse score ≥ 90 en todas las categorías
- Imágenes optimizadas con next/image (WebP, lazy loading, responsive)
- Static Generation (SSG) para todas las páginas de contenido
- Bundle JS mínimo — evitar dependencias pesadas
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

### 3.2 Diseño
- Dark mode por defecto (coherente con las herramientas existentes que usan paleta oscura)
- Light mode toggle opcional
- Responsive: mobile-first, breakpoints para tablet y desktop
- Tipografía: Inter o similar sans-serif, legible
- Paleta de colores: basada en cyan (#06b6d4) como accent, dark backgrounds
- Animaciones sutiles (no excesivas): scroll reveals, hover effects
- Diseño moderno, limpio, profesional — no template genérico
- Coherencia visual con las herramientas existentes (HRV Compare, Route Analyzer, etc.)

### 3.3 Accesibilidad
- WCAG 2.1 nivel AA
- Navegación por teclado
- Alt text en imágenes
- Contraste adecuado
- Skip to content link

### 3.4 Seguridad
- HTTPS (ya configurado con Let's Encrypt)
- CSP headers
- Keystatic admin protegido por autenticación
- No exponer API keys ni datos sensibles en el frontend

### 3.5 Deploy & Infraestructura
- VPS Contabo existente (Ubuntu 24.04, Node 22, Nginx)
- Systemd service para el proceso Next.js (como Mission Control en puerto 3100)
- Puerto sugerido: **3200**
- Nginx reverse proxy: `deepmetric.fit /` → localhost:3200
- Las herramientas existentes (`/app/`, `/route/`, `/hrv-compare/`, `/cpet/`) siguen servidas como static por Nginx
- Build: `next build` → output standalone
- Auto-deploy: GitHub webhook o cron pull + rebuild (como RendimientoV2)

### 3.6 Mantenibilidad
- Código limpio con TypeScript estricto
- Componentes reutilizables
- Estructura de carpetas clara:
  ```
  src/
  ├── app/
  │   ├── [locale]/
  │   │   ├── page.tsx              # Landing
  │   │   ├── blog/
  │   │   │   ├── page.tsx          # Blog listing
  │   │   │   └── [slug]/
  │   │   │       └── page.tsx      # Post individual
  │   │   ├── admin/
  │   │   │   ├── dashboard/
  │   │   │   ├── users/
  │   │   │   ├── analytics/
  │   │   │   └── layout.tsx        # Admin layout + auth check
  │   │   └── layout.tsx
  │   ├── keystatic/                # CMS panel
  │   ├── api/
  │   │   ├── auth/[...nextauth]/   # NextAuth.js endpoints
  │   │   └── admin/                # Admin API routes
  │   └── globals.css
  ├── components/
  │   ├── ui/                       # shadcn/ui components
  │   ├── auth/                     # LoginButton, UserNav, AuthGuard
  │   ├── admin/                    # Dashboard widgets, tables, forms
  │   ├── landing/                  # Hero, Tools, About, Services, Footer
  │   ├── blog/                     # PostCard, PostList, TOC, Share
  │   └── mdx/                      # Callout, Collapsible, Tabs, etc.
  ├── lib/
  │   ├── auth/                     # NextAuth config, auth utils
  │   ├── db/                       # Prisma client, queries
  │   ├── i18n/                     # Translations
  │   ├── keystatic/                # CMS config
  │   └── utils.ts                  # cn() utility, etc.
  ├── content/
  │   ├── posts/                    # MDX files
  │   └── tools/                    # Tool definitions
  ├── prisma/
  │   ├── schema.prisma
  │   └── migrations/
  └── styles/
  ```

### 3.7 Contenido inicial
- Landing con todas las secciones (texto placeholder donde falte)
- Al menos 1 post de ejemplo en ES y EN (puede ser la comparativa de sensores HRV)
- Todas las herramientas actuales en la sección Tools

---

## 4. Dependencias Principales

```json
{
  "next": "^15",
  "react": "^19",
  "@keystatic/core": "latest",
  "@keystatic/next": "latest",
  "next-auth": "5.0.0-beta.28",
  "@auth/prisma-adapter": "latest",
  "next-intl": "latest",
  "tailwindcss": "^4",
  "@tailwindcss/typography": "latest",
  "sharp": "latest",
  "@radix-ui/react-avatar": "latest",
  "@radix-ui/react-dropdown-menu": "latest",
  "@radix-ui/react-dialog": "latest",
  "@radix-ui/react-tabs": "latest",
  "@radix-ui/react-slot": "latest",
  "class-variance-authority": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest",
  "lucide-react": "latest",
  "recharts": "latest",
  "prisma": "latest",
  "@prisma/client": "latest"
}
```

### shadcn/ui Components Setup
```bash
npx shadcn@latest init
npx shadcn@latest add button card dialog table tabs badge form dropdown-menu avatar
```

## 5. Variables de Entorno

```env
# App
NEXT_PUBLIC_SITE_URL=https://deepmetric.fit
NEXT_PUBLIC_DEFAULT_LOCALE=es

# NextAuth.js
NEXTAUTH_URL=https://deepmetric.fit
NEXTAUTH_SECRET=...
AUTH_GITHUB_ID=...
AUTH_GITHUB_SECRET=...

# Database (SQLite local o Supabase)
DATABASE_URL="file:./deepmetric.db"
# O: DATABASE_URL="postgresql://..."

# Keystatic (modo local o GitHub)
KEYSTATIC_GITHUB_CLIENT_ID=...
KEYSTATIC_GITHUB_CLIENT_SECRET=...
KEYSTATIC_SECRET=...

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=...
NEXT_PUBLIC_UMAMI_ID=...
```

## 6. Configuración Técnica Detallada

### 6.1 shadcn/ui Theme Customization

```typescript
// tailwind.config.ts
const config = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        // DeepMetric brand colors
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // Custom cyan accent
        accent: {
          DEFAULT: "#06b6d4", // cyan-500
          foreground: "#0e7490", // cyan-700
        }
      }
    }
  }
}
```

### 6.2 Base de Datos Schema (Prisma)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  image     String?
  role      UserRole @default(VIEWER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  accounts Account[]
  sessions Session[]
  permissions UserPermission[]
}

enum UserRole {
  ADMIN
  CONTENT_MANAGER
  COLLABORATOR
  VIEWER
}

model UserPermission {
  id       String @id @default(cuid())
  userId   String
  resource String // "cpet", "analytics", "tools", etc.
  action   String // "read", "write", "delete"
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, resource, action])
}
```

### 6.3 Middleware de Autenticación

```typescript
// middleware.ts
export const config = {
  matcher: [
    "/admin/:path*",
    "/keystatic/:path*",
    "/api/admin/:path*"
  ]
}
```

### 6.4 Componentes Auth Custom

- `<AuthGuard role="admin">` — envuelve páginas protegidas
- `<UserNav />` — dropdown con avatar, logout
- `<PermissionGate resource="cpet" action="read">` — componentes condicionales
- `<RoleBasedRoute allowedRoles={["admin", "collaborator"]}>` — routing protegido

## 7. Notas Adicionales

- El repo será propiedad de Luisma (lmgallego), no de deepmetric-agent
- Las herramientas existentes (Power Guide, Route Analyzer, HRV Compare, CPET) NO se migran — siguen como static en Nginx. La landing solo las referencia con links
- Keystatic en modo local para desarrollo, modo GitHub para producción
- Prioridad: que la landing se vea profesional y el blog funcione bien. Las secciones de servicios pueden ir con contenido placeholder inicialmente