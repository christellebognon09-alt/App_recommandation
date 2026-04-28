export default function Header() {
  return (
    <header className="w-full h-16 border-b sticky top-0 z-50 bg-white/95 backdrop-blur-md border-slate-200 shadow-sm flex justify-between items-center px-6">
      <div className="flex items-center gap-6">
        <span className="text-xl font-black text-blue-900 uppercase tracking-tighter">Explorer</span>
        <div className="relative hidden md:block">
          <input 
            className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-blue-500" 
            placeholder="Rechercher des lieux..." 
            type="text" 
          />
        </div>
      </div>
      <nav className="hidden md:flex gap-8 text-sm font-medium">
        <a href="#" className="text-blue-700 border-b-2 border-blue-700 pb-5">Gérer les lieux</a>
        <a href="#" className="text-slate-500 hover:text-slate-900">Découvrir</a>
        <a href="#" className="text-slate-500 hover:text-slate-900">Favoris</a>
      </nav>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white shadow-sm"></div>
      </div>
    </header>
  );
}