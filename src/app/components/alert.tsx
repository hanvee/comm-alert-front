'use client'; // Menandai bahwa komponen ini adalah Client Component

import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faComment } from '@fortawesome/free-solid-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo';

const containerStyle = {
  width: '100%', // Set full width initially
  height: '500px'
};

const containerStyleWithSidebar = {
  width: 'calc(100% - 300px)', // Adjust width for sidebar
  height: '500px'
};

const sidebarStyle: React.CSSProperties = {
  width: '300px',
  height: '500px',
  position: 'fixed',
  right: '0',
  top: '0',
  backgroundColor: '#f8f9fa',
  boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
  padding: '20px',
  overflowY: 'auto' // Ensure this is a valid value
};

const center = {
  lat: -6.2,
  lng: 106.8
};

const libraries = ['places']; // Array of library names

const AlertContent: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState(''); // State to store the input value
  const [sidebarVisible, setSidebarVisible] = useState(false); // State to control sidebar visibility
  const [placeDetails, setPlaceDetails] = useState<string>(''); // State to store place details
  const [infoInputVisible, setInfoInputVisible] = useState(false); // State to control info input sidebar visibility

  useEffect(() => {
    // Initialize the map
  }, []);

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const newPosition = {
          lat: place.geometry.location?.lat() || center.lat,
          lng: place.geometry.location?.lng() || center.lng
        };
        setMarkerPosition(newPosition);
        setPlaceDetails(place.formatted_address || 'No details available'); // Set place details
        setSidebarVisible(true); // Show sidebar
        if (map) {
          map.panTo(newPosition); 
          map.setZoom(15);
        }
      }
    }
  };

  const handleSubmit = () => {
    // Trigger place change manually
    if (autocomplete) {
      onPlaceChanged();
    } else {
      console.log('Autocomplete not loaded');
    }
  };

  const handleInfoClick = () => {
    setInfoInputVisible(true); // Show info input sidebar
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
      libraries={libraries} // Correctly pass the array of libraries
    >
      <div style={{ position: 'relative', display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginLeft: '10px' }}>
            <Autocomplete
              onLoad={(autocomplete) => {
                console.log('Autocomplete loaded'); // Debugging: Log autocomplete loaded
                setAutocomplete(autocomplete);
              }}
              onPlaceChanged={onPlaceChanged} // Ensure place change is handled
            >
              <input
                type="text"
                placeholder="Search to find information"
                style={{ border: '1px solid black', borderRadius: '5px', padding: '10px', marginRight: '10px', flex: 1 }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </Autocomplete>
            <button
              onClick={handleSubmit}
              style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none' }}
            >
              Search
            </button>
          </div>
          <GoogleMap
            mapContainerStyle={sidebarVisible || infoInputVisible ? containerStyleWithSidebar : containerStyle} // Adjust container style based on sidebar visibility
            center={markerPosition}
            zoom={2}
            onLoad={onLoad}
          >
            <Marker position={markerPosition} />
            <button
              onClick={handleInfoClick}
              style={{
                position: 'absolute',
                top: '60px', 
                right: '10px',
                padding: '12px',
                borderRadius: '10%',
                backgroundColor: 'white',
                color: 'black',
                border: 'none',
                zIndex: 5,
                cursor: 'pointer'
              }}
            >
              <FontAwesomeIcon icon={faCircleInfo} />
            </button>
          </GoogleMap>
        </div>
        {sidebarVisible && (
          <div style={sidebarStyle}>
            <h1 className='text-xl font-bold'>Location: {placeDetails}</h1>
            <p></p>
            <button onClick={() => setSidebarVisible(false)} style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#dc3545', color: 'white', border: 'none' }}>
              Close
            </button>
          </div>
        )}
        {infoInputVisible && (
          <div style={sidebarStyle}>
            <h2>Add Information</h2>
            <textarea style={{ width: '100%', height: '200px', marginBottom: '10px' }} placeholder="Enter information about this location"></textarea>
            <button onClick={() => setInfoInputVisible(false)}>
              Close
            </button>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default AlertContent;
