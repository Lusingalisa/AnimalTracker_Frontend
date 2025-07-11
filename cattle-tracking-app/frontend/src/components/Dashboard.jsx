

// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import CattleIllustration from './CattleIllustration';



// function Dashboard() {
//   const [cattle, setCattle] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   useEffect(() => {
//     const fetchCattle = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cattle`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCattle(response.data);
//       } catch (err) {
//         setError(err.response?.data || 'Failed to fetch cattle data');
//       }
//     };
//     fetchCattle();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <div className="container mt-5">
//       <div className="text-center">
//         <CattleIllustration />
//         <h2 className="mb-4 text-primary">Welcome, {user.name || 'User'}!</h2>
//       </div>
//       <div className="d-flex justify-content-between mb-4">
//         <h3>Cattle List</h3>
//         <div>
//           <Link to="/alerts" className="btn btn-outline-primary me-2">View Alerts</Link>
//           <Link to="/cattle-map" className="btn btn-outline-primary me-2">Cattle Map</Link>
//           <button className="btn btn-outline-danger" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>
//       {error && <div className="alert alert-danger">{error}</div>}
//       {cattle.length === 0 && !error ? (
//         <p>No cattle data available.</p>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-striped table-bordered">
//             <thead className="table-dark">
//               <tr>
//                 <th>Cattle ID</th>
//                 <th>RFID Tag</th>
//                 <th>Status</th>
//                 <th>Latitude</th>
//                 <th>Longitude</th>
//                 <th>Last Updated</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cattle.map((cow) => (
//                 <tr key={cow.cattle_id}>
//                   <td>{cow.cattle_id}</td>
//                   <td>{cow.rfid_tag || 'N/A'}</td>
//                   <td>{cow.status || 'N/A'}</td>
//                   <td>{cow.latitude ? cow.latitude.toFixed(6) : 'N/A'}</td>
//                   <td>{cow.longitude ? cow.longitude.toFixed(6) : 'N/A'}</td>
//                   <td>{cow.last_updated ? new Date(cow.last_updated).toLocaleString() : 'N/A'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard; 



import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CattleIllustration from './CattleIllustration';
import GeofenceManager from './GeofenceManager';

function Dashboard() {
  const [cattle, setCattle] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchCattle = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cattle`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCattle(response.data);
      } catch (err) {
        setError(err.response?.data || 'Failed to fetch cattle data');
      }
    };
    fetchCattle();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <CattleIllustration />
        <h2 className="mb-4 text-primary">Welcome, {user.name || 'User'}!</h2>
      </div>
      <div className="d-flex justify-content-between mb-4">
        <h3>Cattle List</h3>
        <div>
          <Link to="/alerts" className="btn btn-outline-primary me-2">View Alerts</Link>
          <Link to="/cattle-map" className="btn btn-outline-primary me-2">Cattle Map</Link>
          <Link to="/geofences" className="btn btn-outline-success me-2">Manage Geofences</Link>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {cattle.length === 0 && !error ? (
        <p>No cattle data available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Cattle ID</th>
                <th>RFID Tag</th>
                <th>Status</th>
                <th>Health Status</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {cattle.map((cow) => (
                <tr key={cow.cattle_id}>
                  <td>{cow.cattle_id}</td>
                  <td>{cow.rfid_tag || 'N/A'}</td>
                  <td>{cow.status || 'N/A'}</td>
                  <td>
                    <span className={`badge ${
                      cow.health_status === 'excellent' ? 'bg-success' :
                      cow.health_status === 'good' ? 'bg-primary' :
                      cow.health_status === 'fair' ? 'bg-warning' : 'bg-danger'
                    }`}>
                      {cow.health_status || 'N/A'}
                    </span>
                  </td>
                  <td>{cow.latitude ? cow.latitude.toFixed(6) : 'N/A'}</td>
                  <td>{cow.longitude ? cow.longitude.toFixed(6) : 'N/A'}</td>
                  <td>{cow.last_updated ? new Date(cow.last_updated).toLocaleString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Geofence Management Section */}
      <div className="mt-5">
        <h3 className="mb-4">Geofence Management</h3>
        <GeofenceManager />
      </div>
    </div>
  );
}

export default Dashboard;