import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const AddPlaceModal = ({ isOpen, onClose, categories, onPlaceAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    latitude: '',
    longitude: '',
    category_id: '',
    image: null
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post('/places', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onPlaceAdded();
      onClose();
    } catch (error) {
      console.error('Error adding place:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass">
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
        >
          <X size={24} />
        </button>
        
        <h2 style={{ marginBottom: '24px' }}>Ajouter un nouveau lieu</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom du lieu</label>
            <input 
              type="text" 
              className="form-input" 
              required
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label>Latitude</label>
              <input 
                type="number" 
                step="any" 
                className="form-input" 
                required
                onChange={(e) => setFormData({...formData, latitude: e.target.value})}
              />
            </div>
            <div>
              <label>Longitude</label>
              <input 
                type="number" 
                step="any" 
                className="form-input" 
                required
                onChange={(e) => setFormData({...formData, longitude: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Catégorie</label>
            <select 
              className="form-input" 
              required
              onChange={(e) => setFormData({...formData, category_id: e.target.value})}
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              className="form-input" 
              rows="3" 
              required
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Image (Optionnel)</label>
            <input 
              type="file" 
              className="form-input" 
              onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>
            Enregistrer le lieu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPlaceModal;
