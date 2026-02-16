import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Mail, MapPin, Briefcase, 
  Settings, Trash2, AlertTriangle, User,
  Check
} from 'lucide-react';
import type { Users } from '../types/users';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const datas = JSON.parse(localStorage.getItem("user")!)
  const[userData, setUserData] = useState<Users>(datas.user);
  const handleSave = () => {
    setIsEditing(false);
    console.log("Données sauvegardées :", userData);
  };

  const handleDeleteAccount = () => {
    console.warn("Compte supprimé définitivement.");
    navigate('/');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32 pt-12">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* EN-TÊTE DE PAGE */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter italic mb-2">
              {t('profile.nav_profile')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic">
              Gérez vos informations personnelles et vos préférences de compte.
            </p>
          </div>
          
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-blue-500/10"
            >
              <Settings size={14} /> {t('profile.profile_edit')}
            </button>
          )}
        </div>

        {/* CARTE D'INFORMATIONS PRINCIPALE */}
        <div className="bg-white dark:bg-slate-950 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all">
          <div className="p-10 md:p-16">
            <div className="space-y-10">
              
              {/* CHAMP : PRÉNOM */}
              <div className="group">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 block">
                  {t('profile.profile_field_firstName') || 'Prénom'}
                </label>
                {isEditing ? (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input 
                      type="text" 
                      value={userData.prenom}
                      onChange={(e) => setUserData({...userData, prenom: e.target.value})}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-lg font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                ) : (
                  <div className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tight">
                    {userData.prenom || 'Non renseigné'}
                  </div>
                )}
              </div>

              {/* CHAMP : NOM */}
              <div className="group">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 block">
                  {t('profile.profile_field_lastName') || 'Nom'}
                </label>
                {isEditing ? (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input 
                      type="text" 
                      value={userData.nom}
                      onChange={(e) => setUserData({...userData, nom: e.target.value})}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-lg font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                ) : (
                  <div className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tight">
                    {userData.nom || 'Non renseigné'}
                  </div>
                )}
              </div>

              {/* CHAMP : RÔLE */}
              <div className="group">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 block">
                  {t('profile.profile_field_role')}
                </label>
                {isEditing ? (
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input 
                      type="text" 
                      value={userData.role}
                      onChange={(e) => setUserData({...userData, role: e.target.value})}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-lg font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                ) : (
                  <div className="text-xl font-bold text-slate-600 dark:text-slate-400 italic">
                    {userData.role || 'Non renseigné'}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* CHAMP : EMAIL */}
                <div className="group">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 block">
                    {t('profile.profile_field_email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input 
                      type="email" 
                      value={userData.email}
                      disabled
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white cursor-not-allowed opacity-60"
                    />
                  </div>
                </div>

                {/* CHAMP : LOCALISATION */}
                <div className="group">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 block">
                    {t('profile.profile_field_location')}
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                      <input 
                        type="text" 
                        value={userData.location}
                        onChange={(e) => setUserData({...userData, location: e.target.value})}
                        className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                  ) : (
                    <div className="text-lg font-bold text-slate-900 dark:text-white">
                      {userData.location || 'Non renseigné'}
                    </div>
                  )}
                </div>
              </div>

              {/* ACTIONS D'ÉDITION */}
              {isEditing && (
                <div className="pt-8 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-3 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <Check size={18} /> {t('profile.profile_save')}
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-4 border-2 border-slate-100 dark:border-slate-800 text-slate-400 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    {t('profile.profile_cancel')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ZONE DE DANGER : SUPPRESSION */}
        {!isEditing && (
          <div className="mt-12 bg-red-50/50 dark:bg-red-950/10 rounded-[2.5rem] border border-red-100 dark:border-red-900/20 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <AlertTriangle className="text-red-600" size={20} />
                  <h3 className="text-xl font-black text-red-600 italic tracking-tight">{t('profile.profile_delete_account')}</h3>
                </div>
                <p className="text-sm text-slate-500 dark:text-red-200/40 font-medium italic">
                  {t('profile.profile_delete_warning')}
                </p>
              </div>

              {showDeleteConfirm ? (
                <div className="flex flex-col sm:flex-row gap-3 animate-in zoom-in-95 duration-200">
                  <button 
                    onClick={handleDeleteAccount}
                    className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-500/10"
                  >
                    {t('profile.profile_confirm_delete')}
                  </button>
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-8 py-4 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-200 dark:border-slate-700"
                  >
                    {t('profile.profile_cancel')}
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-3 px-8 py-4 text-red-600 border-2 border-red-600/20 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all group"
                >
                  <Trash2 size={16} className="group-hover:rotate-12 transition-transform" />
                  Supprimer mes données
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;
