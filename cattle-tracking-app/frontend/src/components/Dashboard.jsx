2
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CattleIllustration from './CattleIllustration';
import GeofenceAlerts from './GeofenceAlerts';

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
          <Link to="/alerts" className="btn btn-outline-primary me-2">View All Alerts</Link>
          <Link to="/cattle-map" className="btn btn-outline-primary me-2">Cattle Map</Link>
          <Link to="/health" className="btn btn-outline-primary me-2">View Health</Link>
          <Link to="/geofence-manager" className="btn btn-outline-primary me-2">Geofence Manager</Link>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="row">
        <div className="col-md-8">
          {cattle.length === 0 && !error ? (
            <div className="alert alert-info">No cattle data available.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Cattle ID</th>
                    <th>Name</th>
                    <th>RFID Tag</th>
                    <th>Status</th>
                    <th>Last Location</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {cattle.map((cow) => (
                    <tr key={cow.cattle_id}>
                      <td>{cow.cattle_id}</td>
                      <td>{cow.name || 'N/A'}</td>
                      <td>{cow.rfid_tag || 'N/A'}</td>
                      <td>
                        <span className={`badge ${
                          cow.status === 'safe' ? 'bg-success' : 
                          cow.status === 'alerted' ? 'bg-warning' : 'bg-danger'
                        }`}>
                          {cow.status || 'N/A'}
                        </span>
                      </td>
                      <td>
                        {cow.latitude && cow.longitude ? 
                          `${cow.latitude.toFixed(6)}, ${cow.longitude.toFixed(6)}` : 'N/A'}
                      </td>
                      <td>{cow.last_updated ? new Date(cow.last_updated).toLocaleString() : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="col-md-4">
          <GeofenceAlerts />
        </div>
      </div>
      
      <div className="fixed-bottom text-end mb-3 me-3">
        <Link to="/profile" className="btn btn-primary rounded-circle" style={{ width: '50px', height: '50px' }}>
          <i className="bi bi-person-fill" style={{ fontSize: '1.5rem' }}></i>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;