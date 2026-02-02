import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import MatchInput from './components/MatchInput';
import PredictionResult from './components/PredictionResult';
import FeaturedMatch from './components/FeaturedMatch';
import TopMatches from './components/TopMatches';
import { analyzeMatch } from './services/geminiService';
import { PredictionData } from './types';

const App: React.FC = () => {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(false);
  
  // State to auto-fill input when clicking from top matches
  const [inputHome, setInputHome] = useState('');
  const [inputAway, setInputAway] = useState('');

  const handleAnalyze = async (home: string, away: string) => {
    // Update inputs visually if triggered from list
    setInputHome(home);
    setInputAway(away);

    setLoading(true);
    setPrediction(null);
    try {
      const result = await analyzeMatch(home, away);
      setPrediction(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
      
      {/* Simple Header */}
      <header className="py-8 text-center border-b border-slate-900 bg-slate-950/50 backdrop-blur sticky top-0 z-50">
        <h1 className="text-3xl font-black tracking-tighter text-white">
          MATCH<span className="text-emerald-500">ORACLE</span>
        </h1>
      </header>

      <main className="p-4 md:p-8">
        
        {/* Section 1: Featured Match */}
        <FeaturedMatch />

        {/* Section 2: The Calculator */}
        {/* We can improve MatchInput to accept props for controlled inputs if needed, 
            but for now the logic is handled by handleAnalyze triggering the API.
            Ideally, we would lift state up for input values too, but to keep it simple and fast: */}
        <div className="w-full max-w-4xl mx-auto mb-12 relative">
             {/* Overlay input logic is handled inside MatchInput usually, 
                 but since we want the 'Analyze' button to trigger it, we just show the loader */}
             <MatchInput onAnalyze={handleAnalyze} isLoading={loading} />
        </div>

        {/* Section 3: Results (Conditional) */}
        {prediction && <PredictionResult data={prediction} />}

        {/* Section 4: Top 10 List */}
        <TopMatches onAnalyze={handleAnalyze} />

      </main>

      <footer className="text-center py-12 text-slate-600 text-sm">
        Powered by Gemini AI • Real-Time Stats
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;