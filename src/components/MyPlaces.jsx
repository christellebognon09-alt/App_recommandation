import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManagePlaceModal from '../components/ManagePlaceModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

export default function MyPlaces() {
  const navigate = useNavigate();
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); 
  const [activePlace, setActivePlace] = useState(null);

  const [myPlaces, setMyPlaces] = useState([
    { id: 1, name: "Le Jardin Gourmand", category: "Restaurant", city: "Cotonou" },
    { id: 2, name: "Pharmacie du Centre", category: "Santé", city: "Cotonou" },
  ]);

  const handleSaveData = (data) => {
    if (modalMode === "edit") {
      setMyPlaces(myPlaces.map(p => p.id === data.id ? { ...p, name: data.nom, category: data.categorie, city: data.ville } : p));
    } else {
      const newPlace = { id: Date.now(), name: data.nom, category: data.categorie, city: data.ville };
      setMyPlaces([...myPlaces, newPlace]);
    }
    setIsManageModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setMyPlaces(myPlaces.filter(p => p.id !== activePlace.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col">
      <header className="bg-white border-b px-6 h-16 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <span className="material-symbols-outlined text-slate-600">arrow_back</span>
          </button>
          <h1 className="text-lg font-black text-slate-900 tracking-tight">Mes Lieux</h1>
        </div>
        <button 
          onClick={() => { setModalMode("add"); setActivePlace(null); setIsManageModalOpen(true); }}
          className="bg-[#00685f] text-white px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <span className="material-symbols-outlined text-sm">add</span> Nouveau
        </button>
      </header>

      <main className="max-w-4xl mx-auto w-full py-10 px-6 flex-grow">
        <div className="grid gap-4">
          {myPlaces.map((place) => (
            <div key={place.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#00685f]/5 flex items-center justify-center text-[#00685f]">
                  <span className="material-symbols-outlined fill-1">location_on</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-none mb-1">{place.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{place.category} • {place.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { setModalMode("edit"); setActivePlace(place); setIsManageModalOpen(true); }} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#00685f] hover:text-white transition-all flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button onClick={() => { setActivePlace(place); setIsDeleteModalOpen(true); }} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <ManagePlaceModal 
        isOpen={isManageModalOpen} 
        onClose={() => setIsManageModalOpen(false)} 
        mode={modalMode} 
        placeData={activePlace} 
        onSave={handleSaveData} 
      />

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        itemName={activePlace?.name} 
        onConfirm={handleConfirmDelete} 
      />
    </div>
  );
}