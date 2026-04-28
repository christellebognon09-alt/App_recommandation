import React from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  return (
    // Structure de fond identique à Register et Login
    <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center p-6 font-sans">
      
      {/* Même largeur bloquée : max-w-md */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-10 transform transition-all">
        
        {/* En-tête avec icône */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#00685f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[#00685f] text-[32px]">lock_reset</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Mot de passe oublié</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Entrez votre e-mail pour recevoir un lien de réinitialisation.
          </p>
        </div>

        <form className="space-y-6">
          {/* Champ Email */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Votre adresse e-mail</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
              <input 
                type="email" 
                placeholder="nom@exemple.com" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] outline-none text-sm transition-all shadow-inner" 
                required
              />
            </div>
          </div>

          {/* Bouton d'action */}
          <button type="submit" className="w-full bg-[#00685f] hover:bg-[#004d46] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-[#00685f]/20 transform active:scale-95 transition-all duration-200">
            Envoyer le lien
          </button>
        </form>

        {/* Lien de retour */}
        <div className="mt-10 text-center border-t border-slate-50 pt-6">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-[#00685f] hover:underline">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}