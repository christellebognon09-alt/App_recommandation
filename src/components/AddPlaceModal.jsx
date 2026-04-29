import React from 'react';

export default function AddPlaceModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay (Arrière-plan flou) */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Contenu de la Modale */}
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header de la modale */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900">Ajouter un lieu</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Nouveau point d'intérêt</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Formulaire */}
        <form className="p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nom du lieu</label>
            <input 
              type="text" 
              placeholder="Ex: Restaurant Le Gourmand"
              className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] transition-all font-bold text-slate-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Catégorie</label>
              <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] transition-all font-bold text-slate-700 appearance-none">
                <option>Restaurant</option>
                <option>Banque</option>
                <option>Hôtel</option>
                <option>Pharmacie</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Ville</label>
              <input 
                type="text" 
                defaultValue="Cotonou"
                className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] transition-all font-bold text-slate-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Description</label>
            <textarea 
              rows="3"
              placeholder="Décrivez ce lieu..."
              className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] transition-all font-bold text-slate-700 resize-none"
            ></textarea>
          </div>

          <button className="w-full py-4 bg-[#00685f] text-white rounded-2xl font-bold text-sm hover:bg-[#004d46] transition-all shadow-lg shadow-[#00685f]/20 mt-4 active:scale-[0.98]">
            Enregistrer le lieu
          </button>+
        </form>
      </div>
    </div>
  );
}