import React, { useEffect, useState } from 'react';
import { History, LayoutDashboard, ChevronRight, Search, X, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import getUserHistory from '../utils/history';
import type { HistoryReponse } from '../types/history';



const HistoryPage: React.FC = () => {
  const { t } = useTranslation();
  const [listeHistorique, setHistorique] = useState<HistoryReponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  
  useEffect(() => {
    async function history() {
      const datas = JSON.parse(localStorage.getItem("user")!);
      const access_token = datas.access_token
      const hist: HistoryReponse[] = await getUserHistory(access_token);
      setHistorique(hist);
    }
    history();
  }, []);

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
        {/* RECHERCHE - LA BORNE */}
        <div className="relative mb-8 group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
            <Search size={22} />
          </div>
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('history.searchPlaceholder')}
            className="w-full pl-16 pr-14 py-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 dark:focus:border-blue-500 text-lg font-medium italic transition-all dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 rounded-full transition-all animate-in zoom-in duration-200"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="bg-white dark:bg-slate-950 rounded-[3.5rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <LayoutDashboard size={28} className="text-blue-600" />
              <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter italic">Analyses Récentes</h2>
            </div>
          </div>
          
          <div className="p-4">
            {listeHistorique?.map((item) => (
              <div key={item.idHistorique} className="p-8 rounded-[2.5rem] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-between group border-b border-transparent last:border-none">
                <div className="flex items-center gap-8">
                  <div>
                    <h4 className="text-xl font-black text-slate-950 dark:text-white italic">{item.titre}</h4>
                    <p className="text-sm font-bold text-slate-400 flex items-center gap-2">
                      {Math.round(item.salaire_min ?? 0)}
                      <TrendingUp size={14} className="text-emerald-500" />
                      <span className="text-blue-600 dark:text-blue-400">{Math.round(item.salaire_predit ?? 0)}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest hidden sm:block">{item.date_predit}</span>
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
