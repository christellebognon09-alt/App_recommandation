import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  
  // 1. ÉTAT DU THÈME (Synchronisé)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    try {
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [formData, setFormData] = useState({
    nom: "Utilisateur GeoSmart",
    email: "user@example.com",
    ville: "Cotonou"
  });

  // 2. EFFET DE SYNCHRONISATION
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Écouteur pour synchroniser si le thème change ailleurs
    const syncTheme = () => {
      const saved = localStorage.getItem('theme');
      if (saved !== null) setIsDarkMode(JSON.parse(saved));
    };
    window.addEventListener('storage', syncTheme);
    return () => window.removeEventListener('storage', syncTheme);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-500 ${isDarkMode ? 'bg-[#050c14] text-white' : 'bg-[#f8f9ff] text-[#0b1c30]'}`}>
      
      {/* HEADER COMPACT */}
      <header className={`border-b px-6 h-14 flex items-center justify-between sticky top-0 z-50 transition-colors duration-500 ${isDarkMode ? 'bg-[#0b1c30] border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className={`p-1.5 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-600'}`}
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <h1 className="text-base font-black">Mon Profil</h1>
        </div>
        <button className="px-4 py-1.5 bg-[#00685f] text-white rounded-lg text-xs font-bold shadow-md hover:scale-105 transition-all">
          Enregistrer
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex justify-center py-6 px-6">
        <div className={`w-full max-w-md rounded-[2.5rem] shadow-xl border overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-[#0b1c30] border-slate-800 shadow-black/20' : 'bg-white border-slate-100'}`}>
          
          {/* SECTION PHOTO */}
          <div className={`p-6 border-b flex flex-col items-center bg-gradient-to-b ${isDarkMode ? 'from-white/5 border-slate-800' : 'from-[#00685f]/5 border-slate-50'}`}>
            <div className="relative">
              <div className={`w-24 h-24 rounded-full border-4 shadow-lg flex items-center justify-center overflow-hidden transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-white'}`}>
                <span className={`material-symbols-outlined text-4xl ${isDarkMode ? 'text-[#01c4a0]' : 'text-[#00685f]'}`}>person</span>
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-[#00685f] text-white rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[14px]">edit</span>
              </button>
            </div>
            <h2 className="mt-3 text-lg font-black">{formData.nom}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Compte SIL</p>
          </div>

          {/* FORMULAIRE */}
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Nom complet</label>
              <input 
                type="text" 
                className={`w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-[#00685f] transition-all font-bold text-xs ${isDarkMode ? 'bg-slate-800/50 text-white placeholder:text-slate-500' : 'bg-slate-50 text-slate-700'}`}
                defaultValue={formData.nom}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Email</label>
              <input 
                type="email" 
                className={`w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-[#00685f] transition-all font-bold text-xs ${isDarkMode ? 'bg-slate-800/50 text-white placeholder:text-slate-500' : 'bg-slate-50 text-slate-700'}`}
                defaultValue={formData.email}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Mot de passe</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="Laisser vide pour garder l'actuel"
                  className={`w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-[#00685f] transition-all font-bold text-xs ${isDarkMode ? 'bg-slate-800/50 text-white placeholder:text-slate-600' : 'bg-slate-50 text-slate-700'}`}
                />
                <span className="material-symbols-outlined absolute right-4 top-3 text-slate-400 text-lg">lock</span>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => navigate('/login')}
                className={`w-full py-3 font-black text-[10px] uppercase tracking-[0.15em] rounded-xl transition-all border ${isDarkMode ? 'text-red-400 border-red-400/20 hover:bg-red-400/10' : 'text-red-500 border-red-50 hover:bg-red-50'}`}
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}