import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import api from '../api/axios';

// --- CONFIGURATION DES ICONES ---
const userIcon = L.icon({ 
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', 
  iconSize: [25, 41], iconAnchor: [12, 41] 
});

const placeIcon = L.icon({ 
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', 
  iconSize: [25, 41], iconAnchor: [12, 41] 
});

function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 15, { animate: true });
  }, [center, map]);
  return null;
}

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const [activeMenu, setActiveMenu] = useState(null);
  const [search, setSearch] = useState("");
  
  // --- MODIFICATION ICI : Initialisation intelligente du thème ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    try {
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [activeFilter, setActiveFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [userPos, setUserPos] = useState([6.4481, 2.3481]); 
  const [mapCenter, setMapCenter] = useState([6.4481, 2.3481]); 
  const [nearbyPlaces, setNearbyPlaces] = useState([]); 
  const [mySavedPlaces, setMySavedPlaces] = useState([
    { id: 1, name: "Mon Bureau - SIL", cat: "TRAVAIL", lat: 6.449, lon: 2.350 }
  ]);

  // --- MODIFICATION ICI : Persistance et application du thème ---
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('theme', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (err) {
      console.error("Erreur logout");
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const handleSearchArea = async (e) => {
    if (e) e.preventDefault();
    if (!search) return;
    setLoading(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${search}&limit=1`);
      const data = await res.json();
      if (data.length > 0) {
        const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        setMapCenter(coords);
        setNearbyPlaces([]); 
        setActiveFilter(null);
        if (location.pathname !== '/home') navigate('/home');
      } else {
        alert("Quartier ou ville non trouvé.");
      }
    } catch (err) {
      console.error("Erreur recherche zone:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNearby = async (category) => {
    setActiveFilter(category);
    setLoading(true);
    const tags = { 'RESTAURANT': 'restaurant', 'HÔTEL': 'hotel', 'SANTÉ': 'hospital', 'SPORT': 'gym' };
    const query = `[out:json];(node["amenity"="${tags[category]}"](around:3000,${mapCenter[0]},${mapCenter[1]});way["amenity"="${tags[category]}"](around:3000,${mapCenter[0]},${mapCenter[1]}););out center;`;
    try {
      const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
      const data = await res.json();
      const results = data.elements.map(el => ({
        id: el.id,
        name: el.tags.name || `${category}`,
        lat: el.lat || el.center.lat,
        lon: el.lon || el.center.lon,
        cat: category
      }));
      setNearbyPlaces(results);
    } catch (err) {
      console.error("Erreur Overpass:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const newLieu = {
        id: Date.now(),
        name: `Lieu enregistré (${new Date().toLocaleTimeString()})`,
        cat: "FAVORI",
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      };
      setMySavedPlaces([newLieu, ...mySavedPlaces]);
      setUserPos([pos.coords.latitude, pos.coords.longitude]);
      setMapCenter([pos.coords.latitude, pos.coords.longitude]);
      alert("Position actuelle enregistrée avec succès !");
    }, () => alert("Impossible d'accéder à votre position GPS."));
  };

  return (
    <div className={`h-screen w-full flex flex-col transition-colors duration-500 ${isDarkMode ? 'bg-[#050c14] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      <header className={`w-full h-16 border-b flex justify-between items-center px-6 z-[5000] transition-colors duration-500 ${isDarkMode ? 'bg-[#0b1c30] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-black text-[#01c4a0]">GeoSmart</h1>
          <nav className="hidden md:flex gap-6 h-full pt-5">
            <Link to="/home" className={`text-sm font-bold ${location.pathname === '/home' ? (isDarkMode ? 'text-white border-[#01c4a0]' : 'text-slate-900 border-[#01c4a0]') : 'text-slate-500'} border-b-2 pb-5 transition-all`}>Accueil</Link>
            <Link to="/my-places" className={`text-sm font-bold ${location.pathname === '/my-places' ? (isDarkMode ? 'text-white border-[#01c4a0]' : 'text-slate-900 border-[#01c4a0]') : 'text-slate-500'} border-b-2 pb-5 transition-all`}>Mes Lieux</Link>
            <Link to="/favorites" className={`text-sm font-bold ${location.pathname === '/favorites' ? (isDarkMode ? 'text-white border-[#01c4a0]' : 'text-slate-900 border-[#01c4a0]') : 'text-slate-500'} border-b-2 pb-5 transition-all`}>Favoris</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4 relative">
          <button onClick={() => setActiveMenu(activeMenu === 'notif' ? null : 'notif')} className="p-2 text-slate-400 hover:text-white"><span className="material-symbols-outlined">notifications</span></button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-slate-700 cursor-pointer" onClick={() => setActiveMenu(activeMenu === 'profile' ? null : 'profile')}>
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black uppercase">{user ? user.name : 'Chargement...'}</p>
              <p className="text-[9px] text-[#01c4a0] font-bold">SIL - CONNECTÉ</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#004d40] border-2 border-[#01c4a0] flex items-center justify-center font-bold">
               {user ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>

          {activeMenu === 'profile' && (
            <div className={`absolute right-0 top-14 w-60 shadow-2xl rounded-2xl p-3 z-[6000] ${isDarkMode ? 'bg-[#1a2c3d] text-white border border-slate-700' : 'bg-white text-slate-900 border'}`}>
              <div className="px-3 py-2 mb-2 border-b border-slate-700/50">
                <p className="text-[10px] font-bold text-[#01c4a0] uppercase">Session active</p>
                <p className="text-xs font-medium truncate">{user?.email}</p>
              </div>
              <button onClick={() => navigate('/profile')} className="w-full text-left p-3 hover:bg-slate-500/10 rounded-xl text-xs font-bold flex items-center gap-3"><span className="material-symbols-outlined text-sm">person</span> Mon Profil</button>
              <button onClick={() => { setIsDarkMode(!isDarkMode); setActiveMenu(null); }} className="w-full text-left p-3 hover:bg-slate-500/10 rounded-xl text-xs font-bold flex items-center gap-3"><span className="material-symbols-outlined text-sm">settings</span> Paramètres (Thème)</button>
              <hr className="my-1 border-slate-700/50" />
              <button onClick={handleLogout} className="w-full text-left p-3 text-red-500 rounded-xl text-xs font-bold flex items-center gap-3"><span className="material-symbols-outlined text-sm">logout</span> Déconnexion</button>
            </div>
          )}
        </div>
      </header>

      <main className="flex flex-grow overflow-hidden relative">
        <aside className={`w-[350px] h-full z-[100] p-6 flex flex-col border-r transition-colors duration-500 ${isDarkMode ? 'bg-[#0b1c30] border-slate-800' : 'bg-white border-slate-200 shadow-xl'}`}>
          <button onClick={handleSaveLocation} className="w-full py-4 bg-[#00685f] text-white rounded-xl font-black text-[11px] uppercase shadow-lg hover:scale-[1.02] active:scale-95 transition-all mb-8">
              + Enregistrer ma position
          </button>
          
          <div className="flex-grow overflow-y-auto space-y-4 no-scrollbar">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              {location.pathname === '/home' ? '📍 Résultats' : '📚 Ma Liste'}
            </h3>
            
            {(location.pathname === '/home' ? nearbyPlaces : mySavedPlaces).map(p => (
              <div key={p.id} onClick={() => setMapCenter([p.lat, p.lon])} className={`p-4 rounded-xl border border-transparent hover:border-[#01c4a0] cursor-pointer transition-all ${isDarkMode ? 'bg-slate-800/30' : 'bg-slate-50 shadow-sm'}`}>
                <h4 className="font-bold text-sm">{p.name}</h4>
                <p className="text-[9px] text-[#01c4a0] font-bold uppercase mt-1 italic">{p.cat}</p>
              </div>
            ))}
          </div>
        </aside>

        <section className="flex-grow relative overflow-hidden">
          <MapContainer center={mapCenter} zoom={13} className="absolute inset-0 z-0" zoomControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapController center={mapCenter} />
            <Marker position={userPos} icon={userIcon}><Popup>Ma Position Réelle</Popup></Marker>
            {(location.pathname === '/home' ? nearbyPlaces : mySavedPlaces).map(p => (
              <Marker key={p.id} position={[p.lat, p.lon]} icon={placeIcon}><Popup>{p.name}</Popup></Marker>
            ))}
          </MapContainer>

          <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center">
            <form onSubmit={handleSearchArea} className="mt-8 w-full max-w-xl px-6 pointer-events-auto">
              <div className={`rounded-full shadow-2xl flex items-center px-6 h-16 border transition-all ${isDarkMode ? 'bg-[#1a2c3d] border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className={`material-symbols-outlined text-[#01c4a0] mr-4 cursor-pointer ${loading ? 'animate-spin' : ''}`} onClick={handleSearchArea}>
                  {loading ? 'sync' : 'search'}
                </span>
                <input 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                  placeholder="Étape 1: Chercher un quartier (ex: Fidjrossè, Calavi...)" 
                  className="bg-transparent w-full text-sm font-bold outline-none border-none focus:ring-0 text-inherit" 
                />
              </div>
            </form>

            <div className="mt-4 flex gap-2 pointer-events-auto">
              {['RESTAURANT', 'HÔTEL', 'SANTÉ', 'SPORT'].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => fetchNearby(cat)} 
                  className={`px-5 py-2.5 rounded-full text-[10px] font-black shadow-xl transition-all uppercase ${activeFilter === cat ? 'bg-[#01c4a0] text-white scale-105' : (isDarkMode ? 'bg-[#1a2c3d] text-white' : 'bg-white text-slate-900') + ' hover:bg-[#01c4a0] hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="absolute bottom-10 right-8 pointer-events-auto">
              <button 
                onClick={() => navigator.geolocation.getCurrentPosition(p => setMapCenter([p.coords.latitude, p.coords.longitude]))} 
                className={`w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center text-[#01c4a0] hover:scale-110 active:scale-95 transition-all ${isDarkMode ? 'bg-[#1a2c3d]' : 'bg-white'}`}
              >
                <span className="material-symbols-outlined text-3xl">my_location</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}