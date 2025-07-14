import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Polygon } from 'react-leaflet';
import axios from 'axios';
import CattleIllustration from './CattleIllustration';

// Fix for default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapCenterHandler({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] !== 0 && center[1] !== 0) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

function CattleMap() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Fetching map data...');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cattle/map-data`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Map data received:', response.data);
        setLocations(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || 'Failed to fetch cattle locations');
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  if (loading) return <div className="text-center my-5">Loading map data...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const center = locations.length > 0 
    ? [locations[0].latitude, locations[0].longitude]
    : [0, 0];

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <CattleIllustration />
        <h2 className="text-primary">Cattle Locations Map</h2>
      </div>
      
      <div className="card shadow-sm mb-4">
        <div className="card-body p-0" style={{ height: '500px' }}>
          <MapContainer 
            center={center} 
            zoom={10} 
            style={{ height: '100%', width: '100%' }}
            whenCreated={(map) => {
              if (locations.length > 0) {
                map.setView(center, 10);
              }
            }}
          >
            <MapCenterHandler center={center} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((cow) => (
              <Marker 
                key={cow.cattle_id} 
                position={[cow.latitude, cow.longitude]}
                eventHandlers={{
                  click: () => {
                    console.log('Marker clicked:', cow);
                  },
                }}
              >
                <Popup>
                  <div>
                    <h6 className="text-primary">{cow.name || `Cattle #${cow.cattle_id}`}</h6>
                    <p>Status: <span className={`badge ${cow.status === 'safe' ? 'bg-success' : cow.status === 'alerted' ? 'bg-warning' : 'bg-danger'}`}>
                      {cow.status}
                    </span></p>
                    <p>Last updated: {new Date(cow.last_updated).toLocaleString()}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default CattleMap; 

