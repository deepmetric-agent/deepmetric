"use client";

import { Activity, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-16 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Content */}
        <div className="z-10 flex flex-col gap-8">
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Nueva era en rendimiento
          </div>

          {/* Title */}
          <h1 className="text-5xl font-black leading-[1.1] tracking-tight lg:text-7xl">
            DeepMetric —{" "}
            <span className="text-primary">Sports Tech</span> & Data-Driven
            Coaching
          </h1>

          {/* Subtitle */}
          <p className="max-w-[540px] text-lg leading-relaxed text-muted-foreground">
            Herramientas propias y servicios de coaching basados en datos para
            atletas que buscan la máxima precisión en su entrenamiento y
            competición.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="#herramientas"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-14 min-w-[180px] rounded-xl px-8 text-base font-bold shadow-lg shadow-primary/20"
              )}
            >
              Explorar herramientas
            </Link>
            <Link
              href="/blog"
              className={cn(
                buttonVariants({ size: "lg", variant: "secondary" }),
                "h-14 min-w-[180px] rounded-xl px-8 text-base font-bold"
              )}
            >
              Leer el blog
            </Link>
          </div>
        </div>

        {/* Hero visual */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-2xl lg:aspect-video">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />

          {/* Placeholder for hero image */}
          <div className="flex h-full w-full items-center justify-center">
            <Activity className="h-24 w-24 text-primary/30" />
          </div>

          {/* Metric overlay card */}
          <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-background/80 p-6 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold uppercase tracking-wide">
                  Última métrica
                </div>
                <div className="text-xs text-muted-foreground">
                  Eficiencia aeróbica: +12% vs mes anterior
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
