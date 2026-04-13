import { useState } from "react";
import HeroHeader from "@/components/HeroHeader";
import ScenarioForm from "@/components/ScenarioForm";
import ResultsDashboard from "@/components/ResultsDashboard";
import EthicalPanel from "@/components/EthicalPanel";
import Recommendation from "@/components/Recommendation";
import InfrastructureMap from "@/components/InfrastructureMap";
import PdfExportButton from "@/components/PdfExportButton";
import { runSimulation } from "@/lib/api";
import { SimulationResponse, ScenarioInput } from "@/types";

const Index = () => {
  const [data, setData] = useState<SimulationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastInput, setLastInput] = useState<ScenarioInput | null>(null);

  const handleSubmit = async (input: ScenarioInput) => {
    setLoading(true);
    setLastInput(input);
    try {
      const res = await runSimulation(input);
      setData(res);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroHeader />

      <main className="mx-auto max-w-4xl px-4 py-8 space-y-8">
        <ScenarioForm onSubmit={handleSubmit} loading={loading} />

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="space-y-3 text-center">
              <div className="mx-auto h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <p className="text-sm text-muted-foreground">Running simulation…</p>
            </div>
          </div>
        )}

        {data && lastInput && !loading && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Analysis</h2>
              <PdfExportButton data={data} input={lastInput} />
            </div>
            <Recommendation recommendation={data.recommendation} />
            <InfrastructureMap location={lastInput.location} />
            <ResultsDashboard options={data.options} />
            <EthicalPanel options={data.options} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
