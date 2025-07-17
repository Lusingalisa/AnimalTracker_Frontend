

// // import { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import CattleIllustration from './CattleIllustration';

// // function Alerts() {
// //   const [alerts, setAlerts] = useState([]);
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();
// //   const user = JSON.parse(localStorage.getItem('user') || '{}');

// //   useEffect(() => {
// //     const fetchAlerts = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/alerts`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setAlerts(response.data);
// //       } catch (err) {
// //         setError(err.response?.data || 'Failed to fetch alerts');
// //       }
// //     };
// //     fetchAlerts();
// //   }, []);

// //   const handleBack = () => {
// //     navigate('/dashboard');
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <div className="text-center">
// //         <CattleIllustration />
// //         <h2 className="mb-4 text-primary">Alerts for {user.name || 'User'}</h2>
// //       </div>
// //       <div className="d-flex justify-content-between mb-4">
// //         <h3>Alert List</h3>
// //         <button className="btn btn-outline-primary" onClick={handleBack}>
// //           Back to Dashboard
// //         </button>
// //       </div>
// //       {error && <div className="alert alert-danger">{error}</div>}
// //       {alerts.length === 0 && !error ? (
// //         <p>No alerts available.</p>
// //       ) : (
// //         <div className="table-responsive">
// //           <table className="table table-striped table-bordered">
// //             <thead className="table-dark">
// //               <tr>
// //                 <th>Alert ID</th>
// //                 <th>Cattle ID</th>
// //                 <th>RFID Tag</th>
// //                 <th>Message</th>
// //                 <th>Status</th>
// //                 <th>Timestamp</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {alerts.map((alert) => (
// //                 <tr key={alert.alert_id}>
// //                   <td>{alert.alert_id}</td>
// //                   <td>{alert.cattle_id}</td>
// //                   <td>{alert.rfid_tag || 'N/A'}</td>
// //                   <td>{alert.message || 'N/A'}</td>
// //                   <td>{alert.status || 'N/A'}</td>
// //                   <td>{alert.timestamp ? new Date(alert.timestamp).toLocaleString() : 'N/A'}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Alerts;

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import CattleIllustration from './CattleIllustration';

// function Alerts() {
//   const [alerts, setAlerts] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   // Initialize toast notifications
//   useEffect(() => {
//     toast.configure({
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     });
//   }, []);

//   // Fetch alerts and show notifications
//   useEffect(() => {
//     const fetchAlerts = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/alerts`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
        
//         // Check for new alerts since last fetch
//         if (alerts.length > 0) {
//           const newAlerts = response.data.filter(
//             newAlert => !alerts.some(oldAlert => oldAlert.alert_id === newAlert.alert_id)
//           );
          
//           // Show notifications for new alerts
//           newAlerts.forEach(alert => {
//             toast.info(
//               <div>
//                 <h6>Cattle #{alert.cattle_id}</h6>
//                 <p>{alert.message}</p>
//                 <small>{new Date(alert.timestamp).toLocaleString()}</small>
//               </div>, 
//               {
//                 onClick: () => navigate(`/cattle/${alert.cattle_id}`),
//               }
//             );
//           });
//         }
        
//         setAlerts(response.data);
//       } catch (err) {
//         setError(err.response?.data || 'Failed to fetch alerts');
//         toast.error('Failed to load alerts');
//       }
//     };
    
//     // Initial fetch
//     fetchAlerts();
    
//     // Poll for new alerts every 30 seconds
//     const interval = setInterval(fetchAlerts, 30000);
//     return () => clearInterval(interval);
//   }, [alerts, navigate]);

//   const handleBack = () => {
//     navigate('/dashboard');
//   };

