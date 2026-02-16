
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Brain, Sparkles, CheckCircle2, ChevronRight, X, Loader2, TrendingUp, DollarSign } from 'lucide-react';
import type { ReponsePredict, RequestPredict } from '../types/prediction';
import predict from '../utils/predict';

type Step = 1 | 2 | 3 | 4;

const CareerAnalysis: React.FC = () => {
  const { t } = useTranslation();
  const [step, setStep] = React.useState<Step>(1);
  const [jobTitle, setJobTitle] = React.useState('');
  const [experience, setExperience] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [skills, setSkills] = React.useState<string[]>([]);
  const [newSkill, setNewSkill] = React.useState('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [analysisStatus, setAnalysisStatus] = React.useState('');
  const [showResult, setShowResult] = React.useState(false);
  const [reponse, setReponse] = useState<ReponsePredict | null>(null)
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();
  const data: RequestPredict = {
    titre: jobTitle,
    description: "En rejoignant le Pôle Data  vous jouerez un rôle clé dans l'exploitation des données clients pour optimiser la performance commerciale  renforcer la fidélisation  et proposer des recommandations d'actions stratégiques. Vos missions seront les suivantes : Modélisation / Data Science / IA : - Être lead ou binôme sur des projets de Data Science - Cadrer le besoin métier et préparer les données (avec la Data Tech) - Construire ou optimiser les modèles de façon pragmatique - Piloter l'industrialisation avec les Data Engineers et la DSI - Restituer les résultats de manière accessible aux équipes concernées - Assurer le RUN : suivi de la performance  support utilisateurs  maintenance - Contribuer au développement de nouveaux cas d'usage IA à forte valeur Collaboration avec les entités du Groupe : - Travailler en proximité avec les équipes métier (marketing  distribution  logistique  etc.) - Comprendre leurs besoins en matière de données (analyse  visualisation  modélisation) - Leur proposer une solution répondant à ces besoins - Aider les équipes métier à exploiter les résultats pour leurs décisions stratégiques et plans d'actions. - Être pilote de la relation avec une ou plusieurs équipes métier (gestion des priorités et ressources  point régulier pour s'assurer de la satisfaction de l'équipe métier) Analyse de Données : - Collecter  préparer et analyser les données issues de sources multiples. - Identifier les tendances  ruptures  opportunités et leviers d'action. - Présenter vos résultats de façon claire et impactante. Collaboration avec l'équipe Data Technique : - Participer à la qualité et la disponibilité des données et outils - Contribuer aux mises en production de nouvelles tables ou évolutions (identification des données  CTI  recette) - Appliquer les bonnes pratiques et la stratégie sur la stack data  contribuer aux échanges sur le sujet. Amélioration des processus : Être force de proposition sur l'amélioration des processus d'équipe et les méthodes de travail collaboratives. Le groupe SIPA Ouest-France  est un acteur majeur dans le domaine des médias d'information. Historiquement construit autour du quotidien Ouest-France (1er quotidien national)  le Groupe édite également les plateformes : ouest-france.fr  actu.fr et 20minutes.fr  plusieurs quotidiens régionaux (Ouest-France  Le Maine Libre  Courrier de l'Ouest  Presse Océan  La Presse de la Manche)  plus de 80 hebdomadaires via Publihebdos ainsi que des magazines spécialisés. La diversité des activités du Groupe s'étend également à la publicité multi-supports (groupe Additi  Hebdos Communication)  à la radio (Hit West  Cristal  Océane FM)  à l'édition de livres. Propriété l'Association pour le Soutien des Principes de la Démocratie Humaniste (ASPDH)  loi de 1901  le Groupe se distingue par des valeurs fortes et des engagements clairs envers le respect des personnes humaines et des bénéfices exclusivement au service du développement de l'information. INTRASIPA  société d'expertise du Groupe  met à disposition des filiales des fonctions transverses (Data  Cybersécurité  RGPD  R&amp D  Juridique  Finances  Paie...). Le Pôle Data  composé d'une vingtaine de collaborateurs (data analysts  data scientists  experts en data visualisation  web analysts)  intervient auprès de toutes les entités du Groupe et occupe un rôle stratégique au sein de l'organisation. Nous recherchons notre futur(e) Data Analyst / Data Scientist en contrat à durée indéterminé.",
    metier: 'data scientist',
    region: region,
    experience: experience,
    competences: skills
  }
 
  async function prediction() {
    setIsAnalyzing(true);
    try {
      const access_token = localStorage.getItem("authToken")
      if (!access_token) {
        return;
      }
      const requete = await predict(data, access_token) 
      const statuses = [
      "Connecting to market APIs...",
      "Analyzing 15,248 job offers for your profile...",
      "Normalizing salary benchmarks...",
      "Calculating median percentiles for " + data.region + "...",
      "Cross-referencing " + data.competences.length + " skills against market demand...",
      "Finalizing AI prediction model..."
      ];
      for (const status of statuses) {
        setAnalysisStatus(status);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      setReponse(requete);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsAnalyzing(false);
      setShowResult(true);
    }
  }

  const regions = [
    "Île-de-France (Paris)",
    "Auvergne-Rhône-Alpes",
    "Hauts-de-France",
    "Nouvelle-Aquitaine",
    "Occitanie",
    "Provence-Alpes-Côte d'Azur",
    "Bretagne",
    "Pays de la Loire",
    "Grand Est",
    "Normandie",
    "Bourgogne-Franche-Comté",
    "Centre-Val de Loire"
  ];

  const suggestedSkills = ['python', 'java', 'javascript', 'sql', 'react', 'angular', 'vue',
    'node.js', 'docker', 'kubernetes', 'aws', 'azure', 'gcp',
    'machine learning', 'deep learning', 'tensorflow', 'pytorch',
    'git', 'linux', 'agile', 'scrum', 'devops',
    'mongodb', 'postgresql', 'mysql', 'redis',
    'typescript', 'c++', 'go', 'rust', 'scala',
    'fastapi', 'django', 'flask', 'spring', 'php', 'html', 'css'
  ];

  const handleAddSkill = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const addSuggestedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep((step + 1) as Step);
  };

  const prevStep = () => {
    if (step > 1) setStep((step - 1) as Step);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {!isAnalyzing && !showResult && (
          <>
            <div className="mb-8">
              <div className="flex justify-between text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2 px-2">
                <span>{t('careeranalysis.profile')}</span>
                <span>{t('careeranalysis.skills')}</span>
                <span>{t('careeranalysis.description')}</span>
                <span>{t('careeranalysis.analysis')}</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: '25%' }} 
                  animate={{ width: `${(step / 4) * 100}%` }} 
                  className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                />
              </div>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">{t('careeranalysis.stepOf', { step })}</p>
            </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={step} 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }} 
            className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800"
          >
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">{t('careeranalysis.step1Title')}</h2>
                  <p className="text-slate-500 dark:text-slate-400">{t('careeranalysis.step1Desc')}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t('careeranalysis.jobTitle')}</label>
                  <input 
                    type="text" 
                    value={jobTitle} 
                    onChange={(e) => setJobTitle(e.target.value)} 
                    placeholder={t('careeranalysis.jobTitlePlaceholder')} 
                    className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t('careeranalysis.experience')}</label>
                    <select 
                      value={experience} 
                      onChange={(e) => setExperience(e.target.value)} 
                      className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100"
                    >
                      <option value="">{t('careeranalysis.selectExperience')}</option>
                      <option value="Junior (0-2 ans)">{t('careeranalysis.experienceJunior')}</option>
                      <option value="2-5">{t('careeranalysis.experience2to5')}</option>
                      <option value="5-10">{t('careeranalysis.experience5to10')}</option>
                     
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t('careeranalysis.region')}</label>
                    <select 
                      value={region} 
                      onChange={(e) => setRegion(e.target.value)} 
                      className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100"
                    >
                      <option value="">{t('careeranalysis.selectRegion')}</option>
                      {regions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">{t('careeranalysis.step2Title')}</h2>
                  <p className="text-slate-500 dark:text-slate-400">{t('careeranalysis.step2Desc')}</p>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newSkill} 
                    onChange={(e) => setNewSkill(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())} 
                    placeholder={t('careeranalysis.skillsPlaceholder')} 
                    className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100"
                  />
                  <button 
                    onClick={() => handleAddSkill()} 
                    className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all"
                  >
                    {t('careeranalysis.addButton')}
                  </button>
                </div>
                <div className="min-h-[60px] p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  {skills.length === 0 ? (
                    <span className="text-slate-400 dark:text-slate-500">{t('careeranalysis.noSkills')}</span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {skills.map(s => (
                        <span 
                          key={s} 
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium flex items-center"
                        >
                          {s}
                          <button 
                            onClick={() => removeSkill(s)} 
                            className="ml-2 hover:text-blue-800 dark:hover:text-blue-300"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-slate-400 dark:text-slate-500 mb-2">{t('careeranalysis.suggestions')}</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedSkills.filter(s => !skills.includes(s)).map(s => (
                      <button 
                        key={s} 
                        onClick={() => addSuggestedSkill(s)} 
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                      >
                        + {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">{t('careeranalysis.descriptionTitle')}</h2>
                  <p className="text-slate-500 dark:text-slate-400">{t('careeranalysis.descriptionSubtitle')}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t('careeranalysis.description')}</label>
                  <textarea 
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)} 
                    placeholder={t('careeranalysis.descriptionPlaceholder')} 
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100 min-h-[150px] resize-none"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto animate-bounce">
                  <Brain size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">{t('careeranalysis.step3Title')}</h2>
                  <p className="text-slate-500 dark:text-slate-400">{t('careeranalysis.step3Desc')}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 text-left space-y-3 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="text-blue-600 dark:text-blue-400 mr-3" size={18} />
                    <span>{jobTitle} - {experience}</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="text-blue-600 dark:text-blue-400 mr-3" size={18} />
                    <span>{t('careeranalysis.checkRegion')} {region}</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="text-blue-600 dark:text-blue-400 mr-3" size={18} />
                    <span>{skills.length} {t('careeranalysis.checkSkills')}</span>
                  </div>
                </div>
                <button 
                  onClick={prediction}
                  className="w-full bg-blue-600 dark:bg-blue-700 text-white py-5 rounded-xl font-bold text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {t('careeranalysis.launchAnalysis')} <Sparkles size={24} />
                </button>
              </div>
            )}

            {step < 4 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <button 
                  onClick={() => setStep((step - 1) as Step)} 
                  disabled={step === 1} 
                  className="flex items-center text-slate-400 dark:text-slate-500 font-bold hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-30 transition-colors"
                >
                  <ArrowLeft size={20} className="mr-2" /> {t('careeranalysis.back')}
                </button>
                <button 
                  onClick={() => setStep((step + 1) as Step)} 
                  disabled={step === 1 ? !jobTitle || !experience || !region : step === 2 ? skills.length < 2 : false} 
                  className="flex items-center bg-slate-900 dark:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  {t('careeranalysis.next')} <ChevronRight size={20} className="ml-2" />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
          </>
        )}

        {isAnalyzing && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-950 p-12 rounded-3xl shadow-xl text-center space-y-8"
          >
            <div className="relative flex justify-center">
              <Loader2 className="text-blue-600 dark:text-blue-400 animate-spin" size={80} />
              <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 dark:text-blue-400" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">{t('careeranalysis.analyzing')}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium h-6 animate-pulse">{analysisStatus}</p>
            </div>
          </motion.div>
        )}

        {showResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-3xl shadow-2xl border border-blue-50 dark:border-blue-900 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10 text-center space-y-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-bold text-xs uppercase tracking-widest border border-green-100 dark:border-green-800">
                {t('careeranalysis.analysisComplete')}
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-500 dark:text-slate-400">{t('careeranalysis.predictedValue')}</h2>
                <div className="text-5xl md:text-7xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tighter">
                  {reponse?.salaire_min} – {reponse?.salaire_max}
                </div>
                <p className="text-slate-400 dark:text-slate-500 font-medium">{t('careeranalysis.salaryLabel')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ResultStat icon={<TrendingUp size={20} />} label={t('careeranalysis.confidenceLabel')} value="94.2%" />
                <ResultStat icon={<DollarSign size={20} />} label={t('careeranalysis.medianLabel')} value="51.8k€" />
                <ResultStat icon={<CheckCircle2 size={20} />} label={t('careeranalysis.sampleLabel')} value="1.2k+" />
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/')}
                  className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-5 rounded-xl font-bold text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-xl dark:shadow-blue-950"
                >
                  {t('careeranalysis.dashboard')}
                </button>
                <button 
                  onClick={() => { setShowResult(false); setStep(1); }}
                  className="flex-1 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 py-5 rounded-xl font-bold text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700"
                >
                  {t('careeranalysis.refinProfile')}
                </button>
              </div>
              
              <p className="text-slate-400 dark:text-slate-500 text-sm italic">
                {t('careeranalysis.disclaimer')}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const ResultStat: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
    <div className="text-blue-600 mb-2 flex justify-center">{icon}</div>
    <div className="text-xs font-bold text-slate-400 uppercase mb-1">{label}</div>
    <div className="text-xl font-bold text-slate-900">{value}</div>
  </div>
);

export default CareerAnalysis;
