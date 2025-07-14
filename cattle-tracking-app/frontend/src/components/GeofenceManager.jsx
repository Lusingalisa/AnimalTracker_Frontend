// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Fix for default marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// function GeofenceMap({ geofences, onGeofenceCreate, onGeofenceDelete }) {
//   // ... (keep all the existing GeofenceMap component code)
// }

// function GeofenceManager() {
//   const [geofences, setGeofences] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchGeofences = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/geofences`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setGeofences(response.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch geofences');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchGeofences();
//   }, []);

//   const handleCreateGeofence = async (geofenceData) => {
//     try {
//       const token = localStorage.getItem('token');
//       const user = JSON.parse(localStorage.getItem('user'));
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/geofences`,
//         { ...geofenceData, user_id: user.user_id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
      
//       const updatedResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/geofences`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setGeofences(updatedResponse.data);
//       toast.success('Geofence created successfully');
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to create geofence');
//     }
//   };

//   const handleDeleteGeofence = async (zoneId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(
//         `${import.meta.env.VITE_API_URL}/api/geofences/${zoneId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setGeofences(geofences.filter(g => g.zone_id !== zoneId));
//       toast.success('Geofence deleted successfully');
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to delete geofence');
//     }
//   };

//   if (loading) return <div className="text-center my-5">Loading geofences...</div>;
//   if (error) return <div className="alert alert-danger">{error}</div>;

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="text-primary">Geofence Manager</h2>
//         <button 
//           className="btn btn-outline-secondary"
//           onClick={() => navigate(-1)} // Go back to previous page
//         >
//           Back to Dashboard
//         </button>
//       </div>
      
//       <div className="card shadow-sm mb-4">
//         <div className="card-body p-0" style={{ height: '500px' }}>
//           <MapContainer 
//             center={[0, 0]} 
//             zoom={2} 
//             style={{ height: '100%', width: '100%' }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             <GeofenceMap 
//               geofences={geofences} 
//               onGeofenceCreate={handleCreateGeofence}
//               onGeofenceDelete={handleDeleteGeofence}
//             />
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GeofenceManager;

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import GeofenceMap from './GeofenceMap';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function GeofenceManager() {
  const [geofences, setGeofences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [mapCenter] = useState([3.2190, 31.7588]); // Northern Uganda default center

  useEffect(() => {
    const fetchGeofences = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/geofences`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGeofences(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch geofences');
      } finally {
        setLoading(false);
      }
    };
    fetchGeofences();
  }, []);

  const handleCreateGeofence = async (geofenceData) => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/geofences`,
        { ...geofenceData, user_id: user.user_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const updatedResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/geofences`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGeofences(updatedResponse.data);
      toast.success('Geofence created successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create geofence');
    }
  };

  const handleDeleteGeofence = async (zoneId) => {
    if (!window.confirm('Are you sure you want to delete this geofence?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/geofences/${zoneId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGeofences(geofences.filter(g => g.zone_id !== zoneId));
      toast.success('Geofence deleted successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete geofence');
    }
  };

  if (loading) return <div className="text-center my-5">Loading geofences...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Geofence Manager</h2>
        <div>
          <button 
            className="btn btn-outline-secondary me-2"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button 
            className="btn btn-outline-primary"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
        </div>
      </div>
      
      <div className="card shadow-sm mb-4">
        <div className="card-body p-0" style={{ height: '70vh' }}>
          <MapContainer 
            center={mapCenter} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeofenceMap 
              geofences={geofences} 
              onGeofenceCreate={handleCreateGeofence}
              onGeofenceDelete={handleDeleteGeofence}
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default GeofenceManager;