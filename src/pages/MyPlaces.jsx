import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// --- VERIFICATION : Vérifie bien que ces fichiers existent dans ton dossier components ---
// Si tu as un doute, commente ces deux lignes pour tester si la page s'affiche
import ManagePlaceModal from '../components/ManagePlaceModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

export default function MyPlaces() {
  const navigate = useNavigate();

  // 1. ÉTATS
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); 
  const [activePlace, setActivePlace] = useState(null);

  // Initialisation ultra-sécurisée du thème
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved !== null ? JSON.parse(saved) : true;
    } catch (e) {
      return true;
    }
  });

  const [myPlaces, setMyPlaces] = useState([
    { id: 1, name: "Le Jardin Gourmand", category: "Restaurant", city: "Cotonou", date: "12 Avril 2026", status: "Publié" },
    { id: 2, name: "Pharmacie du Centre", category: "Santé", city: "Cotonou", date: "20 Avril 2026", status: "En attente" },
  ]);

  // 2. SYNCHRONISATION DU THÈME
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 3. FONCTIONS
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

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-500 ${isDarkMode ? 'bg-[#050c14] text-white' : 'bg-[#f8f9ff] text-[#0b1c30]'}`}>
      
      {/* HEADER */}
      <header className={`border-b px-6 h-16 flex items-center justify-between sticky top-0 z-50 transition-colors duration-500 ${isDarkMode ? 'bg-[#0b1c30] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-600'}`}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-black">Mes Lieux Ajoutés</h1>
        </div>
        <Link to="/home" className="text-sm font-bold text-[#01c4a0] hover:opacity-80">
          Retour à la carte
        </Link>
      </header>

      <main className="max-w-4xl mx-auto w-full py-8 px-6 flex-grow">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h2 className="text-2xl font-black">Gestion des lieux</h2>
                <p className="text-sm text-slate-500 font-medium italic">Total : {myPlaces.length} lieux</p>
            </div>
            <button 
              onClick={openAddModal} 
              className="bg-[#00685f] text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
                <span className="material-symbols-outlined text-sm">add</span> Nouveau
            </button>
        </div>

        {/* LISTE DES LIEUX */}
        <div className="space-y-4">
          {myPlaces.map((place) => (
            <div key={place.id} className={`p-5 rounded-[2rem] border flex items-center justify-between transition-all duration-500 ${isDarkMode ? 'bg-[#0b1c30] border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-[#01c4a0] ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
                  <span className="material-symbols-outlined text-3xl">location_on</span>
                </div>
                <div>
                  <h3 className="font-bold">{place.name}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{place.category} • {place.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${place.status === 'Publié' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                    {place.status}
                </span>
                <div className="flex gap-2">
                    <button onClick={() => openEditModal(place)} className={`p-2 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-[#01c4a0]'}`}>
                        <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button onClick={() => {setActivePlace(place); setIsDeleteModalOpen(true);}} className={`p-2 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-red-400' : 'text-slate-400 hover:text-red-500'}`}>
                        <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* RENDER CONDITIONNEL SÉCURISÉ */}
      {isManageModalOpen && ManagePlaceModal && (
        <ManagePlaceModal 
          isOpen={isManageModalOpen} 
          onClose={() => setIsManageModalOpen(false)} 
          mode={modalMode}
          placeData={activePlace}
          isDarkMode={isDarkMode}
          onSave={(data) => console.log(data)} 
        />
      )}

      {isDeleteModalOpen && DeleteConfirmModal && (
        <DeleteConfirmModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          itemName={activePlace?.name}
          isDarkMode={isDarkMode}
          onConfirm={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}