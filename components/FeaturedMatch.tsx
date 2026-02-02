import React, { useEffect, useState } from 'react';
import { Trophy, Clock } from 'lucide-react';
import { getFeaturedMatch } from '../services/geminiService';
import { MatchSimple } from '../types';

const FeaturedMatch: React.FC = () => {
  const [match, setMatch] = useState<MatchSimple | null>(null);

  useEffect(() => {
    getFeaturedMatch().then(setMatch);
  }, []);

  if (!match) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
       <div className="flex items-center justify-center gap-2 mb-4">
         <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
         <span className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Match of the Day</span>
       </div>

       <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
             <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">{match.homeTeam}</h3>
             
             <div className="flex flex-col items-center gap-2">
               <div className="bg-slate-950 px-6 py-2 rounded-full border border-slate-800">
                 <span className="text-2xl font-bold text-white font-mono">{match.time}</span>
               </div>
               <span className="text-emerald-500 text-xs font-bold uppercase tracking-wider">{match.league}</span>
             </div>

             <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">{match.awayTeam}</h3>
          </div>
       </div>
    </div>
  );
};

export default FeaturedMatch;