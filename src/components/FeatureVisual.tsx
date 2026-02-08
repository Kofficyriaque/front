import React from 'react';
import { Rocket, Flame, MapPin, ArrowRight, Layers } from 'lucide-react';

export const FeatureVisual: React.FC<{ type: string; color: string }> = ({ type, color }) => {
  const baseClass = `w-5/6 h-5/6 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 flex flex-col group-hover:scale-105 transition-all duration-700 overflow-hidden relative`;

  // Helpers to avoid dynamic Tailwind classnames
  const overlayFromColor = (c: string) => {
    const map: Record<string, string> = {
      blue: 'bg-gradient-to-br from-blue-50/50 to-transparent',
      indigo: 'bg-gradient-to-br from-indigo-50/50 to-transparent',
      amber: 'bg-gradient-to-br from-amber-50/50 to-transparent',
      cyan: 'bg-gradient-to-br from-cyan-50/50 to-transparent',
      slate: 'bg-gradient-to-br from-slate-50/50 to-transparent',
      green: 'bg-gradient-to-br from-green-50/50 to-transparent',
    };
    return map[c] || map.blue;
  };

  const textColor = (c: string) => {
    const map: Record<string, string> = {
      blue: 'text-blue-600',
      slate: 'text-slate-600',
      indigo: 'text-indigo-600',
      cyan: 'text-cyan-600',
      amber: 'text-amber-600',
      green: 'text-green-600',
    };
    return map[c] || 'text-slate-600';
  };

  const hoverBorderColor = (c: string) => {
    const map: Record<string, string> = {
      blue: 'hover:border-blue-200',
      slate: 'hover:border-slate-200',
      indigo: 'hover:border-indigo-200',
      cyan: 'hover:border-cyan-200',
      amber: 'hover:border-amber-200',
      green: 'hover:border-green-200',
    };
    return map[c] || 'hover:border-slate-200';
  };

  // Case/locale-insensitive matcher
  const isType = (keywords: string[]) => keywords.some(k => type.toLowerCase().includes(k.toLowerCase()));

  const renderUI = () => {
    // 1. SALARY ESTIMATION
    if (isType(['estimer', 'estimate', 'salarial', 'benchmarking'])) {
      return (
        <div className="space-y-8 h-full flex flex-col">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="h-3 w-20 bg-slate-100 rounded-full"></div>
              <div className="text-5xl font-black text-slate-900 tracking-tighter">68.5k<span className="text-xl text-blue-500 font-bold">€</span></div>
            </div>
            <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black animate-pulse">MARCHÉ HAUT</div>
          </div>
          
          <div className="flex-grow flex items-end gap-2">
            {[40, 60, 45, 90, 65, 80, 50].map((h, i) => (
              <div key={i} style={{ height: `${h}%` }} className={`flex-1 rounded-t-lg transition-all duration-1000 ${i === 3 ? 'bg-blue-600 shadow-lg shadow-blue-200' : 'bg-slate-50'}`}></div>
            ))}
          </div>
          
          <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-900">
                <Rocket className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
                <div className="h-1.5 w-10 bg-slate-100 rounded-full"></div>
              </div>
            </div>
            <div className="text-[10px] font-black text-blue-600">CONFIDENCE 98%</div>
          </div>
        </div>
      );
    }

    // 2. COMPARE OFFERS
    if (isType(['comparer', 'compare', 'attractivité', 'evaluation'])) {
      return (
        <div className="h-full flex flex-col gap-6">
          <div className="text-center">
             <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">Duel d'offres</div>
          </div>
          <div className="flex gap-4 flex-grow">
            {/* Offre A */}
            <div className="flex-1 bg-blue-600 rounded-3xl p-5 text-white flex flex-col justify-between shadow-xl shadow-blue-100">
               <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold">A</div>
               <div>
                 <div className="text-2xl font-black">88%</div>
                 <div className="text-[8px] font-bold opacity-60 uppercase">Match Score</div>
               </div>
               <div className="space-y-2">
                  <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-white"></div>
                  </div>
                  <div className="text-[8px] font-black">AVANTAGES +++</div>
               </div>
            </div>
            {/* Offre B */}
            <div className="flex-1 bg-slate-900 rounded-3xl p-5 text-white flex flex-col justify-between">
               <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold">B</div>
               <div>
                 <div className="text-2xl font-black text-blue-400">72%</div>
                 <div className="text-[8px] font-bold opacity-60 uppercase">Match Score</div>
               </div>
               <div className="space-y-2">
                  <div className="h-1 w-full bg-white/10 rounded-full"></div>
                  <div className="text-[8px] font-black opacity-40">SALAIRE MOYEN</div>
               </div>
            </div>
          </div>
          <div className="h-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400">ANALYSE COMPARATIVE IA ACTIVE</div>
        </div>
      );
    }

    // 3. PROFITABLE SKILLS
    if (isType(['compétences', 'rentables', 'skills', 'detection'])) {
      const cards = [
        { n: 'React Native', v: '+18%', c: 'blue' },
        { n: 'AWS Cloud', v: '+24%', c: 'slate' },
        { n: 'Kubernetes', v: '+15%', c: 'indigo' },
        { n: 'Go Lang', v: '+12%', c: 'cyan' },
        { n: 'Gen AI', v: '+32%', c: 'amber' },
        { n: 'Python', v: '+10%', c: 'green' },
      ];
      return (
        <div className="space-y-6">
           <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5" />
             </div>
             <div className="text-sm font-black text-slate-900">Trending Technologies</div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {cards.map((s, i) => (
              <div key={i} className={`p-3 bg-white border border-slate-100 rounded-2xl shadow-sm transition-colors ${hoverBorderColor(s.c)}`}>
                <div className="text-[8px] font-black text-slate-400 uppercase mb-1">{s.n}</div>
                <div className={`text-sm font-black ${textColor(s.c)}`}>{s.v}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
             <div className="text-[9px] font-black text-blue-900 mb-2 italic">ASTUCE CARRIÈRE</div>
             <div className="h-2 w-full bg-white/50 rounded-full mb-1"></div>
             <div className="h-2 w-2/3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      );
    }

    // 4. REGIONAL EXPLORER
    if (isType(['région', 'marché', 'region', 'market'])) {
      return (
        <div className="h-full flex flex-col">
          <div className="relative flex-grow bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden p-6">
             <div className="absolute top-0 right-0 p-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
             </div>
             
             <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-blue-50">
                   <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-[10px] font-bold">Paris, FR</div>
                   </div>
                   <div className="text-[10px] font-black text-blue-600">65k€</div>
                </div>
                
                <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm opacity-50">
                   <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-[10px] font-bold">Lyon, FR</div>
                   </div>
                   <div className="text-[10px] font-black text-slate-900">52k€</div>
                </div>

                <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm opacity-30">
                   <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-[10px] font-bold">Bordeaux, FR</div>
                   </div>
                   <div className="text-[10px] font-black text-slate-900">48k€</div>
                </div>
             </div>
             
             <div className="absolute bottom-4 left-6 right-6">
                <div className="h-10 bg-blue-600 rounded-xl flex items-center justify-center text-[10px] font-black text-white gap-2">
                  <ArrowRight className="w-4 h-4" /> VOIR LE POUVOIR D'ACHAT
                </div>
             </div>
          </div>
        </div>
      );
    }

    return (
      <div className="m-auto text-slate-100 text-6xl opacity-10 flex flex-col items-center gap-4">
        <Layers className="w-12 h-12" />
        <div className="text-xs font-black uppercase tracking-widest">Preview Mode</div>
      </div>
    );
  };

  return (
    <>
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${overlayFromColor(color)}`}></div>
      <div className={baseClass}>{renderUI()}</div>
    </>
  );
};
