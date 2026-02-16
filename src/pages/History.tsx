import React, { useEffect, useState } from 'react';
import { History, LayoutDashboard, ChevronRight, Search, X, Calendar, FileSearch } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import getUserHistory from '../utils/history';
import type { HistoryReponse } from '../types/history';



const HistoryPage: React.FC = () => {
  const recentHistory: HistoryReponse[] = [
    { idHistorique: 1, title: "Senior React Engineer", company: "TechScale Global", salary: "75k - 85k€", date: new Date(Date.now() - 2*24*60*60*1000).toISOString(), score: 92, salaire_predit: 80000, date_prediction: new Date(Date.now() - 2*24*60*60*1000).toISOString() },
    { idHistorique: 2, title: "Fullstack Developer", company: "Innova Group", salary: "55k - 65k€", date: new Date(Date.now() - 7*24*60*60*1000).toISOString(), score: 78, salaire_predit: 60000, date_prediction: new Date(Date.now() - 7*24*60*60*1000).toISOString() },
    { idHistorique: 3, title: "Lead AI Engineer", company: "CyberCore", salary: "90k - 110k€", date: new Date(Date.now() - 10*24*60*60*1000).toISOString(), score: 95, salaire_predit: 100000, date_prediction: new Date(Date.now() - 10*24*60*60*1000).toISOString() },
    { idHistorique: 4, title: "Junior UI Designer", company: "PixelArt", salary: "35k - 42k€", date: new Date(Date.now() - 14*24*60*60*1000).toISOString(), score: 85, salaire_predit: 38000, date_prediction: new Date(Date.now() - 14*24*60*60*1000).toISOString() }
  ];
  const { t } = useTranslation();
  const [listeHistorique, setHistorique] = useState<HistoryReponse[]>(recentHistory);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fonction utilitaire pour formater la date élégamment
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  // Filtrage intelligent incluant la recherche par date
  const filteredHistory = listeHistorique.filter((item: HistoryReponse) => {
    const formattedDate = formatDate(item.date);
    const search = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(search) ||
      item.company.toLowerCase().includes(search) ||
      item.salary.toLowerCase().includes(search) ||
      formattedDate.includes(search)
    );
  });


  async function loadHistory() {
    const acces_token = localStorage.getItem("authToken");
    if (!acces_token) {
      console.warn("No auth token found");
      return;
    }

    try {
      const data: HistoryReponse[] = await getUserHistory(acces_token);
      console.log("History data loaded:", data);
      setHistorique(data);
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  }
  
  useEffect(() => {
    loadHistory();
  }, []);

  return (
   <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 pb-32 pt-20 transition-colors">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-blue-500/20 rotate-3">
              <History size={40} />
            </div>
            <div>
              <h1 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter italic">{t('history.title')}</h1>
              <p className="text-lg text-slate-500 font-medium italic">{t('history.subtitle')}</p>
            </div>
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

        {/* LISTE DES RÉSULTATS */}
        <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-900/30">
            <div className="flex items-center gap-4">
              <LayoutDashboard size={24} className="text-blue-600" />
              <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter italic">
                {searchTerm ? t('history.activeFilter') : t('history.allAnalyses')}
                <span className="ml-4 text-sm font-bold text-slate-300 dark:text-slate-600">({filteredHistory.length})</span>
              </h2>
            </div>
          </div>
          
          <div className="p-4">
            {filteredHistory.length > 0 ? (
              <div className="space-y-2">
                {filteredHistory.map((item: HistoryReponse, idx: number) => (
                  <div key={idx} className="p-8 rounded-[2.5rem] hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all flex items-center justify-between group border border-transparent hover:border-slate-100 dark:hover:border-slate-800 animate-in fade-in slide-in-from-top-4 duration-300" style={{ animationDelay: `${idx * 50}ms` }}>
                    <div className="flex items-center gap-8">
                      <div>
                        <h4 className="text-xl font-black text-slate-950 dark:text-white italic tracking-tight">{item.title}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.company}</p>
                          <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                          <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{item.salary}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-10">
                      {/* AFFICHAGE DE LA DATE PRÉCISE */}
                      <div className="hidden sm:flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                          <Calendar size={12} />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('history.analyzedOn')}</span>
                        </div>
                        <span className="text-sm font-black text-slate-600 dark:text-slate-300 tracking-tight">
                          {formatDate(item.date)}
                        </span>
                      </div>
                      
                      <button className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm group-hover:translate-x-1">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-32 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-slate-200 dark:text-slate-700 mb-8">
                  <FileSearch size={48} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight italic">{t('history.noArchive')}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs italic px-6 leading-relaxed">
                  {t('history.noArchiveDesc')} <span className="text-blue-600 dark:text-blue-400 font-bold">"{searchTerm}"</span>.
                </p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-10 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em] hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 py-3 rounded-xl transition-all"
                >
                  {t('history.clearFilters')}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.5em]">
            Base de données synchronisée • SmartRecruit Legacy 
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
