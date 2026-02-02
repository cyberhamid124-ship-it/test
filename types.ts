export interface TeamData {
  name: string;
  logo: string;
}

export interface MatchResultItem {
  result: 'W' | 'D' | 'L';
  score: string;
  opponent: string;
}

export interface H2HItem {
  homeScore: number;
  awayScore: number;
  date: string; // or year
}

export interface PredictionData {
  winner: 'Home' | 'Away' | 'Draw';
  homeTeam: TeamData;
  awayTeam: TeamData;
  scorePrediction: string;
  reasoning: string; // Arabic
  confidence: number;
  
  // New Stats
  homeForm: MatchResultItem[];       // Last 5 Overall
  awayForm: MatchResultItem[];       // Last 5 Overall
  homeHomeForm: MatchResultItem[];   // Last 5 on Home Land
  awayAwayForm: MatchResultItem[];   // Last 5 on Away Land
  h2h: H2HItem[];                    // Last 5 Head to Head
}

export interface MatchSimple {
  homeTeam: string;
  awayTeam: string;
  time: string;
  league: string;
}