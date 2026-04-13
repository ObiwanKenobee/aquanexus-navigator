import { Droplets } from "lucide-react";

export default function HeroHeader() {
  return (
    <header className="gradient-hero px-6 py-12 text-center">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="relative">
            <Droplets className="h-10 w-10 text-primary-foreground" />
            <div className="absolute inset-0 rounded-full bg-primary-foreground/20 animate-ripple" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Aquanexus
          </h1>
        </div>
        <p className="text-base text-primary-foreground/80">
          AI-powered water management decision platform — simulate, analyze, and act with ethical clarity.
        </p>
      </div>
    </header>
  );
}
