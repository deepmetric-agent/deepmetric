"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Activity,
  Smartphone,
  Bluetooth,
  BarChart3,
  FileDown,
  Eye,
  Wind,
  Zap,
  Users,
  Rocket,
  ChevronRight,
  CheckCircle,
  ArrowLeft,
  Shield,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";

const PLAY_STORE_URL = "#";

export default function DeepHRVPage() {
  const t = useTranslations("deephrv");
  const nav = useTranslations("nav");

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground">
      {/* Decorative bg */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            DeepMetric
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-6 pb-24">
        {/* ─── HERO ─── */}
        <section className="pb-16 pt-20 lg:pt-28">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                <Smartphone className="h-3.5 w-3.5" />
                {t("badge")}
              </span>

              <h1 className="mb-2 mt-4 text-5xl font-black tracking-tight lg:text-7xl">
                {t("title")}
              </h1>
              <p className="mb-4 text-xl font-semibold text-primary lg:text-2xl">
                {t("tagline")}
              </p>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
                {t("subtitle")}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl bg-foreground px-6 py-3.5 text-sm font-bold text-background transition-transform hover:scale-105"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="currentColor"
                  >
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302L16.5 14l-2.302-2.302 3.5-2.19zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" />
                  </svg>
                  {t("cta_download")}
                </a>
                <Link
                  href="/#contacto"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 text-sm font-bold transition-colors hover:border-primary hover:text-primary"
                >
                  {t("cta_contact")}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
                <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {t("disclaimer")}
              </p>
            </div>

            {/* Hero graphic — stylized HRV waveform */}
            <div className="flex w-full items-center justify-center lg:w-[380px]">
              <div className="relative flex h-72 w-72 items-center justify-center rounded-3xl border border-border bg-card/50 shadow-2xl lg:h-80 lg:w-80">
                <Heart className="h-28 w-28 text-primary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Activity className="h-20 w-20 text-primary" />
                </div>
                <div className="absolute -bottom-3 -right-3 rounded-2xl border border-border bg-card px-4 py-2 shadow-lg">
                  <span className="text-xs font-bold text-muted-foreground">
                    RMSSD
                  </span>
                  <p className="text-lg font-black text-primary">42.3 ms</p>
                </div>
                <div className="absolute -left-3 -top-3 rounded-2xl border border-border bg-card px-4 py-2 shadow-lg">
                  <span className="text-xs font-bold text-muted-foreground">
                    Readiness
                  </span>
                  <p className="text-lg font-black text-emerald-500">87%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOR WHOM ─── */}
        <section className="pb-16">
          <SectionHeading
            icon={<Users className="h-5 w-5" />}
            title={t("for_title")}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {(["for_1", "for_2", "for_3", "for_4"] as const).map((k) => (
              <div
                key={k}
                className="flex items-start gap-3 rounded-xl border border-border bg-card/50 p-5 transition-colors hover:border-primary/30"
              >
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed">{t(k)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FEATURE SECTIONS ─── */}
        <div className="space-y-16">
          {/* Monitoring */}
          <FeatureSection
            icon={<Bluetooth className="h-5 w-5" />}
            title={t("monitoring_title")}
            items={[t("monitoring_1"), t("monitoring_2"), t("monitoring_3")]}
            accent="cyan"
          />

          {/* Analysis */}
          <FeatureSection
            icon={<BarChart3 className="h-5 w-5" />}
            title={t("analysis_title")}
            items={[
              t("analysis_1"),
              t("analysis_2"),
              t("analysis_3"),
              t("analysis_4"),
            ]}
            accent="violet"
          />

          {/* Visualization */}
          <FeatureSection
            icon={<Eye className="h-5 w-5" />}
            title={t("visualization_title")}
            items={[
              t("visualization_1"),
              t("visualization_2"),
              t("visualization_3"),
              t("visualization_4"),
            ]}
            accent="emerald"
          />

          {/* Integration */}
          <FeatureSection
            icon={<FileDown className="h-5 w-5" />}
            title={t("integration_title")}
            items={[
              t("integration_1"),
              t("integration_2"),
              t("integration_3"),
            ]}
            accent="amber"
          />
        </div>

        {/* ─── COMPETITIVE ADVANTAGE ─── */}
        <section className="mt-20 rounded-2xl border border-primary/20 bg-primary/5 p-8 lg:p-12">
          <div className="mb-6 flex items-center gap-3">
            <Zap className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-black lg:text-3xl">
              {t("advantage_title")}
            </h2>
          </div>
          <p className="mb-6 text-muted-foreground">{t("advantage_desc")}</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {(
              [
                "advantage_1",
                "advantage_2",
                "advantage_3",
                "advantage_4",
              ] as const
            ).map((k) => (
              <li key={k} className="flex items-start gap-3">
                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm font-medium">{t(k)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── PRO EVOLUTION ─── */}
        <section className="mt-16">
          <SectionHeading
            icon={<Rocket className="h-5 w-5" />}
            title={t("pro_title")}
            subtitle={t("pro_desc")}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {(["pro_1", "pro_2", "pro_3", "pro_4"] as const).map((k) => (
              <div
                key={k}
                className="flex items-start gap-3 rounded-xl border border-dashed border-border bg-card/30 p-5"
              >
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary/60" />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {t(k)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── VALUE PROPOSITION ─── */}
        <section className="mt-20 text-center">
          <blockquote className="mx-auto max-w-3xl text-lg font-medium italic leading-relaxed text-muted-foreground lg:text-xl">
            &ldquo;{t("value_proposition")}&rdquo;
          </blockquote>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl bg-foreground px-8 py-4 text-base font-bold text-background transition-transform hover:scale-105"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="currentColor"
              >
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302L16.5 14l-2.302-2.302 3.5-2.19zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" />
              </svg>
              {t("cta_download")}
            </a>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-4 text-base font-bold transition-colors hover:border-primary hover:text-primary"
            >
              {t("cta_contact")}
            </Link>
          </div>

          <p className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5 shrink-0" />
            {t("disclaimer")}
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} DeepMetric.fit —{" "}
          <Link href="/" className="underline hover:text-foreground">
            {nav("tools")}
          </Link>{" "}
          ·{" "}
          <Link href="/blog" className="underline hover:text-foreground">
            Blog
          </Link>
        </p>
      </footer>
    </div>
  );
}

/* ── Reusable sub-components ── */

function SectionHeading({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center gap-3">
        <span className="text-primary">{icon}</span>
        <h2 className="text-2xl font-black lg:text-3xl">{title}</h2>
      </div>
      {subtitle && (
        <p className="ml-8 text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

const accentMap: Record<string, string> = {
  cyan: "border-cyan-500/20 hover:border-cyan-500/40",
  violet: "border-violet-500/20 hover:border-violet-500/40",
  emerald: "border-emerald-500/20 hover:border-emerald-500/40",
  amber: "border-amber-500/20 hover:border-amber-500/40",
};

const dotMap: Record<string, string> = {
  cyan: "bg-cyan-500",
  violet: "bg-violet-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
};

function FeatureSection({
  icon,
  title,
  items,
  accent = "cyan",
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  accent?: string;
}) {
  return (
    <section>
      <SectionHeading icon={icon} title={title} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={i}
            className={`rounded-xl border bg-card/50 p-5 transition-colors ${accentMap[accent] ?? ""}`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotMap[accent] ?? "bg-primary"}`}
              />
              <span className="text-sm leading-relaxed">{item}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
