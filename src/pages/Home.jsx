import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddPlaceModal from '../components/AddPlaceModal';

export default function Home() {
  const navigate = useNavigate();

  // --- ÉTATS (STATES) ---
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  
  // États pour les menus déroulants
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // États pour les paramètres (avec récupération du stockage local)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  const [language, setLanguage] = useState(
    localStorage.getItem('lang') || "Français"
  );

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Nouveau lieu validé : Place de l'Amazone", time: "Il y a 5 min", unread: true },
    { id: 2, text: "Bienvenue sur GeoSmart !", time: "Il y a 1h", unread: false },
  ]);

  const categories = [
    { id: 'restaurant', label: 'Restaurants', icon: 'restaurant' },
    { id: 'hotel', label: 'Hôtels', icon: 'hotel' },
    { id: 'pharmacy', label: 'Pharmacies', icon: 'local_pharmacy' },
    { id: 'tourism', label: 'Tourisme', icon: 'attractions' },
  ];

  // --- EFFETS (EFFECTS) ---
  useEffect(() => {
    // Appliquer le mode sombre au body
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  // --- FONCTIONS ---
  const closeAllMenus = () => {
    setIsNotifOpen(false);
    setIsSettingsOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm("Voulez-vous vous déconnecter ?")) {
      // Vider les données de session si nécessaire
      // localStorage.removeItem('userToken');
      navigate('/');
    }
  };

  return (
    <div className={`h-screen font-sans overflow-hidden flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-[#0b1c30] text-white' : 'bg-[#f8f9ff] text-[#0b1c30]'}`}>
      
      {/* 1. BARRE DE NAVIGATION (HEADER) */}
      <header className={`w-full h-16 border-b sticky top-0 z-50 backdrop-blur-md flex justify-between items-center px-6 ${isDarkMode ? 'bg-[#0b1c30]/95 border-slate-700' : 'bg-white/95 border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-8">
          <Link to="/home" className="text-xl font-black text-[#00685f] tracking-tighter">GeoSmart</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/home" className={`text-sm font-bold border-b-2 border-[#00685f] pb-5 text-[#00685f]`}>Accueil</Link>
            <Link to="/my-places" className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#00685f]'}`}>Gérer les lieux</Link>
            <Link to="/favorites" className="text-sm font-medium text-slate-500 hover:text-[#00685f] transition-colors">Favoris</Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          
          {/* MENU NOTIFICATIONS */}
          <div className="relative">
            <button 
              onClick={() => { closeAllMenus(); setIsNotifOpen(!isNotifOpen); }}
              className={`p-2.5 rounded-full transition-all relative ${isNotifOpen ? 'bg-[#00685f]/10 text-[#00685f]' : 'hover:bg-slate-100/50 text-slate-500'}`}
            >
              <span className="material-symbols-outlined">notifications</span>
              {notifications.some(n => n.unread) && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>

            {isNotifOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={closeAllMenus}></div>
                <div className={`absolute right-0 mt-3 w-80 shadow-2xl rounded-[2rem] overflow-hidden z-20 animate-in fade-in zoom-in duration-200 border ${isDarkMode ? 'bg-[#162a41] border-slate-700' : 'bg-white border-slate-100'}`}>
                  <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50/30 border-slate-50'}`}>
                    <h3 className="font-black text-sm">Notifications</h3>
                    <span className="text-[10px] bg-[#00685f]/10 text-[#00685f] px-2 py-1 rounded-full font-bold">
                      {notifications.filter(n => n.unread).length} Nouvelles
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`p-4 border-b transition-colors cursor-pointer ${isDarkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-50 hover:bg-slate-50'}`}>
                        <p className={`text-xs font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{notif.text}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* MENU PARAMÈTRES */}
          <div className="relative">
            <button 
              onClick={() => { closeAllMenus(); setIsSettingsOpen(!isSettingsOpen); }}
              className={`p-2.5 rounded-full transition-all ${isSettingsOpen ? 'bg-[#00685f]/10 text-[#00685f]' : 'hover:bg-slate-100/50 text-slate-500'}`}
            >
              <span className="material-symbols-outlined">settings</span>
            </button>

            {isSettingsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={closeAllMenus}></div>
                <div className={`absolute right-0 mt-3 w-64 shadow-2xl rounded-[2rem] overflow-hidden z-20 animate-in fade-in zoom-in duration-200 border ${isDarkMode ? 'bg-[#162a41] border-slate-700' : 'bg-white border-slate-100'}`}>
                  <div className={`p-5 border-b ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50/30 border-slate-50'}`}>
                    <h3 className="font-black text-sm text-[#00685f]">Paramètres</h3>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={() => setLanguage(language === "Français" ? "English" : "Français")}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-50 text-slate-700'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-xl">language</span>
                        <span className="text-xs font-bold">Langue</span>
                      </div>
                      <span className="text-[9px] font-black uppercase text-[#00685f]">{language}</span>
                    </button>
                    
                    <button 
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-50 text-slate-700'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-xl">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
                        <span className="text-xs font-bold">Mode sombre</span>
                      </div>
                      <div className={`w-8 h-4 rounded-full relative transition-colors ${isDarkMode ? 'bg-[#00685f]' : 'bg-slate-200'}`}>
                        <div className={`absolute top-1 w-2 h-2 bg-white rounded-full transition-all ${isDarkMode ? 'right-1' : 'left-1'}`}></div>
                      </div>
                    </button>

                    <div className={`h-px my-2 mx-3 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}></div>
                    
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-2xl transition-colors text-red-500">
                      <span className="material-symbols-outlined text-xl">logout</span>
                      <span className="text-xs font-bold">Déconnexion</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <Link to="/profile" className={`flex items-center gap-3 pl-4 border-l group ml-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className="text-right hidden sm:block">
              <p className={`text-[11px] font-black group-hover:text-[#00685f] transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Utilisateur SIL</p>
              <p className="text-[9px] text-slate-400 uppercase font-bold">Cotonou, Bénin</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#00685f]/10 flex items-center justify-center border border-[#00685f]/20 group-hover:border-[#00685f] transition-all text-[#00685f]">
              <span className="material-symbols-outlined">person</span>
            </div>
          </Link>
        </div>
      </header>

      <main className="relative flex flex-grow overflow-hidden">
        
        {/* 2. BARRE LATÉRALE (SIDEBAR) */}
        <aside className={`w-[400px] h-full border-r shadow-sm flex flex-col z-40 ${isDarkMode ? 'bg-[#0b1c30] border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className={`p-6 border-b ${isDarkMode ? 'border-slate-700 bg-slate-900/20' : 'border-slate-100 bg-slate-50/50'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#00685f] flex items-center justify-center text-white shadow-lg">
                <span className="material-symbols-outlined">explore</span>
              </div>
              <div>
                <h2 className="font-bold text-sm">Exploration Locale</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">GeoSmart App</p>
              </div>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="w-full py-3.5 bg-[#00685f] text-white rounded-2xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
               <span className="material-symbols-outlined text-sm">add_location_alt</span> Ajouter un nouveau lieu
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
            <h3 className="px-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              {activeFilter ? `Résultats : ${activeFilter}` : "Lieux recommandés"}
            </h3>
            <div className={`group rounded-3xl p-3 border transition-all cursor-pointer ${isDarkMode ? 'bg-slate-800/40 border-transparent hover:border-slate-600' : 'bg-slate-50 border-transparent hover:border-slate-200 hover:shadow-xl'}`}>
              <div className="relative h-36 w-full bg-slate-300/20 rounded-2xl overflow-hidden mb-3">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined text-4xl">map_search</span>
                </div>
              </div>
              <h4 className="font-bold text-sm">Place de l'Amazone</h4>
              <p className="text-[11px] text-slate-500">Cotonou • 2.4 km</p>
            </div>
          </div>
        </aside>

        {/* 3. ZONE CARTE (MAP) */}
        <section className={`flex-grow relative overflow-hidden ${isDarkMode ? 'bg-[#0f243a]' : 'bg-[#eef2ff]'}`}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(${isDarkMode ? '#ffffff' : '#00685f'} 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div>
          
          <div className="absolute top-8 left-0 right-0 z-30 flex flex-col gap-4 items-center px-6">
            <div className={`rounded-3xl shadow-2xl flex items-center px-6 h-16 w-full max-w-xl transition-all focus-within:ring-4 focus-within:ring-[#00685f]/10 ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100'}`}>
              <span className="material-symbols-outlined text-[#00685f] mr-4">search</span>
              <input 
                className="bg-transparent border-none focus:ring-0 w-full text-sm font-bold placeholder-slate-400" 
                placeholder="Rechercher à Cotonou..." 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-2 overflow-x-auto max-w-full no-scrollbar pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-md whitespace-nowrap
                    ${activeFilter === cat.id ? 'bg-[#00685f] text-white' : (isDarkMode ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-white text-slate-600 border border-slate-100')}`}
                >
                  <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="absolute bottom-10 right-8 flex flex-col gap-3 z-30">
            <button className={`w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center border transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-[#00685f] hover:bg-slate-700' : 'bg-white border-slate-100 text-[#00685f] hover:bg-slate-50'}`}>
              <span className="material-symbols-outlined font-bold">my_location</span>
            </button>
          </div>
        </section>
      </main>

      <AddPlaceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}