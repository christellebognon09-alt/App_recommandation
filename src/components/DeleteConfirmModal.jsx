import React from 'react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-sm rounded-[2rem] p-8 text-center animate-in zoom-in duration-200">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-3xl">delete_forever</span>
        </div>
        <h3 className="text-lg font-black text-slate-900">Supprimer ?</h3>
        <p className="text-sm text-slate-500 mt-2 mb-6">Confirmez-vous la suppression de <br/><span className="font-bold text-slate-800">"{itemName}"</span> ?</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 bg-slate-100 text-slate-500 rounded-xl font-bold text-[10px] uppercase">Non</button>
          <button onClick={onConfirm} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold text-[10px] uppercase shadow-lg shadow-red-200">Oui, Supprimer</button>
        </div>
      </div>
    </div>
  );
}