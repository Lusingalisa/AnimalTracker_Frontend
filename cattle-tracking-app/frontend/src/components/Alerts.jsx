// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// function Alerts() {
//   const [alerts, setAlerts] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   useEffect(() => {
//     const fetchAlerts = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:3000/api/alerts', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAlerts(response.data);
//       } catch (err) {
//         setError(err.response?.data || 'Failed to fetch alerts');
//       }
//     };
//     fetchAlerts();
//   }, []);

//   const handleBack = () => {
//     navigate('/dashboard');
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4 text-primary">Alerts for {user.name || 'User'}</h2>
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
//               </tr>
//             </thead>
//             <tbody>
//               {alerts.map((alert) => (
//                 <tr key={alert.alert_id}>
//                   <td>{alert.alert_id}</td>
//                   <td>{alert.cattle_id}</td>
//                   <td>{alert.rfid_tag || 'N/A'}</td>
//                   <td>{alert.message || 'N/A'}</td>
//                   <td>{alert.status || 'N/A'}</td>
//                   <td>{alert.timestamp ? new Date(alert.timestamp).toLocaleString() : 'N/A'}</td>
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
import CattleIllustration from './CattleIllustration';

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/alerts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlerts(response.data);
      } catch (err) {
        setError(err.response?.data || 'Failed to fetch alerts');
      }
    };
    fetchAlerts();
  }, []);

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <CattleIllustration />
        <h2 className="mb-4 text-primary">Alerts for {user.name || 'User'}</h2>
      </div>
      <div className="d-flex justify-content-between mb-4">
        <h3>Alert List</h3>
        <button className="btn btn-outline-primary" onClick={handleBack}>
          Back to Dashboard
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {alerts.length === 0 && !error ? (
        <p>No alerts available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Alert ID</th>
                <th>Cattle ID</th>
                <th>RFID Tag</th>
                <th>Message</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.alert_id}>
                  <td>{alert.alert_id}</td>
                  <td>{alert.cattle_id}</td>
                  <td>{alert.rfid_tag || 'N/A'}</td>
                  <td>{alert.message || 'N/A'}</td>
                  <td>{alert.status || 'N/A'}</td>
                  <td>{alert.timestamp ? new Date(alert.timestamp).toLocaleString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Alerts;