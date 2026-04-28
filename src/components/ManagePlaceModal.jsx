import React, { useEffect, useState } from 'react';

export default function ManagePlaceModal({ isOpen, onClose, mode = "add", placeData = null, onSave }) {
  const [formData, setFormData] = useState({
    nom: "",
    categorie: "Restaurant",
    ville: "Cotonou",
    description: ""
  });

  // Remplit le formulaire si on modifie, sinon le vide
  useEffect(() => {
    if (mode === "edit" && placeData) {
      setFormData({
        nom: placeData.name || "",
        categorie: placeData.category || "Restaurant",
        ville: placeData.city || "Cotonou",
        description: placeData.description || ""
      });
    } else {
      setFormData({ nom: "", categorie: "Restaurant", ville: "Cotonou", description: "" });
    }
  }, [mode, placeData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: placeData?.id });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-slate-900">
              {mode === "add" ? "Ajouter un lieu" : "Modifier le lieu"}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <span className="material-symbols-outlined text-slate-400">close</span>
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom du lieu</label>
              <input 
                type="text" required value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] font-bold text-sm text-slate-700" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Catégorie</label>
                <select 
                  value={formData.categorie}
                  onChange={(e) => setFormData({...formData, categorie: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] font-bold text-sm text-slate-700"
                >
                  <option>Restaurant</option>
                  <option>Santé</option>
                  <option>Tourisme</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ville</label>
                <input 
                  type="text" value={formData.ville}
                  onChange={(e) => setFormData({...formData, ville: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#00685f] font-bold text-sm text-slate-700" 
                />
              </div>
            </div>
            <div className="pt-4 flex gap-3">
              <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-[10px] uppercase">Annuler</button>
              <button type="submit" className="flex-[1.5] py-4 bg-[#00685f] text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-[#00685f]/20">
                {mode === "add" ? "Créer le lieu" : "Sauvegarder"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}