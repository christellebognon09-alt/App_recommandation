import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import Navbar from './components/Navbar';
import axios from 'axios';
import AddPlaceModal from './components/AddPlaceModal';

// Base configuration for Axios
axios.defaults.baseURL = 'http://localhost:8000/api';

function App() {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchPlaces();
    fetchCategories();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get('/places');
      setPlaces(response.data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredPlaces = places.filter(place => {
    const matchesCategory = selectedCategory ? place.category_id === selectedCategory : true;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-shell">
      <Navbar onAddClick={() => setIsAddModalOpen(true)} />
      <div className="app-container">
        <Sidebar 
          places={filteredPlaces} 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onPlaceClick={setSelectedPlace}
        />
        <main className="map-view">
          <MapView 
            places={filteredPlaces} 
            selectedPlace={selectedPlace}
            onMarkerClick={setSelectedPlace}
          />
        </main>
      </div>
      
      <AddPlaceModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        categories={categories}
        onPlaceAdded={fetchPlaces}
      />
    </div>
  );
}

export default App;
