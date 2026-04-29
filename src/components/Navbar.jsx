import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Fonction pour vérifier si l'onglet est actif (pour changer la couleur)
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 h-20 flex items-center justify-between z-[90]">
      
      {/* Accueil */}
      <button 
        onClick={() => navigate('/home')}
        className={`flex flex-col items-center gap-1 ${isActive('/home') ? 'text-[#00685f]' : 'text-slate-400'}`}
      >
        <span className={`material-symbols-outlined ${isActive('/home') ? 'fill-1' : ''}`}>home</span>
        <span className="text-[10px] font-black uppercase tracking-tighter">Accueil</span>
      </button>

      {/* Mes Lieux (Gestion CRUD) */}
      <button 
        onClick={() => navigate('/my-places')}
        className={`flex flex-col items-center gap-1 ${isActive('/my-places') ? 'text-[#00685f]' : 'text-slate-400'}`}
      >
        <span className={`material-symbols-outlined ${isActive('/my-places') ? 'fill-1' : ''}`}>layers</span>
        <span className="text-[10px] font-black uppercase tracking-tighter">Mes Lieux</span>
      </button>

      {/* Favoris */}
      <button 
        onClick={() => navigate('/favorites')}
        className={`flex flex-col items-center gap-1 ${isActive('/favorites') ? 'text-[#00685f]' : 'text-slate-400'}`}
      >
        <span className={`material-symbols-outlined ${isActive('/favorites') ? 'fill-1' : ''}`}>favorite</span>
        <span className="text-[10px] font-black uppercase tracking-tighter">Favoris</span>
      </button>

      {/* Profil */}
      <button 
        onClick={() => navigate('/profile')}
        className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-[#00685f]' : 'text-slate-400'}`}
      >
        <span className={`material-symbols-outlined ${isActive('/profile') ? 'fill-1' : ''}`}>person</span>
        <span className="text-[10px] font-black uppercase tracking-tighter">Profil</span>
      </button>

    </nav>
  );
}