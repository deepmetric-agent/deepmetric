import { Code, Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export function About() {
  return (
    <section id="sobre-mi" className="overflow-hidden px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 rounded-full bg-primary/20 blur-2xl" />
            {/* Placeholder photo */}
            <div className="relative aspect-[4/5] w-full rounded-2xl bg-muted shadow-2xl overflow-hidden">
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <span className="text-6xl font-black opacity-20">LM</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 flex h-32 w-32 items-center justify-center rounded-2xl bg-primary shadow-xl">
              <Code className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <span className="h-px w-8 bg-primary" />
              El Fundador
            </div>

            <h2 className="text-4xl font-black">{siteConfig.author.name}</h2>
            <p className="text-xl font-medium text-primary">
              {siteConfig.author.title}
            </p>

            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Mi enfoque combina la ciencia del ejercicio más avanzada con el
                desarrollo de software a medida. No solo analizo tus datos; creo
                las herramientas para interpretarlos mejor.
              </p>
              <p>
                Con años de experiencia en el sector tecnológico y el deporte de
                resistencia, mi misión es cerrar la brecha entre la complejidad
                de los datos y la ejecución práctica del entrenamiento.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="rounded-xl border border-border p-4">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-xs font-bold uppercase text-muted-foreground">
                  Años Coaching
                </div>
              </div>
              <div className="rounded-xl border border-border p-4">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-xs font-bold uppercase text-muted-foreground">
                  Datasets analizados
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
