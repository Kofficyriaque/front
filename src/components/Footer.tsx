import React from 'react';
import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-20">
          {/* Left: Brand & Description */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center space-x-1 mb-6">
              <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">Market Visualizer</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-medium mb-8">{t('footer.about')}</p>
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <Mail size={18} />
              <a href="mailto:info.marketvisualizer@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">info.marketvisualizer@gmail.com</a>
            </div>
          </div>

          {/* Right: Links Grid */}
          <div className="flex-1 grid grid-cols-2 gap-12">
            {/* Platform */}
            <div>
              <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 mb-6 uppercase tracking-widest">{t('footer.platform')}</h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => handleNavigation('/about')} className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {t('footer.aboutUs')}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('/candidat')} className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {t('footer.forCandidates')}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('/recruteur')} className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {t('footer.forRecruiters')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 mb-6 uppercase tracking-widest">{t('footer.legal')}</h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => handleNavigation('/privacy')} className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {t('footer.privacy')}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('/terms')} className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {t('footer.terms')}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <p>© {year} Market Visualizer</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
