import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PredictionData, MatchSimple } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelName = 'gemini-3-flash-preview';

// --- Schemas ---

const matchResultSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    result: { type: Type.STRING, enum: ['W', 'D', 'L'] },
    score: { type: Type.STRING },
    opponent: { type: Type.STRING }
  },
  required: ['result', 'score', 'opponent']
};

const predictionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    winner: { type: Type.STRING, enum: ['Home', 'Away', 'Draw'] },
    homeTeam: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        logo: { type: Type.STRING }
      }
    },
    awayTeam: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        logo: { type: Type.STRING }
      }
    },
    scorePrediction: { type: Type.STRING },
    reasoning: { type: Type.STRING, description: "Detailed analysis in ARABIC." },
    confidence: { type: Type.INTEGER },
    
    // Detailed Stats
    homeForm: { type: Type.ARRAY, items: matchResultSchema, description: "Last 5 matches overall" },
    awayForm: { type: Type.ARRAY, items: matchResultSchema, description: "Last 5 matches overall" },
    homeHomeForm: { type: Type.ARRAY, items: matchResultSchema, description: "Last 5 matches PLAYED AT HOME" },
    awayAwayForm: { type: Type.ARRAY, items: matchResultSchema, description: "Last 5 matches PLAYED AWAY" },
    h2h: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          homeScore: { type: Type.INTEGER },
          awayScore: { type: Type.INTEGER },
          date: { type: Type.STRING }
        },
        required: ['homeScore', 'awayScore', 'date']
      }
    }
  },
  required: ['winner', 'homeTeam', 'awayTeam', 'scorePrediction', 'reasoning', 'confidence', 'homeForm', 'awayForm', 'homeHomeForm', 'awayAwayForm', 'h2h']
};

const topMatchesSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      homeTeam: { type: Type.STRING },
      awayTeam: { type: Type.STRING },
      time: { type: Type.STRING },
      league: { type: Type.STRING },
    },
    required: ['homeTeam', 'awayTeam', 'time', 'league']
  }
};

// --- API Functions ---

export const analyzeMatch = async (home: string, away: string): Promise<PredictionData> => {
  try {
    const prompt = `Analyze the football match between ${home} and ${away}.
    
    1. Determine the likely winner and exact score.
    2. Provide a short, smart analysis in ARABIC.
    3. Find Official Logos.
    4. GET REAL HISTORICAL DATA (Use Google Search):
       - Last 5 matches for ${home} (Overall)
       - Last 5 matches for ${away} (Overall)
       - Last 5 matches for ${home} PLAYED AT HOME ("on their land")
       - Last 5 matches for ${away} PLAYED AWAY
       - Last 5 Head-to-Head matches between ${home} vs ${away}
    
    Be accurate with scores and results.`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: predictionSchema,
      },
    });

    const jsonText = response.text || "{}";
    return JSON.parse(jsonText) as PredictionData;
  } catch (error) {
    console.error("Analysis Failed", error);
    throw error;
  }
};

export const getTopMatches = async (): Promise<MatchSimple[]> => {
  try {
    const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    // Optimized prompt to mimic the user's scraping logic
    const prompt = `Find the football fixtures for TODAY, ${today}. 
    List the top 10 most important matches from major leagues (Premier League, La Liga, Serie A, Bundesliga, Champions League, etc).
    Return them with accurate times.`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: topMatchesSchema,
      },
    });

    const jsonText = response.text || "[]";
    return JSON.parse(jsonText) as MatchSimple[];
  } catch (error) {
    console.error("Fetch Top Matches Failed", error);
    return [];
  }
};

export const getFeaturedMatch = async (): Promise<MatchSimple> => {
  const list = await getTopMatches();
  return list.length > 0 ? list[0] : { homeTeam: "Loading", awayTeam: "Loading", time: "--:--", league: "..." };
};