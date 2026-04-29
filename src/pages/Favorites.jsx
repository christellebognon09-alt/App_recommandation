import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Favorites() {
  const navigate = useNavigate();

  // 1. ÉTAT DU THÈME (Lecture du localStorage dès le début)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    try {
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Simulation de données (à remplacer par tes vrais favoris plus tard)
  const [favorites, setFavorites] = useState([
    { id: 1, name: "Plage de Fidjrossè", category: "Loisir", city: "Cotonou" },
    { id: 2, name: "Erevan Supermarché", category: "Commerce", city: "Cotonou" },
  ]);

  // 2. SYNCHRONISATION DU THÈME
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Écouteur pour changer en temps réel si tu changes le mode ailleurs
    const syncTheme = () => {
      const saved = localStorage.getItem('theme');
      if (saved !== null) setIsDarkMode(JSON.parse(saved));
    };

    window.addEventListener('storage', syncTheme);
    return () => window.removeEventListener('storage', syncTheme);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-500 ${isDarkMode ? 'bg-[#050c14] text-white' : 'bg-[#f8f9ff] text-[#0b1c30]'}`}>
      
      {/* HEADER */}
      <header className={`border-b px-6 h-16 flex items-center justify-between sticky top-0 z-50 transition-colors duration-500 ${isDarkMode ? 'bg-[#0b1c30] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-600'}`}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-black">Mes Favoris</h1>
        </div>
        <Link to="/home" className="text-sm font-bold text-[#01c4a0] hover:opacity-80">
          Retour à la carte
        </Link>
      </header>

      <main className="max-w-4xl mx-auto w-full py-8 px-6 flex-grow">
        <div className="mb-8">
            <h2 className="text-2xl font-black">Lieux enregistrés</h2>
            <p className="text-sm text-slate-500 font-medium italic">{favorites.length} favoris enregistrés</p>
        </div>

        {/* LISTE DES FAVORIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((fav) => (
            <div key={fav.id} className={`p-5 rounded-[2rem] border flex items-center justify-between transition-all duration-500 ${isDarkMode ? 'bg-[#0b1c30] border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-red-500 ${isDarkMode ? 'bg-red-500/10' : 'bg-red-50'}`}>
                  <span className="material-symbols-outlined text-2xl">favorite</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">{fav.name}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase">{fav.category} • {fav.city}</p>
                </div>
              </div>
              
              <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
                <span className="material-symbols-outlined text-slate-400">more_vert</span>
              </button>
            </div>
          ))}

          {favorites.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <span className="material-symbols-outlined text-6xl text-slate-700 mb-4">heart_broken</span>
              <p className="text-slate-500 font-bold">Aucun favori pour le moment.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}