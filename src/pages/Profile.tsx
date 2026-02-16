import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Mail, User, CheckCircle, Lock, Loader2, Save,
  Edit3, AlertCircle, Shield, X
} from 'lucide-react';
import type { Users } from '../types/users';

const Profile: React.FC = () => {
  const { t: translate } = useTranslation();
  const t = {
    nav_profile: translate('profile.nav_profile'),
    profile_edit: translate('profile.profile_edit'),
    profile_save: translate('profile.profile_save'),
    profile_cancel: translate('profile.profile_cancel'),
  };
  
  const [user, setUser] = useState<Users>(JSON.parse(localStorage.getItem("user")!));
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const datas = JSON.parse(localStorage.getItem("user")!)
  const[userData, setUserData] = useState<Users>(datas.user);
  const handleSave = () => {
    setIsEditing(false);
    setProfileForm({
      prenom: user?.prenom || "",
      nom: user?.nom || ""
    });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    setSaving(true);
    setSuccess("");
    setError("");
    try {
      // TODO: Appeler l'API pour changer le mot de passe
      console.log("Mot de passe changé");
      setSuccess("Mot de passe changé avec succès");
      setPasswordForm({ old_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      setError("Erreur lors du changement de mot de passe");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 py-16 px-4 transition-colors duration-500">
      <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
        
        <div className="flex justify-between items-end mb-10">
          <h1 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter italic">
            {t.nav_profile}
          </h1>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-xl transition-all"
            >
              <Edit3 size={14} />
              {t.profile_edit}
            </button>
          )}
        </div>

        {/* MESSAGES D'ÉTAT */}
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-600 dark:text-emerald-400 flex items-center gap-3 animate-in zoom-in-95 duration-300">
            <CheckCircle size={20} />
            <span className="font-bold text-sm">{success}</span>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 flex items-center gap-3 animate-in shake duration-300">
            <AlertCircle size={20} />
            <span className="font-bold text-sm">{error}</span>
          </div>
        )}

        {/* BLOC 1 : INFORMATIONS PERSONNELLES */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-8 transition-colors relative overflow-hidden">
          <div className="flex items-center gap-6 mb-10 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
              <User size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight italic transition-all">
                {user.prenom} {user.nom}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium italic">{user.email}</p>
              <span className={`inline-block mt-3 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${user.role === 'chercheur_emploi' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                {user.role === 'chercheur_emploi' ? 'Candidat' : 'Recruteur'}
              </span>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1">Prénom</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profileForm.prenom} 
                    onChange={(e) => setProfileForm({ ...profileForm, prenom: e.target.value })} 
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:text-white font-bold transition-all animate-in fade-in duration-300" 
                  />
                ) : (
                  <p className="px-1 text-lg font-bold text-slate-700 dark:text-slate-200 italic">{user.prenom}</p>
                )}
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1">Nom</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profileForm.nom} 
                    onChange={(e) => setProfileForm({ ...profileForm, nom: e.target.value })} 
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:text-white font-bold transition-all animate-in fade-in duration-300" 
                  />
                ) : (
                  <p className="px-1 text-lg font-bold text-slate-700 dark:text-slate-200 italic">{user.nom}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1">Email</label>
              <div className="flex items-center gap-4 px-1">
                <Mail className="text-slate-300 dark:text-slate-600" size={18} />
                <p className="text-lg font-bold text-slate-400 dark:text-slate-500 italic">{user.email}</p>
              </div>
            </div>

            {isEditing && (
              <div className="flex items-center gap-4 pt-4 animate-in slide-in-from-top-2 duration-300">
                <button 
                  type="submit" 
                  disabled={saving} 
                  className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 dark:hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 active:scale-95"
                >
                  {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  {t.profile_save}
                </button>
                <button 
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex items-center gap-3 px-6 py-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-black text-xs uppercase tracking-widest transition-all"
                >
                  <X size={18} />
                  {t.profile_cancel}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* BLOC 2 : SÉCURITÉ (Toujours en mode interactif car sensible) */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-10 transition-colors">
          <form onSubmit={handleChangePassword} className="space-y-6">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <Shield size={16} className="text-blue-600" /> Sécurité du compte
            </h3>

            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Mot de passe actuel</label>
              <input 
                type="password" 
                value={passwordForm.old_password} 
                onChange={(e) => setPasswordForm({ ...passwordForm, old_password: e.target.value })} 
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
                  value={passwordForm.new_password} 
                  onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })} 
                  required 
                  placeholder="••••••••" 
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:text-white font-bold transition-all" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Confirmer</label>
                <input 
                  type="password" 
                  value={passwordForm.confirm_password} 
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })} 
                  required 
                  placeholder="••••••••" 
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:text-white font-bold transition-all" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={saving} 
              className="flex items-center gap-3 px-8 py-4 bg-slate-950 dark:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 dark:hover:bg-slate-700 transition-all shadow-xl disabled:opacity-50 active:scale-95 border border-slate-800 dark:border-slate-700"
            >
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Lock size={18} />}
              Changer le mot de passe
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Profile;
