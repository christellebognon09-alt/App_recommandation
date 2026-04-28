import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "Utilisateur GeoSmart",
    email: "user@example.com",
    ville: "Cotonou"
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Header compact */}
      <header className="bg-white border-b px-6 h-14 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-slate-600 text-xl">arrow_back</span>
          </button>
          <h1 className="text-base font-black text-slate-900">Mon Profil</h1>
        </div>
        <button className="px-4 py-1.5 bg-[#00685f] text-white rounded-lg text-xs font-bold shadow-md hover:bg-[#004d46] transition-all">
          Enregistrer
        </button>
      </header>

      {/* Main ajusté : on retire le centrage vertical pour coller au haut */}
      <main className="flex justify-center py-6 px-6">
        <div className="bg-white w-full max-w-md rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          
          {/* Section Photo plus compacte */}
          <div className="p-6 border-b border-slate-50 flex flex-col items-center bg-gradient-to-b from-[#00685f]/5 to-transparent">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-4xl text-[#00685f]">person</span>
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-[#00685f] text-white rounded-full border-2 border-white shadow-md">
                <span className="material-symbols-outlined text-[14px]">edit</span>
              </button>
            </div>
            <h2 className="mt-3 text-lg font-black text-slate-900">{formData.nom}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Compte SIL</p>
          </div>

          {/* Formulaire avec padding réduit */}
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Nom complet</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#00685f] transition-all font-bold text-slate-700 text-xs"
                defaultValue={formData.nom}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#00685f] transition-all font-bold text-slate-700 text-xs"
                defaultValue={formData.email}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Mot de passe</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="Laisser vide pour garder l'actuel"
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#00685f] transition-all font-bold text-slate-700 text-xs"
                />
                <span className="material-symbols-outlined absolute right-4 top-3 text-slate-300 text-lg">lock</span>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => navigate('/login')}
                className="w-full py-3 text-red-500 font-black text-[10px] uppercase tracking-[0.15em] hover:bg-red-50 rounded-xl transition-all border border-red-50/50"
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