import React from 'react';

export const FeatureVisual: React.FC<{ type: string; color: string }> = ({ type, color }) => {
   const baseClass = `w-full h-full bg-white rounded-2xl shadow-lg border border-slate-100 p-4 sm:p-8 flex flex-col items-center sm:items-stretch group-hover:scale-105 transition-all duration-500 overflow-hidden relative`;

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



  // Case/locale-insensitive matcher
  const isType = (keywords: string[]) => keywords.some(k => type.toLowerCase().includes(k.toLowerCase()));

  const renderUI = () => {
    // 1. SALARY ORBIT GAUGE
    if (isType(['estimer', 'estimate', 'salarial', 'benchmarking'])) {
      return (
        <div className="h-full w-full flex flex-col items-center justify-around gap-1 p-2">
          <div className="text-center w-full mt-1">
            <div className="text-[8px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">Précision : 98.2%</div>
            <div className="h-0.5 w-20 bg-blue-100 mx-auto rounded-full overflow-hidden">
               <div className="h-full w-full bg-blue-600 animate-pulse"></div>
            </div>
          </div>
          
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center flex-shrink-0">
             <div className="absolute inset-2 border-2 border-blue-200 rounded-full"></div>
             <div className="absolute inset-0 border-4 border-blue-600 rounded-full" style={{ clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 50%)' }}></div>
             {[...Array(6)].map((_, i) => (
               <div key={i} className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                 style={{ top: `${50 + 32 * Math.sin(i * 60 * Math.PI / 180)}%`, left: `${50 + 32 * Math.cos(i * 60 * Math.PI / 180)}%`, animationDelay: `${i * 0.3}s` }}
               ></div>
             ))}
             <div className="text-center z-10">
                <div className="text-[8px] sm:text-[7px] font-black text-slate-400 uppercase">Estimation</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">75<span className="text-lg text-blue-600">k</span></div>
             </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-2">
             <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[7px] font-black text-slate-400 uppercase">Base</div>
                <div className="text-xs font-black text-slate-900">68.2k</div>
             </div>
             <div className="p-2 bg-slate-900 rounded-lg">
                <div className="text-[7px] font-black text-blue-300 uppercase">Bonus</div>
                <div className="text-xs font-black text-white">+6.8k</div>
             </div>
          </div>
        </div>
      );
    }

    // 2. COMPARE OFFERS
    if (isType(['comparer', 'compare', 'attractivité', 'evaluation'])) {
      return (
        <div className="h-full w-full flex flex-col items-center justify-around gap-1 p-2">
          <div className="text-center w-full mt-1">
            <div className="text-[8px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Duel Attractivité</div>
            <div className="h-0.5 w-20 bg-indigo-100 mx-auto rounded-full overflow-hidden">
               <div className="h-full w-3/4 bg-indigo-600 animate-pulse"></div>
            </div>
          </div>
          
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center flex-shrink-0">
             <div className="absolute inset-3 border border-dashed border-indigo-300 rounded-full animate-spin-slow"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 sm:w-28 sm:h-28 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-black shadow-xl">
                  88<span className="text-lg opacity-50">%</span>
                </div>
             </div>
             <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-9 h-9 bg-white border-2 border-indigo-600 rounded-lg flex items-center justify-center text-[10px] font-black">A</div>
             <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-9 h-9 bg-slate-900 border-2 border-slate-700 rounded-lg flex items-center justify-center text-[10px] font-black text-white">B</div>
          </div>

          <div className="w-full grid grid-cols-2 gap-2">
             <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-100 overflow-hidden">
                <div className="text-[7px] font-black text-indigo-400 uppercase">Offre A</div>
                <div className="text-xs font-black text-indigo-900">Excellent</div>
             </div>
             <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 overflow-hidden">
                <div className="text-[7px] font-black text-slate-400 uppercase">Offre B</div>
                <div className="text-xs font-black text-slate-900">Standard</div>
             </div>
          </div>
        </div>
      );
    }

    // 3. SKILLS RENTABLES - IMPACT SALARIAL DIRECT
    if (isType(['compétences', 'rentables', 'skills', 'detection'])) {
      return (
        <div className="space-y-6 h-full flex flex-col items-center justify-between py-2 w-full">
          <div className="text-center w-full">
            <div className="text-[9px] font-black text-amber-600 uppercase tracking-[0.3em] mb-1">ROI Compétences / An</div>
            <div className="h-1 w-24 bg-amber-100 mx-auto rounded-full">
               <div className="h-full w-full bg-amber-600 animate-pulse"></div>
            </div>
          </div>
          
          <div className="relative w-full h-40 sm:h-48 flex flex-col items-center justify-center">
             <div className="w-full max-w-[140px] sm:max-w-[160px] space-y-4">
                <div className="relative group/skill">
                   <div className="flex justify-between items-end mb-1">
                      <span className="text-[10px] font-black text-slate-900">GenAI / LLM</span>
                      <span className="text-[10px] font-black text-emerald-500">+15k€</span>
                   </div>
                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-emerald-500 origin-left animate-in slide-in-from-left duration-1000"></div>
                   </div>
                </div>
                <div className="relative">
                   <div className="flex justify-between items-end mb-1">
                      <span className="text-[10px] font-black text-slate-900">Cloud Arch.</span>
                      <span className="text-[10px] font-black text-emerald-500">+8k€</span>
                   </div>
                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-[70%] bg-amber-500 origin-left"></div>
                   </div>
                </div>
                <div className="relative">
                   <div className="flex justify-between items-end mb-1">
                      <span className="text-[10px] font-black text-slate-900">DevOps</span>
                      <span className="text-[10px] font-black text-emerald-500">+5k€</span>
                   </div>
                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-[50%] bg-amber-400 origin-left"></div>
                   </div>
                </div>
             </div>
             
             {/* Center badge */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12 bg-slate-900 text-white p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-2xl border border-white/20 z-10 pointer-events-none">
                <div className="text-[7px] font-black uppercase opacity-50">Score Rareté</div>
                <div className="text-xl font-black">9.8<span className="text-xs">/10</span></div>
             </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-3">
             <div className="p-3 sm:p-4 bg-amber-50 rounded-xl sm:rounded-2xl border border-amber-100">
                <div className="text-[8px] font-black text-amber-600 uppercase mb-1">Potentiel Boost</div>
                <div className="text-[7px] font-black text-slate-900">+25,000 €</div>
             </div>
             <div className="p-3 sm:p-4 bg-slate-900 rounded-xl sm:rounded-2xl">
                <div className="text-[8px] font-black text-amber-400 uppercase mb-1">Profil</div>
                <div className="text-[7px] font-black text-white">Hautement<br />Critique</div>
             </div>
          </div>
        </div>
      );
    }

    // 4. VISION RÉGIONALE - BENCHMARK VILLES (SIMILAIRE À L'IMAGE)
    if (isType(['vision', 'mondiale', 'mondial', 'global', 'région', 'explorer', 'benchmark', 'explore', 'region'])) {
      return (
        <div className="h-full w-full flex flex-col items-center justify-around gap-1 p-2">
          <div className="text-center w-full mt-1">
            <div className="text-[8px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">Benchmark Régional</div>
            <div className="h-0.5 w-20 bg-blue-100 mx-auto rounded-full overflow-hidden">
               <div className="h-full w-full bg-blue-600 animate-pulse"></div>
            </div>
          </div>
          
               <div className="w-full space-y-2 flex-grow flex flex-col justify-center">
                  <div className="flex items-center justify-between px-2 py-2 sm:px-3 sm:py-2 bg-blue-50 rounded-lg border border-blue-100 text-[8px]">
               <span className="font-bold text-slate-900">Paris</span>
               <span className="font-black text-blue-600">65k€</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg border border-slate-100 text-[8px]">
               <span className="font-bold text-slate-600">Lyon</span>
               <span className="font-black text-slate-500">52k€</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg border border-slate-100 text-[8px]">
               <span className="font-bold text-slate-600">Bordeaux</span>
               <span className="font-black text-slate-500">48k€</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-2">
             <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-[7px] font-black text-blue-600 uppercase">1ère Ville</div>
                <div className="text-xs font-black text-slate-900">Paris</div>
             </div>
             <div className="p-2 bg-slate-900 rounded-lg">
                <div className="text-[7px] font-black text-blue-300 uppercase">Écart</div>
                <div className="text-xs font-black text-white">+35%</div>
             </div>
          </div>
        </div>
      );
    }

    // 5. SQL & DATA CORE
    if (isType(['gestion', 'persistance', 'sql', 'données', 'database'])) {
      return (
        <div className="space-y-6 h-full flex flex-col items-center justify-between py-2 w-full">
          <div className="text-center w-full">
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">SQL Enterprise Cluster</div>
            <div className="flex gap-1 justify-center mt-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse delay-75"></div>
            </div>
          </div>
          
          <div className="relative w-48 h-48 flex items-center justify-center">
             <div className="absolute inset-0 border-2 border-slate-100 rounded-[2rem] bg-slate-50/50"></div>
             <div className="bg-slate-900 w-32 h-32 rounded-3xl p-4 font-mono text-[8px] text-blue-400 flex flex-col justify-center gap-1 shadow-2xl border border-white/10">
                <div className="flex gap-2"><span className="text-white/20">01</span> SELECT *</div>
                <div className="flex gap-2"><span className="text-white/20">02</span> FROM market</div>
                <div className="mt-2 text-emerald-400">&gt;&gt; SYNC [OK]</div>
             </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-3">
             <div className="p-4 bg-slate-900 rounded-2xl border border-white/10">
                <div className="text-[8px] font-black text-slate-500 uppercase mb-1">Latence</div>
                <div className="text-xs font-black text-white">42ms</div>
             </div>
             <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
                <div className="text-[8px] font-black text-blue-100 uppercase mb-1">Status</div>
                <div className="text-xs font-black text-white">Protégé</div>
             </div>
          </div>
        </div>
      );
    }

    return (
      <div className="m-auto text-slate-100 text-8xl opacity-10 flex flex-col items-center gap-6">
        <div className="w-32 h-32 bg-slate-50 rounded-[4rem] border-4 border-dashed border-slate-200"></div>
        <div className="text-sm font-black uppercase tracking-[0.5em]">Analytics Ready</div>
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
