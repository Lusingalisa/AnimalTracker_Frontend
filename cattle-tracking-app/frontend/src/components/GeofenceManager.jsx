import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function GeofenceMap({ geofences, onGeofenceCreate, onGeofenceDelete }) {
  const [drawing, setDrawing] = useState(false);
  const [tempPolygon, setTempPolygon] = useState([]);
  const map = useMap();

  useEffect(() => {
    if (!drawing) return;

    const handleClick = (e) => {
      setTempPolygon(prev => [...prev, e.latlng]);
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [drawing, map]);

  const handleDrawStart = () => {
    setDrawing(true);
    setTempPolygon([]);
  };

  const handleDrawComplete = async () => {
    if (tempPolygon.length < 3) {
      toast.error('A geofence requires at least 3 points');
      return;
    }

    const zoneName = prompt('Enter geofence name:');
    if (!zoneName) return;

    const zoneType = prompt('Enter zone type (pasture/danger/restricted/custom):', 'pasture');
    if (!['pasture', 'danger', 'restricted', 'custom'].includes(zoneType)) {
      toast.error('Invalid zone type');
      return;
    }

    try {
      await onGeofenceCreate({
        zone_name: zoneName,
        zone_type: zoneType,
        coordinates: tempPolygon.map(latlng => ({
          latitude: latlng.lat,
          longitude: latlng.lng
        }))
      });
      setDrawing(false);
      setTempPolygon([]);
    } catch (err) {
      toast.error('Failed to create geofence');
    }
  };

  return (
    <>
      <div className="map-controls">
        <button 
          className={`btn btn-sm ${drawing ? 'btn-danger' : 'btn-primary'}`}
          onClick={drawing ? () => setDrawing(false) : handleDrawStart}
        >
          {drawing ? 'Cancel Drawing' : 'Draw Geofence'}
        </button>
        {drawing && tempPolygon.length > 0 && (
          <button className="btn btn-sm btn-success ms-2" onClick={handleDrawComplete}>
            Complete Geofence
          </button>
        )}
      </div>

      {/* Render existing geofences */}
      {geofences.map(zone => (
        <Polygon
          key={zone.zone_id}
          positions={zone.coordinates.map(c => [c.latitude, c.longitude])}
          color={zone.zone_color || '#FF0000'}
          eventHandlers={{
            click: () => {
              if (confirm(`Delete ${zone.zone_name}?`)) {
                onGeofenceDelete(zone.zone_id);
              }
            }
          }}
        >
          <Popup>
            <div>
              <h6>{zone.zone_name}</h6>
              <p>Type: {zone.zone_type}</p>
              <p>Points: {zone.coordinates.length}</p>
            </div>
          </Popup>
        </Polygon>
      ))}

      {/* Render temporary drawing polygon */}
      {tempPolygon.length > 0 && (
        <Polygon
          positions={tempPolygon}
          color="#00FF00"
          dashArray="5, 5"
        />
      )}
    </>
  );
}

function GeofenceManager() {
  const [geofences, setGeofences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/geofences`,
        { ...geofenceData, user_id: user.user_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refresh geofences
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

  if (loading) return <div>Loading geofences...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Geofence Management</h5>
      </div>
      <div className="card-body p-0" style={{ height: '500px' }}>
        <MapContainer 
          center={[0, 0]} 
          zoom={2} 
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
  );
}

export default GeofenceManager;