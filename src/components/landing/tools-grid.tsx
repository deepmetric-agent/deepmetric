"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Map, Heart, FileText, Lock, X } from "lucide-react";
import { tools } from "@/lib/constants";
import { useTranslations } from "next-intl";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="h-6 w-6" />,
  Map: <Map className="h-6 w-6" />,
  Heart: <Heart className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
};

const toolDescKeys: Record<string, string> = {
  "Power Guide": "power_guide",
  "Route Analyzer": "route_analyzer",
  "HRV Compare": "hrv_compare",
  "CPET Report": "cpet_report",
};

export function ToolsGrid() {
  const t = useTranslations("tools");
  const [modalTool, setModalTool] = useState<string | null>(null);

  return (
    <section id="herramientas" className="bg-muted/30 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-start gap-2">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("title")}
          </h2>
          <div className="h-1 w-20 rounded-full bg-primary" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) =>
            tool.restricted ? (
              <button
                key={tool.name}
                type="button"
                onClick={() => setModalTool(tool.name)}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Restricted badge */}
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  {t("restricted_badge")}
                </span>

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {iconMap[tool.icon]}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold">{tool.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(toolDescKeys[tool.name])}
                  </p>
                </div>

                {/* Link */}
                <div className="mt-auto pt-4">
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-primary transition-all group-hover:gap-2">
                    {t("more")}{" "}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </button>
            ) : (
              <Link
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {iconMap[tool.icon]}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold">{tool.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(toolDescKeys[tool.name])}
                  </p>
                </div>

                {/* Link */}
                <div className="mt-auto pt-4">
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-primary transition-all group-hover:gap-2">
                    {t("more")}{" "}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            )
          )}
        </div>
      </div>

      {/* Restricted Access Modal */}
      {modalTool && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setModalTool(null)}
        >
          <div
            className="relative mx-4 w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalTool(null)}
              className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Lock className="h-7 w-7 text-primary" />
            </div>

            <h3 className="mb-1 text-xl font-black">{t("restricted_title")}</h3>
            <p className="mb-2 text-lg font-semibold text-primary">{modalTool}</p>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              {t("restricted_desc")}
            </p>

            <div className="flex gap-3">
              <Link
                href="#contacto"
                onClick={() => setModalTool(null)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                {t("restricted_contact")}
              </Link>
              <button
                type="button"
                onClick={() => setModalTool(null)}
                className="inline-flex items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-bold transition-colors hover:bg-muted"
              >
                {t("restricted_close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
