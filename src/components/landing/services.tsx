import { Dumbbell, Code2, LineChart, CheckCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: <Dumbbell className="h-9 w-9" />,
    title: "Coaching 1-to-1",
    description:
      "Entrenamiento totalmente personalizado basado en tu fisiología y objetivos de competición. Análisis diario de métricas.",
    features: [
      "Planificación en TrainingPeaks",
      "Análisis WKO5 avanzado",
      "Revisión semanal 15min",
    ],
    cta: "Ver planes",
    highlighted: false,
  },
  {
    icon: <Code2 className="h-9 w-9" />,
    title: "Herramientas a medida",
    description:
      "Desarrollo de calculadoras, dashboards o integraciones específicas para tus necesidades de datos deportivos.",
    features: [
      "Dashboards personalizados",
      "API Integrations (Strava/Garmin)",
      "Algoritmos propios",
    ],
    cta: "Consultar presupuesto",
    highlighted: true,
  },
  {
    icon: <LineChart className="h-9 w-9" />,
    title: "Consultoría",
    description:
      "Sesiones puntuales para análisis de test de lactato, ergoespirometrías o diseño de estrategia nutricional.",
    features: [
      "Análisis de tests",
      "Optimización aerodinámica",
      "Estrategia de carrera",
    ],
    cta: "Reservar sesión",
    highlighted: false,
  },
];

export function Services() {
  return (
    <section
      id="servicios"
      className="border-y border-border bg-card px-6 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black tracking-tight">
            Servicios Especializados
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Soluciones de alto rendimiento diseñadas para atletas individuales,
            equipos y marcas del sector deportivo.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8 transition-all",
                service.highlighted
                  ? "border-2 border-primary bg-card"
                  : "border-border bg-card hover:bg-muted/50"
              )}
            >
              {service.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[10px] font-black uppercase text-primary-foreground">
                  Más solicitado
                </div>
              )}

              <div className="mb-6 text-primary">{service.icon}</div>
              <h3 className="mb-4 text-2xl font-bold">{service.title}</h3>
              <p className="mb-6 flex-grow text-muted-foreground">
                {service.description}
              </p>

              <ul className="mb-8 space-y-3 text-sm">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "w-full rounded-lg py-3 text-sm font-bold transition-all",
                  service.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                )}
              >
                {service.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
