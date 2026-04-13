import { OptionResult } from "@/types";
import { Scale, Leaf, Heart } from "lucide-react";

interface Props {
  options: OptionResult[];
}

export default function EthicalPanel({ options }: Props) {
  return (
    <div className="space-y-4 animate-fade-up" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center gap-3">
        <Scale className="h-5 w-5 text-teal" />
        <h2 className="text-lg font-semibold text-foreground">Ethical Assessment</h2>
      </div>

      <div className="space-y-3">
        {options.map((opt) => (
          <div
            key={opt.name}
            className="rounded-xl border border-border bg-card p-4 shadow-card space-y-3"
          >
            <h3 className="text-sm font-semibold text-foreground">{opt.name}</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Heart className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Equity</span>
                  <p className="text-sm text-foreground">{opt.ethics.equity}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Sustainability</span>
                  <p className="text-sm text-foreground">{opt.ethics.sustainability}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
