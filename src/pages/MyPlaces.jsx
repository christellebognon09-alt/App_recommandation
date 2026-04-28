import React, { useState, useEffect } from 'react'; // <--- CORRIGÉ : Ajout de useEffect
import { useNavigate, Link } from 'react-router-dom';
import ManagePlaceModal from '../components/ManagePlaceModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

export default function MyPlaces() {
  const navigate = useNavigate();

  // 1. ÉTATS
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); 
  const [activePlace, setActivePlace] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  const [myPlaces, setMyPlaces] = useState([
    { id: 1, name: "Le Jardin Gourmand", category: "Restaurant", city: "Cotonou", date: "12 Avril 2026", status: "Publié" },
    { id: 2, name: "Pharmacie du Centre", category: "Santé", city: "Cotonou", date: "20 Avril 2026", status: "En attente" },
  ]);

  // 2. EFFET POUR LE MODE SOMBRE
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 3. FONCTIONS DE CONTRÔLE
  const openAddModal = () => {
    setModalMode("add");
    setActivePlace(null);
    setIsManageModalOpen(true);
  };

  const openEditModal = (place) => {
    setModalMode("edit");
    setActivePlace(place);
    setIsManageModalOpen(true);
  };

  const handleDeleteClick = (place) => {
    setActivePlace(place);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-[#0b1c30] text-white' : 'bg-[#f8f9ff] text-[#0b1c30]'}`}>
      
      {/* HEADER */}
      <header className={`border-b px-6 h-16 flex items-center justify-between sticky top-0 z-50 ${isDarkMode ? 'bg-[#0b1c30] border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-600'}`}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Mes Lieux Ajoutés</h1>
        </div>
        <Link to="/home" className="text-sm font-bold text-[#00685f] hover:underline">
          Retour à la carte
        </Link>
      </header>

      <main className="max-w-4xl mx-auto w-full py-8 px-6">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Gestion des lieux</h2>
                <p className="text-sm text-slate-500 font-medium">Vous avez ajouté {myPlaces.length} lieux au total</p>
            </div>
            <button 
              onClick={openAddModal} 
              className="bg-[#00685f] text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-[#00685f]/20 hover:scale-105 transition-transform flex items-center gap-2"
            >
                <span className="material-symbols-outlined text-sm">add</span> Nouveau
            </button>
        </div>

        <div className="space-y-4">
          {myPlaces.map((place) => (
            <div key={place.id} className={`p-5 rounded-[2rem] border shadow-sm flex items-center justify-between group hover:shadow-md transition-all ${isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-100'}`}>
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-[#00685f] ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <span className="material-symbols-outlined text-3xl">location_on</span>
                </div>
                <div>
                  <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{place.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{place.category}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Ajouté le {place.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    place.status === 'Publié' ? 'bg-green-100/10 text-green-500' : 'bg-orange-100/10 text-orange-500'
                }`}>
                    {place.status}
                </span>
                
                <div className="flex gap-2">
                    <button 
                      onClick={() => openEditModal(place)}
                      className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center ${isDarkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-50 text-slate-400 hover:bg-[#00685f] hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(place)}
                      className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center ${isDarkMode ? 'bg-slate-800 text-slate-400 hover:text-red-500' : 'bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500'}`}
                    >
                        <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODALES */}
      <ManagePlaceModal 
        isOpen={isManageModalOpen} 
        onClose={() => setIsManageModalOpen(false)} 
        mode={modalMode}
        placeData={activePlace}
        onSave={(data) => console.log("Données reçues :", data)} 
      />

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        itemName={activePlace?.name}
        onConfirm={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}