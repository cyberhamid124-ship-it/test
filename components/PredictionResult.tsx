import React from 'react';
import { PredictionData, MatchResultItem } from '../types';
import { Trophy, CheckCircle2, TrendingUp, Swords, MapPin } from 'lucide-react';

interface Props {
  data: PredictionData;
}

const FormBadge: React.FC<{ item: MatchResultItem }> = ({ item }) => {
  const color = item.result === 'W' ? 'bg-emerald-500 text-emerald-950' : 
                item.result === 'D' ? 'bg-slate-500 text-slate-900' : 
                'bg-red-500 text-red-950';
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-xs ${color}`}>
        {item.result}
      </div>
      <span className="text-[10px] text-slate-500 truncate max-w-[60px]">{item.opponent}</span>
      <span className="text-[10px] text-slate-400">{item.score}</span>
    </div>
  );
};

interface FormSectionProps {
  title: string;
  homeData: MatchResultItem[];
  awayData: MatchResultItem[];
  homeName: string;
  awayName: string;
  icon: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, homeData, awayData, homeName, awayName, icon }) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
    <h3 className="text-slate-300 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
      {icon} {title}
    </h3>
    
    <div className="space-y-6">
      {/* Home Row */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-white font-medium w-24 truncate">{homeName}</span>
        <div className="flex gap-2 flex-1 justify-end">
          {homeData.map((m: MatchResultItem, i: number) => <FormBadge key={i} item={m} />)}
        </div>
      </div>
      {/* Divider */}
      <div className="h-px bg-slate-700/50 w-full"></div>
      {/* Away Row */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-white font-medium w-24 truncate">{awayName}</span>
        <div className="flex gap-2 flex-1 justify-end">
          {awayData.map((m: MatchResultItem, i: number) => <FormBadge key={i} item={m} />)}
        </div>
      </div>
    </div>
  </div>
);

const PredictionResult: React.FC<Props> = ({ data }) => {
  const isHomeWinner = data.winner === 'Home';
  const isAwayWinner = data.winner === 'Away';

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in mb-12 space-y-6">
      
      {/* Main Result Card */}
      <div className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden relative shadow-2xl">
        {/* Header */}
        <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
           <div className="flex items-center gap-2">
             <Trophy className="w-5 h-5 text-yellow-400" />
             <span className="text-slate-300 font-bold uppercase tracking-widest text-sm">AI Result</span>
           </div>
           <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
             {data.confidence}% Confidence
           </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col items-center">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 mb-10">
            {/* Home Team */}
            <div className={`flex flex-col items-center gap-4 flex-1 ${isHomeWinner ? 'scale-110 transition-transform' : 'opacity-80'}`}>
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full p-4 flex items-center justify-center shadow-xl">
                 <img src={data.homeTeam.logo} alt={data.homeTeam.name} className="w-full h-full object-contain" onError={(e) => e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/1165/1165187.png'} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white text-center">{data.homeTeam.name}</h3>
              {isHomeWinner && <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500 rounded px-2 py-1">Winner</span>}
            </div>

            {/* Score */}
            <div className="flex flex-col items-center z-10">
              <div className="text-6xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl">
                {data.scorePrediction}
              </div>
              <span className="text-slate-500 font-bold uppercase tracking-widest text-sm mt-2">Final Score</span>
            </div>

            {/* Away Team */}
            <div className={`flex flex-col items-center gap-4 flex-1 ${isAwayWinner ? 'scale-110 transition-transform' : 'opacity-80'}`}>
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full p-4 flex items-center justify-center shadow-xl">
                 <img src={data.awayTeam.logo} alt={data.awayTeam.name} className="w-full h-full object-contain" onError={(e) => e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/1165/1165187.png'} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white text-center">{data.awayTeam.name}</h3>
              {isAwayWinner && <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500 rounded px-2 py-1">Winner</span>}
            </div>
          </div>

          {/* Analysis (Arabic) */}
          <div className="w-full bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-700 relative mb-8">
             <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-emerald-500 text-slate-900 p-2 rounded-lg shadow-lg">
                <CheckCircle2 className="w-5 h-5" />
             </div>
             <p className="text-right text-lg md:text-xl text-slate-200 leading-relaxed font-medium" dir="rtl">
               {data.reasoning}
             </p>
          </div>
        </div>
      </div>

      {/* Detailed Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Recent Form (Overall) */}
        <FormSection 
          title="Last 5 Matches (Overall)" 
          icon={<TrendingUp className="w-4 h-4 text-emerald-400" />}
          homeName={data.homeTeam.name}
          awayName={data.awayTeam.name}
          homeData={data.homeForm}
          awayData={data.awayForm}
        />

        {/* Specific Form (Home vs Away) */}
        <FormSection 
          title="On His Land (Home vs Away)" 
          icon={<MapPin className="w-4 h-4 text-emerald-400" />}
          homeName={data.homeTeam.name}
          awayName={data.awayTeam.name}
          homeData={data.homeHomeForm} // Specific home form
          awayData={data.awayAwayForm} // Specific away form
        />
      </div>

      {/* Head to Head */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-slate-300 font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
           <Swords className="w-4 h-4 text-red-400" /> Last 5 Head to Head
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {data.h2h.map((match, i) => (
            <div key={i} className="flex items-center justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
              <span className="w-1/3 text-right text-slate-400 text-sm truncate">{data.homeTeam.name}</span>
              <div className="flex flex-col items-center w-1/3">
                 <span className="text-white font-black text-lg tracking-widest">{match.homeScore} - {match.awayScore}</span>
                 <span className="text-[10px] text-slate-600">{match.date}</span>
              </div>
              <span className="w-1/3 text-left text-slate-400 text-sm truncate">{data.awayTeam.name}</span>
            </div>
          ))}
          {data.h2h.length === 0 && <div className="text-center text-slate-500 text-sm">No recent H2H data available.</div>}
        </div>
      </div>

    </div>
  );
};

export default PredictionResult;