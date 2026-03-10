import { config, collection, singleton, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: { name: "DeepMetric CMS" },
  },
  collections: {
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({
          label: "Publish Date",
          validation: { isRequired: true },
        }),
        locale: fields.select({
          label: "Language",
          options: [
            { label: "Español", value: "es" },
            { label: "English", value: "en" },
          ],
          defaultValue: "es",
        }),
        author: fields.text({
          label: "Author",
          defaultValue: "Luisma",
        }),
        tags: fields.multiselect({
          label: "Tags",
          options: [
            { label: "HRV", value: "hrv" },
            { label: "Cycling", value: "cycling" },
            { label: "Training", value: "training" },
            { label: "Sensors", value: "sensors" },
            { label: "Data Analysis", value: "data-analysis" },
            { label: "Tools", value: "tools" },
            { label: "Research", value: "research" },
            { label: "Coaching", value: "coaching" },
          ],
        }),
        heroImage: fields.image({
          label: "Hero Image",
          directory: "public/images/blog",
          publicPath: "/images/blog/",
        }),
        excerpt: fields.text({
          label: "Excerpt",
          multiline: true,
        }),
        draft: fields.checkbox({
          label: "Draft",
          defaultValue: false,
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          tables: true,
          images: {
            directory: "public/images/blog",
            publicPath: "/images/blog/",
          },
        }),
      },
    }),
    tools: collection({
      label: "Tools",
      slugField: "name",
      path: "src/content/tools/*",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        url: fields.url({ label: "URL" }),
        icon: fields.text({ label: "Icon name (Lucide)" }),
        order: fields.integer({
          label: "Order",
          defaultValue: 0,
        }),
      },
    }),
  },
  singletons: {
    about: singleton({
      label: "About (Luisma)",
      path: "src/content/about",
      schema: {
        bioEs: fields.text({
          label: "Bio (Español)",
          multiline: true,
        }),
        bioEn: fields.text({
          label: "Bio (English)",
          multiline: true,
        }),
        yearsCoaching: fields.integer({
          label: "Years Coaching",
          defaultValue: 10,
        }),
        datasetsAnalyzed: fields.integer({
          label: "Datasets Analyzed",
          defaultValue: 500,
        }),
      },
    }),
  },
});
