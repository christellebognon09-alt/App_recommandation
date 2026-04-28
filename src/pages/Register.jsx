import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  // Gestion du thème
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#0b1c30]' : 'bg-[#f7f9fb]'}`}>
      
      <div className={`w-full max-w-md rounded-[2.5rem] shadow-2xl border p-10 transform transition-all ${isDarkMode ? 'bg-[#162a41] border-slate-700 shadow-black/20' : 'bg-white border-slate-100'}`}>
        
        {/* SECTION TITRE ÉPURÉE */}
        <div className="text-center mb-10">
          <h1 className={`text-4xl font-black tracking-tighter mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            GeoSmart
          </h1>
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-sm font-medium`}>
            Commencez votre voyage sans effort.
          </p>
        </div>

        <form className="space-y-5">
          {/* Champ Nom Complet */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nom complet</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">person</span>
              <input 
                type="text" 
                placeholder="Jean Dupont" 
                className={`w-full pl-12 pr-4 py-4 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] outline-none text-sm transition-all shadow-inner ${isDarkMode ? 'bg-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 text-slate-900'}`} 
              />
            </div>
          </div>

          {/* Champ Email */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Adresse e-mail</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
              <input 
                type="email" 
                placeholder="nom@exemple.com" 
                className={`w-full pl-12 pr-4 py-4 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] outline-none text-sm transition-all shadow-inner ${isDarkMode ? 'bg-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 text-slate-900'}`} 
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Mot de passe</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
              <input 
                type="password" 
                placeholder="••••••••" 
                className={`w-full pl-12 pr-4 py-4 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] outline-none text-sm transition-all shadow-inner ${isDarkMode ? 'bg-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 text-slate-900'}`} 
              />
            </div>
          </div>

          {/* Bouton d'inscription */}
          <button type="submit" className="w-full bg-[#00685f] hover:bg-[#004d46] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-[#00685f]/20 transform active:scale-95 transition-all duration-200 mt-4">
            Créer mon compte
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Déjà inscrit ? <Link to="/login" className="text-[#00685f] font-bold hover:underline ml-1">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}