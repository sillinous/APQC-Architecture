export interface IndustryBenchmark {
  id: string;
  name: string;
  scores: { [key: string]: number }; // APQC Level ID: Score (1-5)
  avgAgentDensity: number; // Agents per process cluster
  topLevelFocus: string[]; // Level IDs
}

export const industryBenchmarks: IndustryBenchmark[] = [
  {
    id: 'tech',
    name: 'Technology Leaders',
    scores: {
      '1.0': 4.5,
      '2.0': 4.2,
      '3.0': 3.8,
      '4.0': 4.7,
      '5.0': 4.0,
      '6.0': 4.1,
      '7.0': 4.3,
      '8.0': 3.9,
      '9.0': 3.5,
      '10.0': 4.8,
      '11.0': 3.7,
      '12.0': 4.0,
      '13.0': 3.8,
    },
    avgAgentDensity: 12,
    topLevelFocus: ['4.0', '10.0', '1.0']
  },
  {
    id: 'finance',
    name: 'Financial Services',
    scores: {
      '1.0': 3.8,
      '2.0': 3.5,
      '3.0': 3.2,
      '4.0': 4.0,
      '5.0': 3.7,
      '6.0': 3.5,
      '7.0': 3.9,
      '8.0': 4.2,
      '9.0': 4.5,
      '10.0': 4.7,
      '11.0': 3.8,
      '12.0': 4.1,
      '13.0': 3.6,
    },
    avgAgentDensity: 8,
    topLevelFocus: ['9.0', '10.0', '12.0']
  },
  {
    id: 'manufacturing',
    name: 'Global Manufacturing',
    scores: {
      '1.0': 3.2,
      '2.0': 4.5,
      '3.0': 4.7,
      '4.0': 4.2,
      '5.0': 4.1,
      '6.0': 3.8,
      '7.0': 3.5,
      '8.0': 3.2,
      '9.0': 3.0,
      '10.0': 3.5,
      '11.0': 4.2,
      '12.0': 3.5,
      '13.0': 3.2,
    },
    avgAgentDensity: 15,
    topLevelFocus: ['2.0', '3.0', '11.0']
  }
];
