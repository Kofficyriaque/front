import React, { useState, useEffect, useMemo } from 'react';
import {  CheckCircle, Scale, BookOpen, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TermsOfUse: React.FC = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('acceptance');

  const sections = useMemo(() => [
    { id: 'acceptance', title: t('terms.sec1_title'), content: t('terms.sec1_desc'), icon: <CheckCircle className="text-blue-600" /> },
    { id: 'service', title: t('terms.sec2_title'), content: t('terms.sec2_desc'), icon: <BookOpen className="text-emerald-600" /> },
    { id: 'property', title: t('terms.sec3_title'), content: t('terms.sec3_desc'), icon: <Lock className="text-indigo-600" /> },
    { id: 'responsibility', title: t('terms.sec4_title'), content: t('terms.sec4_desc'), icon: <Scale className="text-slate-900 dark:text-white" /> },
  ], [t]);

  const getSectionIcon = (id: string) => {
    const section = sections.find(s => s.id === id);
    return section ? section.icon : null;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-500">
      
      {/* HEADER */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-32 pb-16 px-6 transition-colors">
        <div className="max-w-6xl mx-auto">
         

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              
              <h1 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter italic">
                {t('terms.title')}
              </h1>
            </div>
           
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* NAVIGATION LATÉRALE */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-1">
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mb-6 px-4">
                Articles & Clauses
              </p>
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className={`w-full text-left px-6 py-4 rounded-2xl text-xs font-black transition-all flex items-center justify-between group ${
                    activeSection === sec.id 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-800'
                  }`}
                >
                  <span className="truncate uppercase tracking-wider">{sec.title}</span>
                  {activeSection === sec.id && <CheckCircle size={14} className="shrink-0" />}
                </button>
              ))}
            </div>
          </aside>

          {/* CONTENU PRINCIPAL */}
          <main className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-xl border border-slate-100 dark:border-slate-800 transition-colors">
              <div className="h-2 w-full bg-blue-600 rounded-t-[3.5rem]"></div>
              
              <div className="p-10 md:p-20">
                <p className="text-2xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic mb-24 border-l-8 border-blue-600 pl-10">
                  {t('terms.intro')}
                </p>

                <div className="space-y-32">
                  {sections.map((sec) => (
                    <section key={sec.id} id={sec.id} className="scroll-mt-32 group">
                      <div className="flex items-center gap-8 mb-10">
                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                          {getSectionIcon(sec.id)}
                        </div>
                        <h2 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter italic m-0">
                          {sec.title}
                        </h2>
                      </div>
                      
                      <div className="pl-0 md:pl-24">
                        <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium italic">
                          {sec.content}
                        </p>
                      </div>

                      <div className="h-px w-24 bg-slate-100 dark:bg-slate-800 mt-16 ml-24 transition-all group-hover:w-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900 duration-1000"></div>
                    </section>
                  ))}
                </div>

              </div>
            </div>
            <div className="mt-16 text-center">
               <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.5em]">
                  © Market Visualier • Direction Juridique
               </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;