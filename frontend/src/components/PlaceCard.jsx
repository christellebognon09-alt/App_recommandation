import React from 'react';
import { Star, MapPin } from 'lucide-react';

const PlaceCard = ({ place, onClick }) => {
  return (
    <div className="place-card glass" onClick={onClick}>
      {place.image && (
        <img 
          src={`http://localhost:8000/storage/${place.image}`} 
          alt={place.name} 
          className="place-image"
        />
      )}
      <div className="place-info">
        <h3 style={{ marginBottom: '4px' }}>{place.name}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>
          {place.category?.name}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="rating">
            <Star size={16} fill="currentColor" />
            <span>{place.average_rating ? place.average_rating.toFixed(1) : 'New'}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '400' }}>
              ({place.reviews_count || 0})
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: var(--text-muted), fontSize: '0.8rem' }}>
            <MapPin size={14} />
            <span>Voir</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
