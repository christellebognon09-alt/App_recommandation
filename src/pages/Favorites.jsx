import React, { useState, useEffect } from 'react'; // <--- CORRIGÉ : Import useEffect
import { useNavigate } from 'react-router-dom';

export default function Favorites() {
  const navigate = useNavigate();

  // 1. ÉTATS
  const [favoritePlaces, setFavoritePlaces] = useState([
    { id: 1, name: "Hôtel Azalaï", category: "Tourisme", city: "Cotonou", rating: 4.8 },
    { id: 2, name: "Espace Dina", category: "Restaurant", city: "Calavi", rating: 4.5 },
    { id: 3, name: "Place de l'Amazone", category: "Tourisme", city: "Cotonou", rating: 4.9 },
  ]);

  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  // 2. EFFET MODE SOMBRE
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 3. FONCTIONS
  const handleShowDirection = (place) => {
    const fullAddress = `${place.name}, ${place.city}, Benin`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
    window.open(url, '_blank');
  };
     
  const toggleFavorite = (id) => {
    setFavoritePlaces(favoritePlaces.filter(place => place.id !== id));
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#0b1c30] text-white' : 'bg-[#f8f9ff] text-[#0b1c30]'}`}>
      
      {/* HEADER */}
      <header className={`border-b px-6 h-16 flex items-center justify-between sticky top-0 z-50 ${isDarkMode ? 'bg-[#0b1c30] border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-600'}`}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Mes Favoris</h1>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[#00685f] ${isDarkMode ? 'bg-[#00685f]/20' : 'bg-[#00685f]/10'}`}>
          <span className="material-symbols-outlined font-variation-fill text-xl">favorite</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full py-8 px-6 flex-grow">
        {favoritePlaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favoritePlaces.map((place) => (
              <div key={place.id} className={`rounded-[2.5rem] p-5 border shadow-sm hover:shadow-md transition-all group ${isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-100'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-[#00685f] ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                    <span className="material-symbols-outlined text-3xl">map</span>
                  </div>
                  <button 
                    onClick={() => toggleFavorite(place.id)}
                    className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined fill-1 text-xl">favorite</span>
                  </button>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-[#00685f] uppercase tracking-widest bg-[#00685f]/10 px-2 py-0.5 rounded-lg">
                      {place.category}
                    </span>
                    <div className="flex items-center text-amber-400 text-xs font-bold">
                      <span className="material-symbols-outlined text-sm mr-1 fill-1">star</span>
                      {place.rating}
                    </div>
                  </div>
                  <h3 className={`text-lg font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{place.name}</h3>
                  <p className="text-sm text-slate-400 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">location_on</span>
                    {place.city}, Bénin
                  </p>
                </div>

                <button 
                  onClick={() => handleShowDirection(place)}
                  className={`w-full mt-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-lg ${isDarkMode ? 'bg-slate-700 text-white hover:bg-[#00685f]' : 'bg-slate-900 text-white hover:bg-[#00685f]'}`}
                >
                  Voir l'itinéraire
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? 'bg-slate-800 text-slate-600' : 'bg-slate-100 text-slate-300'}`}>
              <span className="material-symbols-outlined text-5xl">heart_broken</span>
            </div>
            <h2 className={`text-xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Aucun favori pour l'instant</h2>
            <button 
              onClick={() => navigate('/home')}
              className="mt-8 px-8 py-4 bg-[#00685f] text-white rounded-2xl font-black text-xs uppercase"
            >
              Explorer les lieux
            </button>
          </div>
        )}
      </main>
    </div>
  );
}