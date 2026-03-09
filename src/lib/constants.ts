export const siteConfig = {
  name: "DeepMetric",
  url: "https://deepmetric.fit",
  description:
    "Herramientas propias y servicios de coaching basados en datos para atletas que buscan la máxima precisión en su entrenamiento y competición.",
  author: {
    name: "Luisma",
    title: "Entrenador, Analista & Developer",
    github: "https://github.com/lmgallego",
    linkedin: "#",
  },
  links: {
    github: "https://github.com/lmgallego",
    linkedin: "#",
  },
} as const;

export const tools = [
  {
    name: "Power Guide",
    description:
      "Simulador de pacing ciclista. Optimización de potencia y estrategia para competiciones.",
    href: "https://deepmetric.fit/app/",
    icon: "Zap",
  },
  {
    name: "Route Analyzer",
    description:
      "Análisis táctico de rutas con datos meteorológicos, segmentos y demanda fisiológica.",
    href: "https://deepmetric.fit/route/",
    icon: "Map",
  },
  {
    name: "HRV Compare",
    description:
      "Comparativa de sensores HRV en tiempo real. Seguimiento de recuperación y variabilidad.",
    href: "https://deepmetric.fit/hrv-compare/",
    icon: "Heart",
  },
  {
    name: "CPET Report",
    description:
      "Informes automatizados de ergoespirometría y análisis de umbrales metabólicos con IA.",
    href: "https://deepmetric.fit/cpet/",
    icon: "FileText",
  },
] as const;

export const navLinks = [
  { label: "Herramientas", href: "#herramientas" },
  { label: "Coaching", href: "#servicios" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Blog", href: "/blog" },
] as const;
