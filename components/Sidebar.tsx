import React from 'react';
import { 
  Globe, Calendar, Trophy, BarChart2, Users, Radio, 
  CalendarDays, GitCompare, Zap, Shield, TrendingUp, 
  Activity, Award, Stethoscope, Hash, PieChart
} from 'lucide-react';

const menuItems = [
  { label: 'Predictions', icon: <Zap className="w-5 h-5" />, active: true },
  { label: 'Live Score', icon: <Radio className="w-5 h-5 text-red-500 animate-pulse" /> },
  { label: 'Countries', icon: <Globe className="w-5 h-5" /> },
  { label: 'Seasons', icon: <Calendar className="w-5 h-5" /> },
  { label: 'Leagues', icon: <Trophy className="w-5 h-5" /> },
  { label: 'Standings', icon: <Hash className="w-5 h-5" /> },
  { label: 'Teams', icon: <Shield className="w-5 h-5" /> },
  { label: 'Fixtures', icon: <CalendarDays className="w-5 h-5" /> },
  { label: 'Head 2 Head', icon: <GitCompare className="w-5 h-5" /> },
  { label: 'Events', icon: <Activity className="w-5 h-5" /> },
  { label: 'Line Ups', icon: <Users className="w-5 h-5" /> },
  { label: 'Top Scorers', icon: <TrendingUp className="w-5 h-5" /> },
  { label: 'Transfers', icon: <Users className="w-5 h-5" /> },
  { label: 'Trophies', icon: <Award className="w-5 h-5" /> },
  { label: 'Injuries', icon: <Stethoscope className="w-5 h-5" /> },
  { label: 'Statistics', icon: <BarChart2 className="w-5 h-5" /> },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-slate-900 border-r border-slate-800 fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
          MATCH<span className="text-white">ORACLE</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">AI Powered Analytics</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
              ${item.active 
                ? 'bg-slate-800 text-emerald-400 font-medium shadow-lg shadow-black/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
          >
            <span className={`${item.active ? 'text-emerald-400' : 'text-slate-500 group-hover:text-white'}`}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-gradient-to-br from-emerald-900/50 to-slate-900 p-4 rounded-xl border border-emerald-500/20">
          <p className="text-emerald-400 text-xs font-bold uppercase mb-1">Premium</p>
          <p className="text-white text-sm">Get accurate predictions with AI analysis.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;