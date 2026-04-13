import { SimulationResponse, ScenarioInput } from "@/types";
import { FileDown } from "lucide-react";

interface Props {
  data: SimulationResponse;
  input: ScenarioInput;
}

export default function PdfExportButton({ data, input }: Props) {
  const handleExport = () => {
    const content = generateReportHtml(data, input);
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    
    const printWindow = window.open(url, "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-card transition-all hover:shadow-elevated"
    >
      <FileDown className="h-4 w-4 text-primary" />
      Export Report
    </button>
  );
}

function generateReportHtml(data: SimulationResponse, input: ScenarioInput): string {
  const optionRows = data.options
    .map(
      (opt) => `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #e5e7eb;font-weight:500">${opt.name}</td>
      <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:center">${opt.score}</td>
      <td style="padding:8px;border-bottom:1px solid #e5e7eb">${opt.risk}</td>
      <td style="padding:8px;border-bottom:1px solid #e5e7eb;font-size:13px">${opt.ethics.equity}</td>
      <td style="padding:8px;border-bottom:1px solid #e5e7eb;font-size:13px">${opt.ethics.sustainability}</td>
    </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html><head><title>Aquanexus Report — ${input.location}</title>
<style>
  body{font-family:Inter,system-ui,sans-serif;margin:40px;color:#1e293b;line-height:1.6}
  h1{color:#1a6fb5;margin-bottom:4px}
  h2{color:#0f7490;margin-top:28px}
  table{width:100%;border-collapse:collapse;margin-top:12px}
  th{background:#f0f9ff;padding:10px 8px;text-align:left;font-size:13px;border-bottom:2px solid #bae6fd}
  .meta{color:#64748b;font-size:14px}
  .rec{background:#f0fdfa;border-left:4px solid #14b8a6;padding:16px;border-radius:8px;margin-top:12px}
  @media print{body{margin:20px}}
</style></head><body>
<h1>🌊 Aquanexus Simulation Report</h1>
<p class="meta">Location: <strong>${input.location}</strong> · Population: <strong>${input.population.toLocaleString()}</strong> · Budget: <strong>KES ${input.budget.toLocaleString()}</strong> · Horizon: <strong>${input.timeHorizon} years</strong></p>
<p class="meta">Generated: ${new Date().toLocaleDateString()}</p>

<h2>Recommended Action</h2>
<div class="rec">${data.recommendation}</div>

<h2>Options Analysis</h2>
<table>
<thead><tr><th>Option</th><th>Score</th><th>Risk</th><th>Equity</th><th>Sustainability</th></tr></thead>
<tbody>${optionRows}</tbody>
</table>

<h2>Constraints</h2>
<p>${input.constraints.join(", ")}</p>

<h2>Decision Types Evaluated</h2>
<p>${input.decisionType.join(", ")}</p>

<p style="margin-top:40px;color:#94a3b8;font-size:12px;border-top:1px solid #e5e7eb;padding-top:12px">Aquanexus — AI-powered water management decision platform</p>
</body></html>`;
}
