import { useState, useEffect } from 'react';
import { Polygon, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

function GeofenceMap({ geofences, onGeofenceCreate, onGeofenceDelete }) {
  const [drawing, setDrawing] = useState(false);
  const [tempPolygon, setTempPolygon] = useState([]);
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const handleClick = (e) => {
      if (!drawing) return;
      setTempPolygon([...tempPolygon, [e.latlng.lat, e.latlng.lng]]);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDrawing(false);
        setTempPolygon([]);
      }
    };

    map.on('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      map.off('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [map, drawing, tempPolygon]);

  const startDrawing = () => {
    setDrawing(true);
    setTempPolygon([]);
  };

  const finishDrawing = () => {
    if (tempPolygon.length < 3) {
      alert('A geofence requires at least 3 points');
      return;
    }

    const zoneName = prompt('Enter geofence name:');
    if (!zoneName) return;

    const zoneType = prompt('Enter zone type (pasture/danger/restricted/custom):', 'pasture');
    if (!zoneType) return;

    const zoneColor = prompt('Enter zone color (hex format, e.g. #FF0000):', '#FF0000');

    onGeofenceCreate({
      zone_name: zoneName,
      zone_type: zoneType,
      zone_color: zoneColor,
      coordinates: tempPolygon.map(([lat, lng]) => ({ latitude: lat, longitude: lng }))
    });

    setDrawing(false);
    setTempPolygon([]);
  };

  return (
    <>
      {drawing && (
        <div className="leaflet-top leaflet-right">
          <div className="leaflet-control leaflet-bar">
            <button 
              className="btn btn-sm btn-success"
              onClick={finishDrawing}
              style={{ margin: '5px' }}
            >
              Finish Drawing
            </button>
          </div>
        </div>
      )}
      
      {!drawing && (
        <div className="leaflet-top leaflet-right">
          <div className="leaflet-control leaflet-bar">
            <button 
              className="btn btn-sm btn-primary"
              onClick={startDrawing}
              style={{ margin: '5px' }}
            >
              Draw New Geofence
            </button>
          </div>
        </div>
      )}

      {tempPolygon.length > 0 && (
        <Polygon
          positions={tempPolygon}
          color="#3388ff"
          fillOpacity={0.2}
        />
      )}

      {geofences.map((geofence) => {
        const positions = geofence.coordinates.map(coord => [coord.latitude, coord.longitude]);
        return (
          <Polygon
            key={geofence.zone_id}
            positions={positions}
            color={geofence.zone_color || '#FF0000'}
            fillOpacity={0.4}
          >
            <Popup>
              <div>
                <h6>{geofence.zone_name}</h6>
                <p>Type: {geofence.zone_type}</p>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => onGeofenceDelete(geofence.zone_id)}
                >
                  Delete
                </button>
              </div>
            </Popup>
          </Polygon>
        );
      })}
    </>
  );
}

export default GeofenceMap;