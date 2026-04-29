import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios'; // Ton instance Axios

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Gestion du thème identique à Login/Register
  const [isDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      // Laravel dispose d'une route par défaut ou personnalisée pour ça
      const res = await api.post('/forgot-password', { email });
      setMessage("Si cet e-mail existe, un lien de réinitialisation a été envoyé.");
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#0b1c30]' : 'bg-[#f7f9fb]'}`}>
      
      <div className={`w-full max-w-md rounded-[2.5rem] shadow-2xl border p-10 transform transition-all ${isDarkMode ? 'bg-[#162a41] border-slate-700 shadow-black/20' : 'bg-white border-slate-100'}`}>
        
        <div className="text-center mb-8">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'bg-[#00685f]/20' : 'bg-[#00685f]/10'}`}>
            <span className="material-symbols-outlined text-[#00685f] text-[32px]">lock_reset</span>
          </div>
          <h1 className={`text-2xl font-black tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Mot de passe oublié</h1>
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-sm leading-relaxed`}>
            Entrez votre e-mail pour recevoir un lien de réinitialisation.
          </p>
        </div>

        {/* Messages de succès ou d'erreur */}
        {message && <div className="mb-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/50 text-green-500 text-xs font-bold text-center">{message}</div>}
        {error && <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/50 text-red-500 text-xs font-bold text-center">{error}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Votre adresse e-mail</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@exemple.com" 
                className={`w-full pl-12 pr-4 py-4 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] outline-none text-sm transition-all shadow-inner ${isDarkMode ? 'bg-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 text-slate-900'}`} 
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#00685f] hover:bg-[#004d46] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-[#00685f]/20 transform active:scale-95 transition-all duration-200 flex justify-center items-center"
          >
            {loading ? <span className="material-symbols-outlined animate-spin">sync</span> : "Envoyer le lien"}
          </button>
        </form>

        <div className={`mt-10 text-center border-t pt-6 ${isDarkMode ? 'border-slate-700' : 'border-slate-50'}`}>
          <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-[#00685f] hover:underline">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}