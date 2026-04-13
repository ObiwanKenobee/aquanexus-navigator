import { ScenarioInput, SimulationResponse } from "@/types";

// Mock simulation for MVP — replace with real API call later
export async function runSimulation(
  data: ScenarioInput
): Promise<SimulationResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Generate mock results based on input
  const budgetFactor = data.budget / 1000000;
  const popFactor = data.population / 100000;

  return {
    recommendation: `Based on analysis for ${data.location} serving ${data.population.toLocaleString()} people over ${data.timeHorizon} years, a combined borehole + treatment approach offers the best balance of cost efficiency (KES ${(data.budget * 0.7).toLocaleString()}), equity coverage, and long-term sustainability.`,
    options: [
      {
        name: "Borehole Network",
        score: Math.min(92, Math.round(75 + budgetFactor * 5 - popFactor * 2)),
        risk: "Low",
        ethics: {
          equity: "High — distributes access across rural communities",
          sustainability: "Medium — dependent on groundwater recharge rates",
        },
      },
      {
        name: "Pipeline Extension",
        score: Math.min(88, Math.round(68 + budgetFactor * 6)),
        risk: "Medium",
        ethics: {
          equity: "Medium — benefits areas along pipeline corridor",
          sustainability: "High — long-term infrastructure with low maintenance",
        },
      },
      {
        name: "Water Treatment Plant",
        score: Math.min(85, Math.round(60 + budgetFactor * 8 - popFactor)),
        risk: "Medium-High",
        ethics: {
          equity: "High — centralized purification for dense populations",
          sustainability: "High — reduces waterborne disease burden by 70%",
        },
      },
    ],
  };
}
