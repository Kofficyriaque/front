
import React from 'react';
import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white py-12 border-t border-slate-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-1 mb-4">
              <span className="text-lg font-bold tracking-tight text-slate-900">PrediSalaire</span>
              <span className="text-lg font-bold tracking-tight text-blue-600">.ai</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">{t('footer.about')}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">{t('footer.platform')}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">{t('footer.features')}</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">{t('footer.forCandidates')}</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">{t('footer.forRecruiters')}</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">{t('footer.pricing')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">{t('footer.company')}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">{t('footer.aboutUs')}</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">{t('footer.careers')}</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">{t('footer.blog')}</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">{t('footer.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">{t('footer.legal')}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">{t('footer.terms')}</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs gap-4">
          <p>© {year} PrediSalaire.ai. {t('footer.rights')}</p>
          <div className="flex items-center gap-1">
            {t('footer.madeWith')} <Heart size={12} className="text-red-500 fill-red-500" /> {t('footer.by', { author: 'Python & Passion' })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
