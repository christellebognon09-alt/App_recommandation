import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    // On utilise exactement la même structure de centrage que Register
    <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center p-6 font-sans">
      
      {/* On utilise la même largeur : max-w-md */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-10 transform transition-all">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">GeoSmart</h1>
          <p className="text-slate-500 text-sm">Bon retour ! Connectez-vous pour continuer.</p>
        </div>

        <form className="space-y-6">
          {/* Champ Email */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Adresse e-mail</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
              <input 
                type="email" 
                placeholder="nom@exemple.com" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] outline-none text-sm transition-all shadow-inner" 
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Mot de passe</label>
              <Link to="/forgot-password" size="sm" className="text-[11px] font-bold text-[#00685f] hover:underline uppercase tracking-widest">Oublié ?</Link>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] outline-none text-sm transition-all shadow-inner" 
              />
            </div>
          </div>

          {/* Bouton de connexion */}
          <button type="submit" className="w-full bg-[#00685f] hover:bg-[#004d46] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-[#00685f]/20 transform active:scale-95 transition-all duration-200 mt-4">
            Se connecter
          </button>

          {/* Séparateur */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="mx-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">Ou</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          {/* Boutons Sociaux */}
          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-xs text-slate-600">
              Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-3 bg-black text-white rounded-2xl hover:bg-slate-800 transition-all font-bold text-xs">
              Apple
            </button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">
            Nouveau ici ? <Link to="/register" className="text-[#00685f] font-bold hover:underline">Créer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  );
}