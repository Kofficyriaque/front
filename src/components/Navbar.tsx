import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, LogOut, History, ChevronDown, UserCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import type { Users } from '../types/users';

// --- Composants Drapeaux SVG ---
const FlagFR = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-5 h-3.5 rounded-sm shadow-sm border border-slate-100">
    <rect width="1" height="2" fill="#002395"/>
    <rect width="1" height="2" x="1" fill="#fff"/>
    <rect width="1" height="2" x="2" fill="#ED2939"/>
  </svg>
);

const FlagEN = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-3.5 rounded-sm shadow-sm border border-slate-100">
    <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
  </svg>
);

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const datas = localStorage.getItem("user")
  const[utilisateurs, setUtilisateurs] = useState<Users |null>(null);
  const [connected, setConnected]= useState<boolean>(false)
  const [currentLang, setCurrentLang] = useState<'FR' | 'EN'>(() => 
    i18n.language.startsWith('fr') ? 'FR' : 'EN'
  );
  const langRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const log_out = () => {
    localStorage.removeItem("user")
    setConnected(false)
    setUtilisateurs(null)
    window.dispatchEvent(new Event('user-updated'));
    navigate('/');
  };

  
  useEffect(() => {
      if (datas) {
      const userJson = JSON.parse(datas)
      setUtilisateurs(userJson.user)
      setConnected(true)
    }  
    },[datas]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'FR' as const, label: 'Fr', flag: <FlagFR /> },
    { code: 'EN' as const, label: 'En', flag: <FlagEN /> }
  ];

  const currentLanguageData = languages.find(l => l.code === currentLang);

  const onChangeLanguage = (code: 'FR' | 'EN') => {
    const lng = code === 'FR' ? 'fr' : 'en';
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
    setCurrentLang(code);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-slate-950/90 backdrop-blur-md border-slate-200/40 dark:border-slate-800 shadow-sm dark:shadow-slate-900/20' 
        : 'bg-white dark:bg-slate-950 border-slate-200/0 dark:border-slate-900/0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-1">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">PrediSalaire</span>
              <span className="text-xl font-bold tracking-tight text-blue-600">. ai</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('navbar.forAbout')}</Link>
            <Link to="/candidat" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('navbar.forCandidates')}</Link>
            <Link to="/recruteur" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('navbar.forRecruiters')}</Link>
            
            <div className="flex items-center space-x-4 pl-4 border-l border-slate-200 dark:border-slate-700">
              {/* Theme Toggle Button */}
              <button 
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-slate-200 dark:border-slate-800"
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              
              {/* Language Switcher Desktop */}
              <div className="relative mr-2" ref={langRef}>
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex flex-col items-center justify-center p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                >
                  <div className="transform group-hover:scale-110 transition-transform">
                    {currentLanguageData?.flag}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase leading-none mt-1">
                    {currentLanguageData?.code}
                  </span>
                </button>

                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onChangeLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold transition-colors dark:hover:bg-slate-800 ${
                          currentLang === lang.code ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-950/50' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                        }`}
                      >
                        {lang.flag}
                        <span>{lang.code === 'FR' ? 'Français' : 'English'}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* User Profile Menu or Login Button */}
              {connected && utilisateurs ? (
                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform overflow-hidden">
                        <User size={22} />
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full"></span>
                    </div>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 mr-2 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-4 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-[60]">
                      <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">Account</p>
                        <p className="font-black text-slate-950 dark:text-white text-lg">{utilisateurs.prenom} {utilisateurs.nom}</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">{utilisateurs.email}</p>
                      </div>

                      <div className="p-2">
                        <button 
                          onClick={() => {
                            navigate('/profile');
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-4 px-4 py-3 text-sm font-bold rounded-2xl transition-all text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <UserCircle size={18} />
                          </div>
                          {t('navbar.profile')}
                        </button>
                        
                        <button 
                          onClick={() => {
                            navigate('/history');
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-4 px-4 py-3 text-sm font-bold rounded-2xl transition-all text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <History size={18} />
                          </div>
                          {t('navbar.history')}
                        </button>
                      </div>

                      <div className="p-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                        <button 
                          onClick={() => {
                            log_out();
                            setIsProfileOpen(false);
                            navigate('/');
                          }}
                          className="w-full flex items-center gap-4 px-4 py-4 text-sm font-black text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all"
                        >
                          <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <LogOut size={18} />
                          </div>
                          {t('navbar.logout')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => navigate('/login', { state: { from: location.pathname !== '/' ? location.pathname : '/' } })}
                    className="bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    {t('navbar.login')}
                  </button>
                  <button
                    onClick={() => navigate('/candidateOnboarding', { state: { from: location.pathname !== '/' ? location.pathname : '/' } })}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-md"
                  >
                    {t('navbar.startAnalysis')}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-3">
            <Link to="/" className="block text-base font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 py-2">{t('navbar.ourMission')}</Link>
            <Link to="/candidat" className="block text-base font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 py-2">{t('navbar.forCandidates')}</Link>
            <Link to="/recruteur" className="block text-base font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 py-2">{t('navbar.forRecruiters')}</Link>
            
            <div className="pt-4 flex flex-col space-y-3">
              <div className="flex items-center justify-between py-2 border-t border-slate-50 dark:border-slate-800">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('navbar.language')}</span>
                <div className="flex space-x-2">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => onChangeLanguage(l.code)}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border transition-colors ${
                        currentLang === l.code 
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400' 
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {l.flag}
                      <span className="text-xs font-bold">{l.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              {connected && utilisateurs ? (
                <>
                  <div className="py-3 px-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">Account</p>
                    <p className="font-black text-slate-950 dark:text-white">{utilisateurs.prenom} {utilisateurs.nom}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">{utilisateurs.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-4 px-4 py-3 text-sm font-bold rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <UserCircle size={18} />
                    </div>
                    {t('navbar.profile')}
                  </button>
                  <button
                    onClick={() => {
                      navigate('/history');
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-4 px-4 py-3 text-sm font-bold rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <History size={18} />
                    </div>
                    {t('navbar.history')}
                  </button>
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button 
                      onClick={() => { log_out(); navigate('/'); setIsOpen(false); }}
                      className="w-full flex items-center gap-4 px-4 py-4 text-sm font-black text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all"
                    >
                      <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <LogOut size={18} />
                      </div>
                      {t('navbar.logout')}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => { navigate('/login', { state: { from: location.pathname !== '/' ? location.pathname : '/' } }); setIsOpen(false); }}
                    className="w-full text-center py-3 font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    {t('navbar.login')}
                  </button>
                  <button 
                    onClick={() => { navigate('/login', { state: { from: location.pathname !== '/' ? location.pathname : '/' } }); setIsOpen(false); }}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    {t('navbar.startAnalysis')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
