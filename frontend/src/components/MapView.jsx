import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

const MapView = ({ places, selectedPlace, onMarkerClick }) => {
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [activeMarkerPlace, setActiveMarkerPlace] = useState(null);

  // Default center (can be user's location)
  const defaultCenter = { lat: 48.8566, lng: 2.3522 }; // Paris example

  return (
    <APIProvider apiKey={'YOUR_GOOGLE_MAPS_API_KEY'}>
      <Map
        style={{ width: '100%', height: '100%' }}
        defaultCenter={defaultCenter}
        defaultZoom={13}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={'DEMO_MAP_ID'} // Required for Advanced Markers
      >
        {places.map(place => (
          <AdvancedMarker
            key={place.id}
            position={{ lat: parseFloat(place.latitude), lng: parseFloat(place.longitude) }}
            onClick={() => {
              onMarkerClick(place);
              setActiveMarkerPlace(place);
              setInfoWindowShown(true);
            }}
          >
            <Pin 
              background={selectedPlace?.id === place.id ? '#a855f7' : '#6366f1'} 
              borderColor={'#fff'} 
              glyphColor={'#fff'} 
            />
          </AdvancedMarker>
        ))}

        {infoWindowShown && activeMarkerPlace && (
          <InfoWindow
            position={{ lat: parseFloat(activeMarkerPlace.latitude), lng: parseFloat(activeMarkerPlace.longitude) }}
            onCloseClick={() => setInfoWindowShown(false)}
          >
            <div style={{ color: '#1e293b', padding: '4px' }}>
              <h4 style={{ margin: '0 0 4px 0' }}>{activeMarkerPlace.name}</h4>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>{activeMarkerPlace.category?.name}</p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};

export default MapView;
