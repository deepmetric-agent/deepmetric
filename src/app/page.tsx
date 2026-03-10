import { Header, Hero, ToolsGrid, About, Services, Contact, Footer } from "@/components/landing";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Hero />
        <ToolsGrid />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
