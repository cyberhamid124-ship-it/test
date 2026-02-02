import React, { useEffect, useState } from 'react';
import { getTopMatches } from '../services/geminiService';
import { MatchSimple } from '../types';
import { CalendarDays, PlayCircle } from 'lucide-react';

interface Props {
  onAnalyze: (home: string, away: string) => void;
}

const TopMatches: React.FC<Props> = ({ onAnalyze }) => {
  const [matches, setMatches] = useState<MatchSimple[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopMatches().then(data => {
      setMatches(data);
      setLoading(false);
    });
  }, []);

  const handleAnalyzeClick = (home: string, away: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onAnalyze(home, away);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-16">
      <div className="flex items-center gap-3 mb-6">
        <CalendarDays className="w-6 h-6 text-emerald-400" />
        <h2 className="text-xl font-bold text-white uppercase tracking-wider">Top 10 Matches Today</h2>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 animate-pulse">Scanning global fixtures...</p>
          </div>
        ) : matches.length === 0 ? (
           <div className="p-12 text-center text-slate-500">No major matches found currently.</div>
        ) : (
          <div className="divide-y divide-slate-800">
            {matches.map((match, idx) => (
              <div key={idx} className="flex items-center justify-between p-5 hover:bg-slate-800/80 transition-all group cursor-default">
                 
                 <div className="flex items-center gap-6 flex-1">
                   <div className="flex flex-col items-center justify-center w-14 bg-slate-950/50 rounded-lg py-2 border border-slate-800">
                     <span className="text-[10px] font-bold text-slate-500 block">TIME</span>
                     <span className="text-emerald-400 font-bold">{match.time}</span>
                   </div>
                   
                   <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-white font-bold text-lg md:text-xl group-hover:text-emerald-400 transition-colors">
                        <span>{match.homeTeam}</span>
                        <span className="text-slate-600 text-sm font-light">vs</span>
                        <span>{match.awayTeam}</span>
                      </div>
                      <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">{match.league}</span>
                   </div>
                 </div>

                 <button 
                   onClick={() => handleAnalyzeClick(match.homeTeam, match.awayTeam)}
                   className="hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-xs font-bold px-4 py-2 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/20 active:scale-95"
                 >
                   <PlayCircle className="w-4 h-4" />
                   Analyze
                 </button>

                 {/* Mobile Arrow */}
                 <button 
                    onClick={() => handleAnalyzeClick(match.homeTeam, match.awayTeam)}
                    className="md:hidden p-2 text-emerald-500"
                 >
                   <PlayCircle className="w-6 h-6" />
                 </button>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopMatches;