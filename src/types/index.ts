export interface ScenarioInput {
  location: string;
  decisionType: string[];
  budget: number;
  population: number;
  constraints: string[];
  timeHorizon: number;
}

export interface OptionResult {
  name: string;
  score: number;
  risk: string;
  ethics: {
    equity: string;
    sustainability: string;
  };
}

export interface SimulationResponse {
  recommendation: string;
  options: OptionResult[];
}
