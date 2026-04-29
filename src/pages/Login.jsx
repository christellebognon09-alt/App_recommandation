import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Importation de ton instance Axios

export default function Login() {
  const navigate = useNavigate();
  
  // États pour les champs du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // État du thème
  const [isDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Fonction de connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Appel à Laravel AuthController@login
      const res = await api.post('/login', { email, password });

      // Stockage sécurisé
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Redirection vers la carte
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Identifiants incorrects ou erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#0b1c30]' : 'bg-[#f7f9fb]'}`}>
      
      <div className={`w-full max-w-md rounded-[2.5rem] shadow-2xl border p-10 transform transition-all ${isDarkMode ? 'bg-[#162a41] border-slate-700 shadow-black/20' : 'bg-white border-slate-100'}`}>
        
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-black tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>GeoSmart</h1>
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-sm`}>Bon retour ! Connectez-vous pour continuer.</p>
        </div>

        {/* Affichage des erreurs si elles existent */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/50 text-red-500 text-xs font-bold text-center italic">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Champ Email */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Adresse e-mail</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@exemple.com" 
                required
                className={`w-full pl-12 pr-4 py-4 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] outline-none text-sm transition-all shadow-inner ${isDarkMode ? 'bg-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 text-slate-900'}`} 
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Mot de passe</label>
              <Link to="/forgot-password" className="text-[11px] font-bold text-[#00685f] hover:underline uppercase tracking-widest">Oublié ?</Link>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required
                className={`w-full pl-12 pr-4 py-4 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] outline-none text-sm transition-all shadow-inner ${isDarkMode ? 'bg-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 text-slate-900'}`} 
              />
            </div>
          </div>

          {/* Bouton de connexion */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-[#00685f] hover:bg-[#004d46] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-[#00685f]/20 transform active:scale-95 transition-all duration-200 mt-4 flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
               <span className="material-symbols-outlined animate-spin">sync</span>
            ) : "Se connecter"}
          </button>

          {/* Séparateur */}
          <div className="relative flex items-center py-2">
            <div className={`flex-grow border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}></div>
            <span className="mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ou</span>
            <div className={`flex-grow border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}></div>
          </div>

          {/* Boutons Sociaux */}
          <div className="grid grid-cols-2 gap-4">
            <button type="button" className={`flex items-center justify-center gap-2 py-3 border rounded-2xl transition-all font-bold text-xs ${isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              Google
            </button>
            <button type="button" className={`flex items-center justify-center gap-2 py-3 rounded-2xl transition-all font-bold text-xs ${isDarkMode ? 'bg-white text-black hover:bg-slate-200' : 'bg-black text-white hover:bg-slate-800'}`}>
              Apple
            </button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Nouveau ici ? <Link to="/register" className="text-[#00685f] font-bold hover:underline ml-1">Créer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  );
}