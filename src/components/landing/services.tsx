"use client";

import { Dumbbell, Code2, LineChart, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const serviceKeys = [
  {
    icon: <Dumbbell className="h-9 w-9" />,
    titleKey: "coaching_title",
    descKey: "coaching_desc",
    featureKeys: ["coaching_f1", "coaching_f2", "coaching_f3"],
    ctaKey: "coaching_cta",
    highlighted: false,
  },
  {
    icon: <Code2 className="h-9 w-9" />,
    titleKey: "tools_title",
    descKey: "tools_desc",
    featureKeys: ["tools_f1", "tools_f2", "tools_f3"],
    ctaKey: "tools_cta",
    highlighted: true,
  },
  {
    icon: <LineChart className="h-9 w-9" />,
    titleKey: "consulting_title",
    descKey: "consulting_desc",
    featureKeys: ["consulting_f1", "consulting_f2", "consulting_f3"],
    ctaKey: "consulting_cta",
    highlighted: false,
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {serviceKeys.map((service) => (
            <div
              key={service.titleKey}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8 transition-all",
                service.highlighted
                  ? "border-2 border-primary bg-card"
                  : "border-border bg-card hover:bg-muted/50"
              )}
            >
              {service.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[10px] font-black uppercase text-primary-foreground">
                  {t("popular")}
                </div>
              )}

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

              <button
                className={cn(
                  "w-full rounded-lg py-3 text-sm font-bold transition-all",
                  service.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                )}
              >
                {t(service.ctaKey)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
