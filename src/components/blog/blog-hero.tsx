export function BlogHero() {
  return (
    <section className="mb-12">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <h1 className="mb-4 text-4xl font-black leading-tight md:text-5xl">
            DeepMetric Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Deep dives into Heart Rate Variability, cycling performance metrics,
            and the future of data-driven endurance athletics.
          </p>
        </div>
      </div>
    </section>
  );
}
