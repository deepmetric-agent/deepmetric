import Link from "next/link";
import { Activity, Github, Mail } from "lucide-react";
import { siteConfig, tools } from "@/lib/constants";
import { LanguageSelector } from "@/components/language-selector";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="mb-6 flex items-center gap-2 text-primary"
            >
              <Activity className="h-7 w-7" />
              <span className="text-xl font-black tracking-tighter">
                DeepMetric.fit
              </span>
            </Link>
            <p className="mb-6 text-sm text-muted-foreground">
              Llevando el entrenamiento de resistencia al siguiente nivel a
              través del análisis de datos riguroso y herramientas
              personalizadas.
            </p>
            <div className="flex gap-4">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:contacto@deepmetric.fit"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Herramientas */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest">
              Herramientas
            </h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {tools.map((tool) => (
                <li key={tool.name}>
                  <a
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest">
              Comunidad
            </h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-primary"
                >
                  Blog de Rendimiento
                </Link>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Estudios de caso
                </a>
              </li>
              <li>
                <Link
                  href="#sobre-mi"
                  className="transition-colors hover:text-primary"
                >
                  Sobre Luisma
                </Link>
              </li>
            </ul>
          </div>

          {/* Preferences */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest">
              Preferencias
            </h4>
            <div className="flex flex-col gap-4">
              <LanguageSelector />
              <p className="text-[10px] text-muted-foreground">
                © {new Date().getFullYear()} DeepMetric.fit. Todos los derechos
                reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
