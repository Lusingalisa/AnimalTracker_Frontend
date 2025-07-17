import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import { FaMapMarkerAlt, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

function CattleDetails() {
  const { cattle_id } = useParams();
  const navigate = useNavigate();
  const [cattle, setCattle] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCattleDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const [cattleResponse, alertsResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/cattle/${cattle_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/alerts`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { cattle_id },
          }),
        ]);

        setCattle(cattleResponse.data);
        setAlerts(alertsResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch cattle details');
        toast.error(err.response?.data?.message || 'Failed to fetch cattle details');
      } finally {
        setIsLoading(false);
      }
    };

    if (!cattle_id || isNaN(cattle_id)) {
      setError('Invalid cattle ID');
      setIsLoading(false);
      return;
    }

    fetchCattleDetails();
  }, [cattle_id]);

  const handleBack = () => {
    navigate('/alerts');
  };

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading cattle details...</p>
      </div>
    );
  }

  if (error || !cattle) {
    return (
      <div className="container mt-4">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
        <div className="alert alert-danger mx-3 my-3 shadow-sm" role="alert">
          <strong>Error:</strong> {error || 'Cattle not found'}
        </div>
        <button className="btn btn-outline-primary" onClick={handleBack}>
          <FaArrowLeft className="me-1" /> Back to Alerts
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Cattle #{cattle.cattle_id} Details</h2>
        <button className="btn btn-outline-primary" onClick={handleBack}>
          <FaArrowLeft className="me-1" /> Back to Alerts
        </button>
      </div>
      <div className="card shadow-sm border-0 animate__animated animate__fadeIn">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0 fw-bold">Cattle Information</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-2"><strong>RFID Tag:</strong> {cattle.rfid_tag || 'N/A'}</p>
              <p className="mb-2"><strong>Last Location:</strong> {cattle.gps_location ? `${cattle.gps_location.latitude}, ${cattle.gps_location.longitude}` : 'N/A'}</p>
              <p className="mb-2"><strong>Last Updated:</strong> {cattle.gps_location?.timestamp ? new Date(cattle.gps_location.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow-sm border-0 mt-4">
        <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Recent Alerts</h5>
          <span className="badge bg-dark">{alerts.length} Alerts</span>
        </div>
        <div className="card-body p-0">
          {alerts.length === 0 ? (
            <div className="p-4 text-center text-muted">
              <FaMapMarkerAlt size={24} className="mb-2" />
              <p className="mb-0">No recent alerts for this cattle</p>
            </div>
          ) : (
            <ul className="list-group list-group-flush">
              {alerts.map((alert) => (
                <li
                  key={alert.alert_id}
                  className="list-group-item border-bottom animate__animated animate__fadeIn"
                  style={{ animationDuration: '0.5s' }}
                >
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      {alert.message.includes('exited') ? (
                        <FaExclamationTriangle className="text-danger" size={24} title="Geofence Exit Alert" />
                      ) : (
                        <FaMapMarkerAlt className="text-primary" size={24} title="Geofence Entry Alert" />
                      )}
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-1 text-dark">{alert.message || 'N/A'}</p>
                      <small className="text-muted">
                        {new Date(alert.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                      </small>
                      <div className="mt-1">
                        <span
                          className={`badge rounded-pill ${
                            alert.status === 'unread' ? 'bg-warning text-dark' : 'bg-success'
                          }`}
                        >
                          {alert.status || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CattleDetails;