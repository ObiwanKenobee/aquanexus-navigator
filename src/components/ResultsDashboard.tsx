import { OptionResult } from "@/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

interface Props {
  options: OptionResult[];
}

const COLORS = ["hsl(205, 85%, 45%)", "hsl(170, 65%, 45%)", "hsl(195, 90%, 50%)"];

const riskIcon = (risk: string) => {
  if (risk === "Low") return <CheckCircle className="h-4 w-4 text-success" />;
  if (risk === "Medium") return <AlertTriangle className="h-4 w-4 text-warning" />;
  return <AlertTriangle className="h-4 w-4 text-destructive" />;
};

export default function ResultsDashboard({ options }: Props) {
  const chartData = options.map((o) => ({ name: o.name, score: o.score }));

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Simulation Results</h2>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 25%, 90%)" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(210, 15%, 50%)" }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "hsl(210, 15%, 50%)" }} />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid hsl(210, 25%, 90%)",
                boxShadow: "0 4px 16px hsl(210 50% 10% / 0.08)",
              }}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {options.map((opt, i) => (
          <div
            key={opt.name}
            className="rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:shadow-elevated"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">{opt.name}</span>
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-primary-foreground"
                style={{ background: COLORS[i % COLORS.length] }}
              >
                {opt.score}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              {riskIcon(opt.risk)}
              <span>Risk: {opt.risk}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
