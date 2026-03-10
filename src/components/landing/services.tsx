"use client";

import { Code2, LineChart, GraduationCap, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const serviceKeys = [
  {
    icon: <Code2 className="h-9 w-9" />,
    titleKey: "tools_title",
    descKey: "tools_desc",
    featureKeys: ["tools_f1", "tools_f2", "tools_f3", "tools_f4", "tools_f5"],
    ctaKey: "tools_cta",
  },
  {
    icon: <LineChart className="h-9 w-9" />,
    titleKey: "consulting_title",
    descKey: "consulting_desc",
    featureKeys: ["consulting_f1", "consulting_f2", "consulting_f3", "consulting_f4"],
    ctaKey: "consulting_cta",
  },
  {
    icon: <GraduationCap className="h-9 w-9" />,
    titleKey: "training_title",
    descKey: "training_desc",
    featureKeys: ["training_f1", "training_f2"],
    ctaKey: "training_cta",
  },
] as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <section
      id="servicios"
      className="border-y border-border bg-card px-6 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black tracking-tight">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          {serviceKeys.map((service) => (
            <div
              key={service.titleKey}
              className="relative flex flex-col rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/40"
            >
              <div className="mb-6 text-primary">{service.icon}</div>
              <h3 className="mb-4 text-2xl font-bold">{t(service.titleKey)}</h3>
              <p className="mb-6 flex-grow text-muted-foreground">
                {t(service.descKey)}
              </p>

              <ul className="mb-8 space-y-3 text-sm">
                {service.featureKeys.map((fKey) => (
                  <li key={fKey} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    {t(fKey)}
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className="w-full rounded-lg border border-primary/30 py-3 text-center text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                {t(service.ctaKey)}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
