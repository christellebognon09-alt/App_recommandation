import React from 'react';
import PlaceCard from './PlaceCard';

const Sidebar = ({ 
  places, 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  searchQuery, 
  setSearchQuery,
  onPlaceClick 
}) => {
  return (
    <aside className="sidebar glass">
      <div className="sidebar-header">
        <h1 style={{ marginBottom: '16px', fontSize: '1.5rem', fontWeight: '700' }}>
          Découvrir
        </h1>
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Rechercher un lieu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="category-filter">
        <button 
          className={`category-pill ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => setSelectedCategory(null)}
        >
          Tous
        </button>
        {categories.map(cat => (
          <button 
            key={cat.id} 
            className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="place-list">
        {places.map(place => (
          <PlaceCard 
            key={place.id} 
            place={place} 
            onClick={() => onPlaceClick(place)} 
          />
        ))}
        {places.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '20px' }}>
            Aucun lieu trouvé
          </p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
