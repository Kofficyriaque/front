
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Calculator, GitCompare, Zap, Globe, CheckCircle2, UserPlus, Cpu, BarChart3 } from 'lucide-react';
import { FeatureVisual } from '../components/FeatureVisual';

const Candidat: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const items1 = t('candidate.cand_feat1_items', { returnObjects: true }) as string[];
  const items2 = t('candidate.cand_feat2_items', { returnObjects: true }) as string[];
  const items3 = t('candidate.cand_feat3_items', { returnObjects: true }) as string[];
  const items5 = t('candidate.cand_feat5_items', 
    { returnObjects: true }) as string[];

  const candidateFeatures = [
    { title: t('candidate.cand_feat1_title'), desc: t('candidate.cand_feat1_desc'), items: items1, icon: <Calculator size={20} />, colorClasses: 'bg-blue-50 text-blue-600 shadow-blue-100', color: 'blue' },
    { title: t('candidate.cand_feat2_title'), desc: t('candidate.cand_feat2_desc'), items: items2, icon: <GitCompare size={20} />, colorClasses: 'bg-indigo-50 text-indigo-600 shadow-indigo-100', color: 'indigo' },
    { title: t('candidate.cand_feat3_title'), desc: t('candidate.cand_feat3_desc'), items: items3, icon: <Zap size={20} />, colorClasses: 'bg-amber-50 text-amber-600 shadow-amber-100', color: 'amber' },
    { title: t('candidate.cand_feat5_title'), desc: t('candidate.cand_feat5_desc'), items: items5, icon: <Globe size={20} />, colorClasses: 'bg-cyan-50 text-cyan-600 shadow-cyan-100', color: 'cyan' },
  ];

  const steps = [
    { title: t('candidate.cand_step1_title'), desc: t('candidate.cand_step1_desc'), step: "01", icon: <UserPlus className="text-blue-400" /> },
    { title: t('candidate.cand_step2_title'), desc: t('candidate.cand_step2_desc'), step: "02", icon: <Cpu className="text-blue-400" /> },
    { title: t('candidate.cand_step3_title'), desc: t('candidate.cand_step3_desc'), step: "03", icon: <BarChart3 className="text-blue-400" /> }
  ];
  return (
    <div className="animate-in fade-in duration-700">
    {/*En-tête*/}
      <header className="bg-white pt-32 pb-24 text-center relative overflow-hidden">
        {/* Blur Blobs Background */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 -top-40 -left-40 animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -top-20 -right-40"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -bottom-32 -left-32"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
        <div className="absolute top-2/3 right-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 -right-48"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
        <div className="absolute top-0 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -top-40"></div>
        <div className="absolute bottom-1/3 left-2/3 w-88 h-88 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-12 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          
          <h1 className="text-9xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.85]">{t('candidate.discover_title')}</h1>
          <p className="text-2xl font-medium text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed">{t('candidate.discover_subtitle')}</p>
          <button 
            onClick={() => navigate('/onboarding/candidate')} 
            className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 hover:scale-105 transition-all"
          >
            {t('candidate.btn_calculate_salary')}
          </button>
        </div>
      </header>
      {/*Fonctionnalités*/}
      <section className="py-0 bg-white">
        {candidateFeatures.map((f, idx) => (
          <div key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
            <div className="py-32 px-4 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-20`}>
                  <div className="flex-1">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-8 ${f.colorClasses} shadow-xl`}>
                      {f.icon}
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">{f.title}</h3>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">{f.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {f.items.map((item: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 font-semibold text-slate-700 text-xs shadow-sm hover:shadow-md hover:border-slate-300 hover:scale-105 transition-all duration-200 cursor-default">
                          <CheckCircle2 size={16} className={`text-${f.color}-600`} /> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 w-full bg-slate-50 rounded-[4rem] aspect-square flex items-center justify-center border border-slate-100 relative group overflow-hidden">
                    <FeatureVisual type={f.title} color={f.color} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      {/*Comment ça marche*/}
<section className="py-48 bg-slate-950 text-white relative overflow-hidden">
        {/* Décoration de fond */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-32">
            <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter italic">{t('candidate.cand_how_it_works')}</h2>
            <p className="text-2xl text-blue-400 font-medium tracking-wide italic opacity-80">{t('candidate.cand_how_it_works_subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Ligne de connexion (Desktop) */}
            <div className="absolute top-[4.5rem] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent hidden md:block"></div>
            
            {steps.map((s, idx) => (
              <div key={idx} className="relative group">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[4rem] hover:bg-white/10 transition-all duration-500 h-full flex flex-col items-center text-center">
                  {/* Numéro flottant avec Glow */}
                  <div className="w-24 h-24 rounded-[2.5rem] bg-blue-600 text-white flex items-center justify-center text-3xl font-black shadow-[0_0_50px_rgba(37,99,235,0.4)] mb-12 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10">
                    {s.step}
                  </div>

                  <h3 className="text-3xl font-black mb-6 tracking-tight">{s.title}</h3>
                  <p className="text-lg text-slate-400 leading-relaxed font-medium">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-32 text-center">
             <button onClick={() => navigate('/onboarding/candidate')} className="bg-white text-slate-950 px-20 py-8 rounded-[2.5rem] font-black text-2xl hover:scale-105 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] transition-all active:scale-95">
               {t('candidate.btn_start')}
             </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Candidat;