//   return (
//     <div className="container mt-5">
//       <div className="text-center">
//         <CattleIllustration />
//         <h2 className="mb-4 text-primary">Alerts for {user.name || 'User'}</h2>
//       </div>
//       <div className="d-flex justify-content-between mb-4">
//         <h3>Alert List</h3>
//         <button className="btn btn-outline-primary" onClick={handleBack}>
//           Back to Dashboard
//         </button>
//       </div>
//       {error && <div className="alert alert-danger">{error}</div>}
//       {alerts.length === 0 && !error ? (
//         <p>No alerts available.</p>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-striped table-bordered">
//             <thead className="table-dark">
//               <tr>
//                 <th>Alert ID</th>
//                 <th>Cattle ID</th>
//                 <th>RFID Tag</th>
//                 <th>Message</th>
//                 <th>Status</th>
//                 <th>Timestamp</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {alerts.map((alert) => (
//                 <tr key={alert.alert_id}>
//                   <td>{alert.alert_id}</td>
//                   <td>{alert.cattle_id}</td>
//                   <td>{alert.rfid_tag || 'N/A'}</td>
//                   <td>{alert.message || 'N/A'}</td>
//                   <td>
//                     <span className={`badge ${
//                       alert.status === 'unread' ? 'bg-warning' : 'bg-success'
//                     }`}>
//                       {alert.status || 'N/A'}
//                     </span>
//                   </td>
//                   <td>{alert.timestamp ? new Date(alert.timestamp).toLocaleString() : 'N/A'}</td>
//                   <td>
//                     <button 
//                       className="btn btn-sm btn-primary"
//                       onClick={() => navigate(`/cattle/${alert.cattle_id}`)}
//                     >
//                       View Cattle
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Alerts;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import { FaExclamationTriangle, FaCheck, FaMapMarkerAlt } from 'react-icons/fa';
import CattleIllustration from './CattleIllustration';

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Fetch alerts
  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/alerts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check for new alerts
      if (alerts.length > 0) {
        const newAlerts = response.data.filter(
          (newAlert) => !alerts.some((oldAlert) => oldAlert.alert_id === newAlert.alert_id)
        );
        newAlerts.forEach((alert) => {
          toast.info(
            <div onClick={() => navigate(`/cattle/${alert.cattle_id}`)} style={{ cursor: 'pointer' }}>
              <h6>Cattle #{alert.cattle_id} ({alert.rfid_tag})</h6>
              <p>{alert.message}</p>
              <small>{new Date(alert.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</small>
            </div>,
            { autoClose: 5000 }
          );
        });
      }

      setAlerts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch alerts');
      toast.error(err.response?.data?.message || 'Failed to fetch alerts');
    } finally {
      setIsLoading(false);
    }
  };

  // WebSocket connection for real-time updates
  useEffect(() => {
    const ws = new WebSocket(`wss://${window.location.hostname}:8080`);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'NEW_ALERT') {
        const alert = message.data;
        setAlerts((prev) => [{ ...alert, animateIn: true }, ...prev]);
        toast.info(
          <div onClick={() => navigate(`/cattle/${alert.cattle_id}`)} style={{ cursor: 'pointer' }}>
            <h6>New Alert: Cattle #{alert.cattle_id} ({alert.rfid_tag})</h6>
            <p>{alert.message}</p>
            <small>{new Date(alert.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</small>
          </div>,
          { autoClose: 5000 }
        );
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    // Initial fetch
    fetchAlerts();

    // Polling fallback
    const interval = setInterval(fetchAlerts, 30000);
    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, [navigate]);

  const markAsRead = async (alertId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/alerts/${alertId}`,
        { status: 'read' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update geofence_alerts if the alert is geofence-related
      const alert = alerts.find((a) => a.alert_id === alertId);
      if (alert.zone_id) {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/api/geofences/alerts/${alertId}`,
          { status: 'acknowledged' },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setAlerts((prev) =>
        prev.map((alert) =>
          alert.alert_id === alertId ? { ...alert, status: 'read', animateOut: true } : alert
        )
      );
      toast.success('Alert marked as read', { autoClose: 3000 });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update alert status');
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading alerts...</p>
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
      <div className="text-center">
        <CattleIllustration />
        <h2 className="mb-4 text-primary">Alerts for {user.name || 'User'}</h2>
      </div>
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Alert List</h5>
          <div>
            <span className="badge bg-light text-dark me-2">{alerts.length} Alerts</span>
            <button className="btn btn-sm btn-outline-light" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </div>
        <div className="card-body p-0">
          {error && (
            <div className="alert alert-danger mx-3 my-3 shadow-sm" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}
          {alerts.length === 0 && !error ? (
            <div className="p-4 text-center text-muted">
              <FaMapMarkerAlt size={24} className="mb-2" />
              <p className="mb-0">No alerts available</p>
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
                      {alert.message.includes('exited') ? (
                        <FaExclamationTriangle
                          className="text-danger"
                          size={24}
                          title="Geofence Exit Alert"
                        />
                      ) : (
                        <FaMapMarkerAlt
                          className="text-primary"
                          size={24}
                          title="Geofence Entry Alert"
                        />
                      )}
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-semibold">
                        Cattle #{alert.cattle_id} ({alert.rfid_tag || 'N/A'})
                      </h6>
                      <p className="mb-1 text-dark">{alert.message || 'N/A'}</p>
                      <small className="text-muted">
                        {new Date(alert.timestamp).toLocaleString('en-US', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
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
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => navigate(`/cattle/${alert.cattle_id}`)}
                        title="View cattle details"
                      >
                        View
                      </button>
                      {alert.status === 'unread' && (
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => markAsRead(alert.alert_id)}
                          title="Mark as read"
                        >
                          <FaCheck className="me-1" />
                          Mark Read
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
    </div>
  );
}

export default Alerts;