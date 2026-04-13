import { Lightbulb } from "lucide-react";

interface Props {
  recommendation: string;
}

export default function Recommendation({ recommendation }: Props) {
  return (
    <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
      <div className="rounded-2xl border border-primary/20 bg-aqua-light p-5 shadow-card">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Lightbulb className="h-4 w-4 text-primary-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Recommended Action</h2>
        </div>
        <p className="text-sm leading-relaxed text-foreground/80">{recommendation}</p>
      </div>
    </div>
  );
}
