import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Loader2, ArrowRight, Lock } from 'lucide-react';
import { authAPI } from '../services/api';
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: branchement API pour réinitialiser le mot de passe
    console.log({ email });
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setStep(2); // move to verification step
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmed = code.trim();
    if (/^\d{6}$/.test(trimmed)) {
      setStep(3);
    } else {
      setError(t('forgotPassword.code_error'));
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError(t('forgotPassword.passwords_mismatch'));
      return;
    }

    if (newPassword.length < 6) {
      setError(t('forgotPassword.password_min_length'));
      return;
    }

    setLoading(true);

    try {
      await authAPI.resetPassword({ acces_token: code, newPassword });
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">{t('forgotPassword.title')}</h1>
          <p className="text-slate-500 dark:text-slate-500">{t('forgotPassword.subtitle')}</p>
        </div>

        <div className="bg-white dark:bg-slate-950 p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t('forgotPassword.email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-600">
                    <Mail size={20} />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('forgotPassword.emailPlaceholder')}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-900 dark:text-slate-100"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                disabled={isLoading}
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg dark:shadow-blue-950 disabled:opacity-70 flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>{t('forgotPassword.submit')} <ArrowRight className="ml-2" size={20} /></>
                )}
              </button>
            </form>
          ) : (
            <>
              {step === 2 && (
                <form onSubmit={handleVerifyCode} className="space-y-6 text-center">
                  <div className="mb-4">
                    
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">{t('forgotPassword.verify_title')}</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">{t('forgotPassword.verify_sent', { email })}</p>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder={t('forgotPassword.enter_code_placeholder')}
                      className="w-full max-w-xs mx-auto pl-4 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-slate-900 dark:text-slate-100"
                    />
                    {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full max-w-xs mx-auto bg-blue-600 text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center"
                  >
                    {t('forgotPassword.verify_button')}
                  </button>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('forgotPassword.new_password_label')}</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('forgotPassword.confirm_password_label')}</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : t('forgotPassword.reset_button')}
                  </button>
                </form>
              )}
            </>
          )}

          {/* Back to Login Link */}
          {!isSubmitted && (
            <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
                ← {t('forgotPassword.backToLogin')}
              </Link>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
