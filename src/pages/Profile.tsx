import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Mail, User,
  Edit3, Save, X, Shield, Lock
} from 'lucide-react';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")!)) 
  
  const handleSave = () => {
    setIsEditing(false);
    console.log("Données sauvegardées :", userData);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 py-16 px-4 transition-colors duration-500">
      <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
        
        <div className="flex justify-between items-end mb-10">
          <h1 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter italic">
            {t('profile.nav_profile')}
          </h1>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-xl transition-all"
            >
              <Edit3 size={14} />
              {t('profile.profile_edit')}
            </button>
          )}
        </div>

        {/* BLOC 1 : INFORMATIONS PERSONNELLES */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-8 transition-colors relative overflow-hidden">
          <div className="flex items-center gap-6 mb-10 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
              <User size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight italic transition-all">
                {userData.user.prenom} {userData.user.nom}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium italic">{userData.user.email}</p>
              <span className={`inline-block mt-3 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${userData.user.role === 'chercheur_emploi' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                {userData.user.role === 'chercheur_emploi' ? 'Candidat' : 'Recruteur'}
              </span>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1">Prénom</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={userData.user.prenom} 
                    onChange={(e) => setUserData({...userData, user: {...userData.user, prenom: e.target.value}})} 
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:text-white font-bold transition-all animate-in fade-in duration-300" 
                  />
                ) : (
                  <p className="px-1 text-lg font-bold text-slate-700 dark:text-slate-200 italic">{userData.user.prenom}</p>
                )}
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1">Nom</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={userData.user.nom} 
                    onChange={(e) => setUserData({...userData, user: {...userData.user, nom: e.target.value}})} 
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:text-white font-bold transition-all animate-in fade-in duration-300" 
                  />
                ) : (
                  <p className="px-1 text-lg font-bold text-slate-700 dark:text-slate-200 italic">{userData.user.nom}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1">Email</label>
              <div className="flex items-center gap-4 px-1">
                <Mail className="text-slate-300 dark:text-slate-600" size={18} />
                <p className="text-lg font-bold text-slate-400 dark:text-slate-500 italic">{userData.user.email}</p>
              </div>
            </div>

            {isEditing && (
              <div className="flex items-center gap-4 pt-4 animate-in slide-in-from-top-2 duration-300">
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 dark:hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                >
                  <Save size={18} />
                  {t('profile.profile_save')}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-3 px-6 py-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-black text-xs uppercase tracking-widest transition-all"
                >
                  <X size={18} />
                  {t('profile.profile_cancel')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* BLOC 2 : SÉCURITÉ */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-10 transition-colors">
          <form className="space-y-6">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <Shield size={16} className="text-blue-600" /> Sécurité du compte
            </h3>

            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Mot de passe actuel</label>
              <input 
                type="password" 
                required 
                placeholder="••••••••" 
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:text-white font-bold transition-all" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Nouveau</label>
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:text-white font-bold transition-all" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Confirmer</label>
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:text-white font-bold transition-all" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="flex items-center gap-3 px-8 py-4 bg-slate-950 dark:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 dark:hover:bg-slate-700 transition-all shadow-xl active:scale-95 border border-slate-800 dark:border-slate-700"
            >
              <Lock size={18} />
              Changer le mot de passe
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Profile;
