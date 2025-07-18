// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'animate.css';
// import { FaExclamationTriangle, FaCheck, FaHeartbeat, FaArrowLeft } from 'react-icons/fa';

// function Health() {
//   const [alerts, setAlerts] = useState([]);
//   const [metricsSummary, setMetricsSummary] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   const fetchHealthData = async () => {
//     console.log('Fetching health data...');
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const [alertsResponse, cattleResponse] = await Promise.all([
//         axios.get(`${import.meta.env.VITE_API_URL}/api/health/alerts`, {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { status: 'unacknowledged' },
//         }),
//         axios.get(`${import.meta.env.VITE_API_URL}/api/cattle`, {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//       ]);

//       const cattleIds = cattleResponse.data.map((cow) => cow.cattle_id);
//       const metricsPromises = cattleIds.map((cattle_id) =>
//         axios.get(`${import.meta.env.VITE_API_URL}/api/health/metrics/${cattle_id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//       );
//       const metricsResponses = await Promise.all(metricsPromises);

//       const metricsSummary = metricsResponses.map((res, index) => {
//         const latestMetric = res.data[0] || {};
//         return {
//           cattle_id: cattleIds[index],
//           cattle_name: cattleResponse.data[index].name || `Cattle #${cattleIds[index]}`,
//           rfid_tag: cattleResponse.data[index].rfid_tag || 'N/A',
//           heart_rate: latestMetric.heart_rate || 'N/A',
//           body_temp: latestMetric.body_temp || 'N/A',
//           timestamp: latestMetric.timestamp || null,
//         };
//       });

//       setAlerts(alertsResponse.data);
//       setMetricsSummary(metricsSummary);
//       setError('');
//     } catch (err) {
//       console.error('Error fetching health data:', err);
//       setError(err.response?.data?.message || err.message || 'Failed to fetch health data');
//       toast.error(err.response?.data?.message || err.message || 'Failed to fetch health data');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const wsUrl = import.meta.env.VITE_API_URL 
//       ? import.meta.env.VITE_API_URL.replace('http', 'ws') + '/ws'
//       : 'ws://localhost:5000';
      
//     const ws = new WebSocket(`wss://${wsUrl}`);

//     ws.onopen = () => {
//       console.log('WebSocket connected');
//     };

//     ws.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       if (message.type === 'NEW_HEALTH_ALERT') {
//         const alert = message.data;
//         setAlerts((prev) => [{ ...alert, animateIn: true }, ...prev]);
//         toast.warn(
//           <div onClick={() => navigate(`/cattle/${alert.cattle_id}`)} style={{ cursor: 'pointer' }}>
//             <h6>Health Alert: {alert.cattle_name || `Cattle #${alert.cattle_id}`}</h6>
//             <p>{alert.message}</p>
//             <small>{new Date(alert.timestamp).toLocaleString()}</small>
//           </div>,
//           { autoClose: 5000 }
//         );
//       }
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//       toast.error('WebSocket connection error');
//     };

//     ws.onclose = () => {
//       console.log('WebSocket closed');
//     };

//     fetchHealthData();
//     const interval = setInterval(fetchHealthData, 30000);
//     return () => {
//       ws.close();
//       clearInterval(interval);
//     };
//   }, [navigate]);

//   // ... rest of the component code remains the same ...
// }

// export default Health;  

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import { FaExclamationTriangle, FaCheck, FaHeartbeat, FaArrowLeft } from 'react-icons/fa';

function Health() {
  const [alerts, setAlerts] = useState([]);
  const [metricsSummary, setMetricsSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchHealthData = async () => {
    console.log('Fetching health data...');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const [alertsResponse, cattleResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/health/alerts`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { status: 'unacknowledged' },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/cattle`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const cattleIds = cattleResponse.data.map((cow) => cow.cattle_id);
      const metricsPromises = cattleIds.map((cattle_id) =>
        axios.get(`${import.meta.env.VITE_API_URL}/api/health/metrics/${cattle_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      const metricsResponses = await Promise.all(metricsPromises);

      const metricsSummary = metricsResponses.map((res, index) => {
        const latestMetric = res.data[0] || {};
        return {
          cattle_id: cattleIds[index],
          cattle_name: cattleResponse.data[index].name || `Cattle #${cattleIds[index]}`,
          rfid_tag: cattleResponse.data[index].rfid_tag || 'N/A',
          heart_rate: latestMetric.heart_rate || 'N/A',
          body_temp: latestMetric.body_temp || 'N/A',
          timestamp: latestMetric.timestamp || null,
        };
      });

      setAlerts(alertsResponse.data);
      setMetricsSummary(metricsSummary);
      setError('');
    } catch (err) {
      console.error('Error fetching health data:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch health data');
      toast.error(err.response?.data?.message || err.message || 'Failed to fetch health data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Construct WebSocket URL
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const wsUrl = apiUrl
      .replace('http://', 'ws://')
      .replace('https://', 'wss://') + '/ws';

    console.log('Connecting to WebSocket at:', wsUrl);

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'NEW_HEALTH_ALERT') {
        const alert = message.data;
        setAlerts((prev) => [{ ...alert, animateIn: true }, ...prev]);
        toast.warn(
          <div onClick={() => navigate(`/cattle/${alert.cattle_id}`)} style={{ cursor: 'pointer' }}>
            <h6>Health Alert: {alert.cattle_name || `Cattle #${alert.cattle_id}`}</h6>
            <p>{alert.message}</p>
            <small>{new Date(alert.timestamp).toLocaleString()}</small>
          </div>,
          { autoClose: 5000 }
        );
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      toast.error('Realtime connection error. Using periodic updates instead.');
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    fetchHealthData();
    const interval = setInterval(fetchHealthData, 30000);
    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, [navigate]);

  const handleAcknowledge = async (alertId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/health/alerts/${alertId}`,
        { status: 'acknowledged' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlerts((prev) =>
        prev.map((alert) =>
          alert.alert_id === alertId ? { ...alert, status: 'acknowledged', animateOut: true } : alert
        )
      );
      toast.success('Health alert acknowledged', { autoClose: 3000 });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to acknowledge alert');
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading health data...</p>
        {error && (
          <div className="alert alert-danger mt-3">
            Error: {error}
          </div>
        )}
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
        <h2 className="text-primary">Cattle Health Monitor</h2>
        <button className="btn btn-outline-primary" onClick={() => navigate('/dashboard')}>
          <FaArrowLeft className="me-1" /> Back to Dashboard
        </button>
      </div>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Health Alerts</h5>
          <span className="badge bg-dark">{alerts.length} Unacknowledged</span>
        </div>
        <div className="card-body p-0">
          {error && (
            <div className="alert alert-danger mx-3 my-3 shadow-sm" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}
          {alerts.length === 0 && !error ? (
            <div className="p-4 text-center text-muted">
              <FaHeartbeat size={24} className="mb-2" />
              <p className="mb-0">No unacknowledged health alerts</p>
            </div>
          ) : (
            <ul className="list-group list-group-flush">
              {alerts.map((alert) => (
                <li
                  key={alert.alert_id}
                  className={`list-group-item border-bottom animate__animated ${
                    alert.animateIn ? 'animate__fadeIn' : alert.animateOut ? 'animate__fadeOut' : ''
                  }`}
                  style={{ animationDuration: '0.5s' }}
                >
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <FaExclamationTriangle
                        className={alert.severity === 'critical' ? 'text-danger' : 'text-warning'}
                        size={24}
                        title={alert.severity === 'critical' ? 'Critical Alert' : 'Warning Alert'}
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-semibold">
                        {alert.cattle_name || `Cattle #${alert.cattle_id}`} ({alert.rfid_tag || 'N/A'})
                      </h6>
                      <p className="mb-1 text-dark">{alert.message}</p>
                      <small className="text-muted">
                        {new Date(alert.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                      </small>
                      <div className="mt-1">
                        <span
                          className={`badge rounded-pill ${
                            alert.severity === 'critical' ? 'bg-danger' : 'bg-warning text-dark'
                          }`}
                        >
                          {alert.severity}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => navigate(`/cattle/${alert.cattle_id}`)}
                        title="View cattle details"
                      >
                        View
                      </button>
                      {alert.status === 'unacknowledged' && (
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleAcknowledge(alert.alert_id)}
                          title="Acknowledge alert"
                        >
                          <FaCheck className="me-1" /> Acknowledge
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0 fw-bold">Latest Health Metrics</h5>
        </div>
        <div className="card-body p-0">
          {metricsSummary.length === 0 ? (
            <div className="p-4 text-center text-muted">
              <FaHeartbeat size={24} className="mb-2" />
              <p className="mb-0">No health metrics available</p>
            </div>
          ) : (
            <ul className="list-group list-group-flush">
              {metricsSummary.map((metric) => (
                <li key={metric.cattle_id} className="list-group-item border-bottom">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-semibold">
                        {metric.cattle_name} ({metric.rfid_tag})
                      </h6>
                      <p className="mb-1">
                        <strong>Heart Rate:</strong> {metric.heart_rate} bpm
                      </p>
                      <p className="mb-1">
                        <strong>Body Temp:</strong> {metric.body_temp}°C
                      </p>
                      <small className="text-muted">
                        {metric.timestamp
                          ? new Date(metric.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
                          : 'N/A'}
                      </small>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => navigate(`/cattle/${metric.cattle_id}`)}
                      title="View cattle details"
                    >
                      View Details
                    </button>
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

export default Health;