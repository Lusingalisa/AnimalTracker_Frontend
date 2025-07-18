// 2
// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import CattleIllustration from './CattleIllustration';
// import GeofenceAlerts from './GeofenceAlerts';

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
//           <Link to="/alerts" className="btn btn-outline-primary me-2">View All Alerts</Link>
//           <Link to="/cattle-map" className="btn btn-outline-primary me-2">Cattle Map</Link>
//           <Link to="/health" className="btn btn-outline-primary me-2">View Health</Link>
//           <Link to="/geofence-manager" className="btn btn-outline-primary me-2">Geofence Manager</Link>
//           <button className="btn btn-outline-danger" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>
      
//       {error && <div className="alert alert-danger">{error}</div>}
      
//       <div className="row">
//         <div className="col-md-8">
//           {cattle.length === 0 && !error ? (
//             <div className="alert alert-info">No cattle data available.</div>
//           ) : (
//             <div className="table-responsive">
//               <table className="table table-striped table-bordered">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>Cattle ID</th>
//                     <th>Name</th>
//                     <th>RFID Tag</th>
//                     <th>Status</th>
//                     <th>Last Location</th>
//                     <th>Last Updated</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cattle.map((cow) => (
//                     <tr key={cow.cattle_id}>
//                       <td>{cow.cattle_id}</td>
//                       <td>{cow.name || 'N/A'}</td>
//                       <td>{cow.rfid_tag || 'N/A'}</td>
//                       <td>
//                         <span className={`badge ${
//                           cow.status === 'safe' ? 'bg-success' : 
//                           cow.status === 'alerted' ? 'bg-warning' : 'bg-danger'
//                         }`}>
//                           {cow.status || 'N/A'}
//                         </span>
//                       </td>
//                       <td>
//                         {cow.latitude && cow.longitude ? 
//                           `${cow.latitude.toFixed(6)}, ${cow.longitude.toFixed(6)}` : 'N/A'}
//                       </td>
//                       <td>{cow.last_updated ? new Date(cow.last_updated).toLocaleString() : 'N/A'}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
        
//         <div className="col-md-4">
//           <GeofenceAlerts />
//         </div>
//       </div>
      
//       <div className="fixed-bottom text-end mb-3 me-3">
//         <Link to="/profile" className="btn btn-primary rounded-circle" style={{ width: '50px', height: '50px' }}>
//           <i className="bi bi-person-fill" style={{ fontSize: '1.5rem' }}></i>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CattleIllustration from './CattleIllustration';
import GeofenceAlerts from './GeofenceAlerts';

function Dashboard() {
  const [cattle, setCattle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [locationCache, setLocationCache] = useState({});
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchCattle = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cattle`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCattle(response.data);
        
        // Pre-fetch locations for cattle with coordinates
        response.data.forEach(cow => {
          if (cow.latitude && cow.longitude) {
            fetchLocation(cow.latitude, cow.longitude);
          }
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch cattle data');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCattle();
  }, [navigate]);

  const fetchLocation = async (lat, lng) => {
    const cacheKey = `${lat},${lng}`;
    
    // Check cache first
    if (locationCache[cacheKey]) return;
    
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        {
          headers: {
            'Accept-Language': 'en',
            'User-Agent': 'YourAppName/1.0 (your@email.com)' // Required by Nominatim
          }
        }
      );
      
      const address = response.data.address;
      let displayLocation = '';
      
      // Build a readable address from available components
      if (address.city || address.town || address.village) {
        displayLocation = address.city || address.town || address.village;
        if (address.country) {
          displayLocation += `, ${address.country}`;
        }
      } else if (address.county && address.country) {
        displayLocation = `${address.county}, ${address.country}`;
      } else if (address.country) {
        displayLocation = address.country;
      } else {
        displayLocation = 'Unknown location';
      }
      
      setLocationCache(prev => ({
        ...prev,
        [cacheKey]: displayLocation
      }));
    } catch (err) {
      console.error('Geocoding error:', err);
      setLocationCache(prev => ({
        ...prev,
        [cacheKey]: 'Location unavailable'
      }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-border text-primary" style={{ width: '4rem', height: '4rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4">
      {/* Enhanced Header */}
      <div className="dashboard-header text-center mb-5">
        <div className="container">
          <CattleIllustration />
          <h2 className="mb-3 display-5 fw-bold">Welcome back, {user.name || 'User'}!</h2>
          <p className="lead mb-0 fs-4">Manage your cattle and monitor their health and location</p>
        </div>
      </div>
      
      <div className="container">
        {/* Action Buttons Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <div className="mb-3 mb-md-0">
            <h3 className="mb-0">
              <i className="bi bi-list-check me-2"></i>
              Cattle Inventory
            </h3>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Link to="/alerts" className="btn btn-outline-primary btn-lg">
              <i className="bi bi-bell-fill me-1"></i>Alerts
            </Link>
            <Link to="/cattle-map" className="btn btn-outline-primary btn-lg">
              <i className="bi bi-map-fill me-1"></i>Map
            </Link>
            <Link to="/health" className="btn btn-outline-primary btn-lg">
              <i className="bi bi-heart-pulse-fill me-1"></i>Health
            </Link>
            <Link to="/geofence-manager" className="btn btn-outline-primary btn-lg">
              <i className="bi bi-fence me-1"></i>Geofences
            </Link>
            <button className="btn btn-outline-danger btn-lg" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1"></i>Logout
            </button>
          </div>
        </div>
        
        {error && (
          <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}
        
        <div className="row g-4">
          <div className="col-lg-8">
            {cattle.length === 0 && !error ? (
              <div className="card empty-state-card">
                <div className="card-body text-center">
                  <i className="bi bi-emoji-frown display-4 text-muted mb-3"></i>
                  <h4 className="mb-3">No cattle data available</h4>
                  <p className="text-muted fs-5 mb-4">Add your first cattle to get started</p>
                  <Link to="/add-cattle" className="btn btn-primary btn-lg">
                    <i className="bi bi-plus-circle-fill me-2"></i>Add Cattle
                  </Link>
                </div>
              </div>
            ) : (
              <div className="card h-100">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>RFID Tag</th>
                          <th>Status</th>
                          <th>Last Location</th>
                          <th>Last Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cattle.map((cow) => (
                          <tr key={cow.cattle_id} className="align-middle">
                            <td className="fw-bold">{cow.cattle_id}</td>
                            <td>
                              <Link to={`/cattle/${cow.cattle_id}`} className="text-decoration-none">
                                {cow.name || `Cattle #${cow.cattle_id}`}
                              </Link>
                            </td>
                            <td>
                              <span className="font-monospace">{cow.rfid_tag || 'N/A'}</span>
                            </td>
                            <td>
                              <span className={`badge ${
                                cow.status === 'safe' ? 'bg-success' : 
                                cow.status === 'alerted' ? 'bg-warning' : 'bg-danger'
                              }`}>
                                {cow.status || 'N/A'}
                              </span>
                            </td>
                            <td className="small">
                              {cow.latitude && cow.longitude ? (
                                locationCache[`${cow.latitude},${cow.longitude}`] || (
                                  <span className="text-muted">Loading location...</span>
                                )
                              ) : 'N/A'}
                            </td>
                            <td className="small">
                              {cow.last_updated ? new Date(cow.last_updated).toLocaleString() : 'N/A'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <GeofenceAlerts />
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Profile Button */}
        <div className="fixed-bottom text-end mb-4 me-4">
          <Link to="/profile" className="profile-btn d-flex align-items-center justify-content-center" title="Your Profile">
            <i className="bi bi-person-fill"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;