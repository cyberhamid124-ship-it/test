import React, { useState, useEffect } from 'react';
import { Search, Zap } from 'lucide-react';

interface MatchInputProps {
  onAnalyze: (home: string, away: string) => void;
  isLoading: boolean;
}

const MatchInput: React.FC<MatchInputProps> = ({ onAnalyze, isLoading }) => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeTeam && awayTeam) {
      onAnalyze(homeTeam, awayTeam);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div className="flex items-center gap-3 mb-8">
           <div className="p-3 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20">
             <Zap className="w-6 h-6 text-white fill-white" />
           </div>
           <div>
             <h2 className="text-2xl font-bold text-white">AI Prediction Engine</h2>
             <p className="text-slate-400 text-sm">Enter clubs for instant analysis & score prediction</p>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
          
          <div className="relative w-full group">
            <input
              type="text"
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              placeholder="Home Team (e.g. Real Madrid)"
              className="w-full bg-slate-950/50 border border-slate-600 text-white pl-6 pr-4 py-5 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600 font-bold text-lg"
            />
          </div>

          <div className="text-slate-600 font-black text-2xl italic px-2">VS</div>

          <div className="relative w-full group">
            <input
              type="text"
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              placeholder="Away Team (e.g. Barcelona)"
              className="w-full bg-slate-950/50 border border-slate-600 text-white pl-6 pr-4 py-5 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-slate-600 font-bold text-lg"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !homeTeam || !awayTeam}
            className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-10 py-5 rounded-2xl font-black text-lg shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 whitespace-nowrap"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                CALCULATING...
              </span>
            ) : 'PREDICT NOW'}
          </button>
        </form>
        
        {isLoading && (
           <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white font-bold animate-pulse">Analyzing Matches & Stats...</p>
              <p className="text-slate-400 text-xs mt-2">Checking Last 5 Matches & Head-to-Head...</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default MatchInput;