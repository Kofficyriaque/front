import React from 'react';
import { History, LayoutDashboard, ChevronRight } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const recentHistory = [
    { title: "Senior React Engineer", company: "TechScale Global", salary: "75k - 85k€", date: "Il y a 2 jours", score: 92 },
    { title: "Fullstack Developer", company: "Innova Group", salary: "55k - 65k€", date: "Il y a 1 semaine", score: 78 },
    { title: "Lead AI Engineer", company: "CyberCore", salary: "90k - 110k€", date: "Il y a 10 jours", score: 95 },
    { title: "Junior UI Designer", company: "PixelArt", salary: "35k - 42k€", date: "Il y a 2 semaines", score: 85 }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 pb-32 pt-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
            <History size={40} />
          </div>
          <div>
            <h1 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter italic">Mon Historique</h1>
            <p className="text-lg text-slate-500 font-medium italic">Retrouvez toutes vos analyses passées.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-950 rounded-[3.5rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <LayoutDashboard size={28} className="text-blue-600" />
              <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter italic">Analyses Récentes</h2>
            </div>
          </div>
          
          <div className="p-4">
            {recentHistory.map((item, idx) => (
              <div key={idx} className="p-8 rounded-[2.5rem] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-between group border-b border-transparent last:border-none">
                <div className="flex items-center gap-8">
                  <div className="w-16 h-16 bg-white dark:bg-slate-950 rounded-2xl flex items-center justify-center text-2xl font-black text-blue-600 dark:text-blue-400 shadow-sm border border-slate-100 dark:border-slate-800">
                    {item.score}%
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-950 dark:text-white italic">{item.title}</h4>
                    <p className="text-sm font-bold text-slate-400 flex items-center gap-2">
                      {item.company} • <span className="text-blue-600 dark:text-blue-400">{item.salary}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest hidden sm:block">{item.date}</span>
                  <button className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
