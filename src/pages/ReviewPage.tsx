import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, Send, MessageSquare, CheckCircle, ArrowLeft, Heart, Sparkles } from 'lucide-react';

const ReviewPage: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const cats = [
    { id: 'accuracy', label: t('review.cat_accuracy') },
    { id: 'ui', label: t('review.cat_ui') },
    { id: 'speed', label: t('review.cat_speed') },
    { id: 'ux', label: t('review.cat_ux') }
  ];

  const toggleCategory = (id: string) => {
    setCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setLoading(true);
    // Simulation d'envoi
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 py-20 animate-in zoom-in-95 duration-500">
        <div className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-[4rem] p-12 text-center shadow-2xl border border-slate-100 dark:border-slate-800 transition-colors">
          <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter italic mb-4">{t('review.success_title')}</h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium italic mb-12">{t('review.success_subtitle')}</p>
          <button 
            onClick={() => navigate('/profile')}
            className="px-12 py-5 bg-slate-950 dark:bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95"
          >
            {t('review.back_home')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 py-24 px-6 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-3xl mx-auto">
        
        <button 
          onClick={() => navigate('/home')}
          className="flex items-center gap-3 text-slate-400 hover:text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-12 transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          {t('profile_cancel')}
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="h-3 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-400"></div>
          
          <div className="p-10 md:p-16">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600">
                  <Heart size={24} />
               </div>
              <h1 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter italic leading-none">{t('review.title')}</h1>
                </div>
                <p className="text-xl text-slate-500 dark:text-slate-400 font-medium italic mb-16">{t('review.subtitle')}</p>

            <form onSubmit={handleSubmit} className="space-y-16">
              
              {/* RATING SECTION */}
              <div className="space-y-6">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-4">
                  {t('review.rating_label')}
                </label>
                <div className="flex items-center gap-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(star)}
                      className="transition-all hover:scale-125 focus:outline-none"
                    >
                      <Star 
                        size={48} 
                        className={`transition-colors duration-200 ${
                          (hover || rating) >= star 
                          ? 'fill-amber-400 text-amber-400' 
                          : 'text-slate-200 dark:text-slate-800'
                        }`} 
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-4 text-2xl font-black text-blue-600 animate-in zoom-in duration-300 italic">{rating}/5</span>
                  )}
                </div>
              </div>

              

              {/* COMMENT SECTION */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare size={16} className="text-slate-400" />
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
                    {t('review.comment_label')}
                  </label>
                </div>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t('review.comment_placeholder')}
                  className="w-full h-40 p-8 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:text-white font-medium italic transition-all resize-none"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-8 flex flex-col items-center">
                <button 
                  type="submit"
                  disabled={rating === 0 || loading}
                  className={`group relative px-16 py-6 rounded-3xl font-black text-sm uppercase tracking-widest transition-all flex items-center gap-4 ${
                    rating === 0 || loading 
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-950 dark:bg-blue-600 text-white shadow-2xl hover:scale-105 hover:bg-blue-600'
                  }`}
                >
                  {loading ? (
                    <Sparkles className="animate-spin" size={22} />
                  ) : (
                    <>
                      {t('review.submit')}
                      <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
