import React from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    // On utilise "flex justify-center" pour centrer horizontalement
    <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center p-6 font-sans">
      
      {/* C'est ICI qu'on bloque la largeur : max-w-md (env. 448px) */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-10 transform transition-all">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Inscription</h1>
          <p className="text-slate-500 text-sm">Commencez votre voyage sans effort.</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nom complet</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">person</span>
              <input type="text" placeholder="Jean Dupont" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] outline-none text-sm transition-all shadow-inner" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Adresse e-mail</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
              <input type="email" placeholder="nom@exemple.com" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] outline-none text-sm transition-all shadow-inner" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Mot de passe</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
              <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] outline-none text-sm transition-all shadow-inner" />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#00685f] hover:bg-[#004d46] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-[#00685f]/20 transform active:scale-95 transition-all duration-200 mt-4">
            Créer mon compte
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">
            Vous avez déjà un compte ? <Link to="/login" className="text-[#00685f] font-bold hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}