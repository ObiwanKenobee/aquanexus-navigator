import { useState } from "react";
import { ScenarioInput } from "@/types";
import { Droplets, MapPin, Users, Wallet, Clock, Zap } from "lucide-react";

interface Props {
  onSubmit: (data: ScenarioInput) => void;
  loading: boolean;
}

const DECISION_TYPES = ["Borehole", "Pipeline", "Treatment", "Rainwater Harvesting"];
const CONSTRAINTS = ["Scarcity", "Contamination", "Infrastructure Gap", "Budget Limit"];

export default function ScenarioForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<ScenarioInput>({
    location: "Nakuru",
    decisionType: ["Borehole", "Pipeline", "Treatment"],
    budget: 5000000,
    population: 100000,
    constraints: ["Scarcity"],
    timeHorizon: 5,
  });

  const toggleItem = (key: "decisionType" | "constraints", item: string) => {
    const current = form[key];
    setForm({
      ...form,
      [key]: current.includes(item)
        ? current.filter((i) => i !== item)
        : [...current, item],
    });
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-accent">
          <Droplets className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Scenario Configuration</h2>
          <p className="text-sm text-muted-foreground">Define your water management scenario</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <MapPin className="h-4 w-4 text-primary" /> Location
          </label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring focus:ring-2 transition-shadow"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Wallet className="h-4 w-4 text-primary" /> Budget (KES)
          </label>
          <input
            type="number"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring focus:ring-2 transition-shadow"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Users className="h-4 w-4 text-primary" /> Population Served
          </label>
          <input
            type="number"
            value={form.population}
            onChange={(e) => setForm({ ...form, population: Number(e.target.value) })}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring focus:ring-2 transition-shadow"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Clock className="h-4 w-4 text-primary" /> Time Horizon (years)
          </label>
          <input
            type="number"
            value={form.timeHorizon}
            onChange={(e) => setForm({ ...form, timeHorizon: Number(e.target.value) })}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring focus:ring-2 transition-shadow"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Decision Types</label>
        <div className="flex flex-wrap gap-2">
          {DECISION_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => toggleItem("decisionType", type)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                form.decisionType.includes(type)
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Constraints</label>
        <div className="flex flex-wrap gap-2">
          {CONSTRAINTS.map((c) => (
            <button
              key={c}
              onClick={() => toggleItem("constraints", c)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                form.constraints.includes(c)
                  ? "bg-teal text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onSubmit(form)}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl gradient-accent py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:opacity-60"
      >
        <Zap className="h-4 w-4" />
        {loading ? "Running Simulation…" : "Run Simulation"}
      </button>
    </div>
  );
}
