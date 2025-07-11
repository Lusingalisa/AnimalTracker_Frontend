import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaExclamationTriangle } from 'react-icons/fa';

const GeofenceAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/geofence-alerts`, {
          params: { status: 'active' },
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlerts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch geofence alerts');
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleAcknowledge = async (alertId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/geofence-alerts/${alertId}/acknowledge`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlerts(alerts.filter(a => a.alert_id !== alertId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to acknowledge alert');
    }
  };

  if (loading) return <div>Loading alerts...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-warning text-dark">
        <h5 className="mb-0">Geofence Alerts</h5>
      </div>
      <div className="card-body p-0">
        {alerts.length === 0 ? (
          <div className="p-3 text-center text-muted">No active geofence alerts</div>
        ) : (
          <ul className="list-group list-group-flush">
            {alerts.map(alert => (
              <li key={alert.alert_id} className="list-group-item">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    {alert.alert_type === 'exit' ? (
                      <FaExclamationTriangle className="text-danger" size={24} />
                    ) : (
                      <FaMapMarkerAlt className="text-primary" size={24} />
                    )}
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{alert.cattle_name || `Cattle #${alert.cattle_id}`}</h6>
                    <p className="mb-1">{alert.message}</p>
                    <small className="text-muted">
                      {new Date(alert.timestamp).toLocaleString()}
                    </small>
                  </div>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleAcknowledge(alert.alert_id)}
                  >
                    Acknowledge
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GeofenceAlerts;