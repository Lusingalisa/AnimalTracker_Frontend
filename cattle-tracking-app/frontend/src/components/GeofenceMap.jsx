
// import { useState, useEffect } from 'react';
// import { Polygon, Popup, useMap } from 'react-leaflet';
// import L from 'leaflet';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { toast } from 'react-toastify';

// function GeofenceMap({ geofences, onGeofenceCreate, onGeofenceDelete }) {
//   const [drawing, setDrawing] = useState(false);
//   const [tempPolygon, setTempPolygon] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [zoneName, setZoneName] = useState('');
//   const [zoneType, setZoneType] = useState('pasture');
//   const [zoneColor, setZoneColor] = useState('#FF0000');
//   const map = useMap();

//   useEffect(() => {
//     if (!map) return;

//     const handleClick = (e) => {
//       if (!drawing) return;
//       setTempPolygon([...tempPolygon, [e.latlng.lat, e.latlng.lng]]);
//     };

//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') {
//         setDrawing(false);
//         setTempPolygon([]);
//       }
//     };

//     map.on('click', handleClick);
//     window.addEventListener('keydown', handleKeyDown);

//     return () => {
//       map.off('click', handleClick);
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [map, drawing, tempPolygon]);

//   const startDrawing = () => {
//     setDrawing(true);
//     setTempPolygon([]);
//   };

//   const finishDrawing = () => {
//     if (tempPolygon.length < 3) {
//       toast.error('A geofence requires at least 3 points');
//       return;
//     }
//     setShowModal(true);
//   };

//   const handleCreateGeofence = () => {
//     if (!zoneName.trim()) {
//       toast.error('Please enter a geofence name');
//       return;
//     }

//     onGeofenceCreate({
//       zone_name: zoneName,
//       zone_type: zoneType,
//       zone_color: zoneColor,
//       coordinates: tempPolygon.map(([lat, lng]) => ({ latitude: lat, longitude: lng }))
//     });

//     setShowModal(false);
//     setDrawing(false);
//     setTempPolygon([]);
//     setZoneName('');
//     setZoneType('pasture');
//     setZoneColor('#FF0000');
//   };

//   return (
//     <>
//       {drawing && (
//         <div className="leaflet-top leaflet-right">
//           <div className="leaflet-control leaflet-bar">
//             <button 
//               className="btn btn-sm btn-success"
//               onClick={finishDrawing}
//               style={{ margin: '5px' }}
//             >
//               Finish Drawing
//             </button>
//           </div>
//         </div>
//       )}
      
//       {!drawing && (
//         <div className="leaflet-top leaflet-right">
//           <div className="leaflet-control leaflet-bar">
//             <button 
//               className="btn btn-sm btn-primary"
//               onClick={startDrawing}
//               style={{ margin: '5px' }}
//             >
//               Draw New Geofence
//             </button>
//           </div>
//         </div>
//       )}

//       {tempPolygon.length > 0 && (
//         <Polygon
//           positions={tempPolygon}
//           color="#3388ff"
//           fillOpacity={0.2}
//         />
//       )}

//       {geofences.map((geofence) => {
//         const positions = geofence.coordinates.map(coord => [coord.latitude, coord.longitude]);
//         return (
//           <Polygon
//             key={geofence.zone_id}
//             positions={positions}
//             color={geofence.zone_color || '#FF0000'}
//             fillOpacity={0.4}
//           >
//             <Popup>
//               <div>
//                 <h6>{geofence.zone_name}</h6>
//                 <p>Type: {geofence.zone_type}</p>
//                 <button 
//                   className="btn btn-sm btn-danger"
//                   onClick={() => onGeofenceDelete(geofence.zone_id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </Popup>
//           </Polygon>
//         );
//       })}

//       {/* Geofence Creation Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create Geofence</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Geofence Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={zoneName}
//                 onChange={(e) => setZoneName(e.target.value)}
//                 placeholder="Enter geofence name"
//                 autoFocus
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Zone Type</Form.Label>
//               <Form.Select
//                 value={zoneType}
//                 onChange={(e) => setZoneType(e.target.value)}
//               >
//                 <option value="pasture">Pasture</option>
//                 <option value="danger">Danger Zone</option>
//                 <option value="restricted">Restricted Area</option>
//                 <option value="custom">Custom</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Zone Color</Form.Label>
//               <div className="d-flex align-items-center">
//                 <Form.Control
//                   type="color"
//                   value={zoneColor}
//                   onChange={(e) => setZoneColor(e.target.value)}
//                   style={{ width: '60px', height: '38px', padding: '3px' }}
//                 />
//                 <Form.Control
//                   type="text"
//                   value={zoneColor}
//                   onChange={(e) => setZoneColor(e.target.value)}
//                   className="ms-2"
//                 />
//               </div>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleCreateGeofence}>
//             Create
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default GeofenceMap; 

import { useState, useEffect } from 'react';
import { Polygon, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

function GeofenceMap({ geofences, onGeofenceCreate, onGeofenceDelete }) {
  const [drawing, setDrawing] = useState(false);
  const [tempPolygon, setTempPolygon] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [zoneName, setZoneName] = useState('');
  const [zoneType, setZoneType] = useState('pasture');
  const [zoneColor, setZoneColor] = useState('#FF0000');
  const [geofenceToDelete, setGeofenceToDelete] = useState(null);
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
      toast.error('A geofence requires at least 3 points');
      return;
    }
    setShowCreateModal(true);
  };

  const handleCreateGeofence = () => {
    if (!zoneName.trim()) {
      toast.error('Please enter a geofence name');
      return;
    }

    onGeofenceCreate({
      zone_name: zoneName,
      zone_type: zoneType,
      zone_color: zoneColor,
      coordinates: tempPolygon.map(([lat, lng]) => ({ latitude: lat, longitude: lng }))
    });

    setShowCreateModal(false);
    setDrawing(false);
    setTempPolygon([]);
    setZoneName('');
    setZoneType('pasture');
    setZoneColor('#FF0000');
  };

  const handleDeleteClick = (zoneId) => {
    const geofence = geofences.find(g => g.zone_id === zoneId);
    setGeofenceToDelete(geofence);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onGeofenceDelete(geofenceToDelete.zone_id);
    setShowDeleteModal(false);
    setGeofenceToDelete(null);
    toast.success('Geofence deleted successfully');
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
                  onClick={() => handleDeleteClick(geofence.zone_id)}
                >
                  Delete
                </button>
              </div>
            </Popup>
          </Polygon>
        );
      })}

      {/* Geofence Creation Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Geofence</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Geofence Name</Form.Label>
              <Form.Control
                type="text"
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
                placeholder="Enter geofence name"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Zone Type</Form.Label>
              <Form.Select
                value={zoneType}
                onChange={(e) => setZoneType(e.target.value)}
              >
                <option value="pasture">Pasture</option>
                <option value="danger">Danger Zone</option>
                <option value="restricted">Restricted Area</option>
                <option value="custom">Custom</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Zone Color</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="color"
                  value={zoneColor}
                  onChange={(e) => setZoneColor(e.target.value)}
                  style={{ width: '60px', height: '38px', padding: '3px' }}
                />
                <Form.Control
                  type="text"
                  value={zoneColor}
                  onChange={(e) => setZoneColor(e.target.value)}
                  className="ms-2"
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateGeofence}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {geofenceToDelete && (
            <>
              <p>Are you sure you want to delete the geofence <strong>"{geofenceToDelete.zone_name}"</strong>?</p>
              <p className="text-muted">Type: {geofenceToDelete.zone_type}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GeofenceMap;