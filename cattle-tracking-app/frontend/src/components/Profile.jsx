import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CattleIllustration from './CattleIllustration';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (err) {
        setError(err.response?.data || 'Failed to fetch user data');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) return <div className="text-center my-5">Loading profile...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!user) return <div className="alert alert-warning">No user data found</div>;

  return (
    <div className="container mt-5">
      <div className="text-center">
        <CattleIllustration />
        <h2 className="mb-4 text-primary">User Profile</h2>
      </div>
      
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <div className="mb-3">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ width: '150px', height: '150px', margin: '0 auto' }}>
                  <i className="bi bi-person-fill text-primary" style={{ fontSize: '5rem' }}></i>
                </div>
              </div>
              <h4>{user.name}</h4>
              <p className="text-muted">{user.phone}</p>
            </div>
            
            <div className="col-md-8">
              <div className="mb-3">
                <h5>Account Details</h5>
                <hr />
                <div className="row mb-2">
                  <div className="col-4 fw-bold">User ID:</div>
                  <div className="col-8">{user.user_id}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-4 fw-bold">Branch ID:</div>
                  <div className="col-8">{user.branch_id || 'N/A'}</div>
                </div>
              </div>
              
              <div className="mb-3">
                <h5>Settings</h5>
                <hr />
                <button 
                  className="btn btn-outline-primary me-2"
                  onClick={() => navigate('/change-password')}
                >
                  Change Password
                </button>
                <button 
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;