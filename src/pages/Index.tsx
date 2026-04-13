import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import HeroHeader from "@/components/HeroHeader";
import ScenarioForm from "@/components/ScenarioForm";
import ResultsDashboard from "@/components/ResultsDashboard";
import EthicalPanel from "@/components/EthicalPanel";
import Recommendation from "@/components/Recommendation";
import InfrastructureMap from "@/components/InfrastructureMap";
import PdfExportButton from "@/components/PdfExportButton";
import { runSimulation, saveSimulationResult } from "@/lib/api";
import { SimulationResponse, ScenarioInput } from "@/types";
import { LogIn, LogOut, User } from "lucide-react";

const Index = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<SimulationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastInput, setLastInput] = useState<ScenarioInput | null>(null);

  const handleSubmit = async (input: ScenarioInput) => {
    setLoading(true);
    setLastInput(input);
    try {
      const res = await runSimulation(input);
      setData(res);
      if (user) {
        await saveSimulationResult(input, res);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroHeader />

      {/* Auth bar */}
      <div className="border-b border-border bg-card px-4 py-2">
        <div className="mx-auto flex max-w-4xl items-center justify-end gap-3">
          {authLoading ? null : user ? (
            <>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                {user.email}
              </span>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
              >
                <LogOut className="h-3 w-3" /> Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-1.5 rounded-lg gradient-accent px-3 py-1.5 text-xs font-medium text-primary-foreground"
            >
              <LogIn className="h-3 w-3" /> Sign In
            </button>
          )}
        </div>
      </div>

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
