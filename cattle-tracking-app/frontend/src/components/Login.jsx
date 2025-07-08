// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import CattleIllustration from './CattleIllustration';

// function Login() {
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!phone || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/login', {
//         phone,
//         password,
//       });
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//       alert('Login successful!');
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data || 'Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
//       <div className="card w-100" style={{ maxWidth: '400px' }}>
//         <div className="card-body p-4">
//           <CattleIllustration />
//           <h2 className="text-center mb-4 text-primary">Login to CattleTrack</h2>
//           {error && <div className="alert alert-danger">{error}</div>}
//           <form onSubmit={handleLogin}>
//             <div className="mb-3">
//               <label htmlFor="phone" className="form-label">Phone Number</label>
//               <input
//                 type="tel"
//                 id="phone"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="form-control"
//                 placeholder="Enter your phone number"
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="form-control"
//                 placeholder="Enter your password"
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100">
//               Login
//             </button>
//           </form>
//           <p className="text-center mt-3">
//             Don't have an account?{' '}
//             <Link to="/signup" className="text-primary">Sign Up</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login; 

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CattleIllustration from './CattleIllustration';

function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!phone || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        phone,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard'); // Redirect to dashboard without alert
    } catch (err) {
      setError(err.response?.data || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card w-100" style={{ maxWidth: '400px' }}>
        <div className="card-body p-4">
          <CattleIllustration />
          <h2 className="text-center mb-4 text-primary">Login to Herd Track</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;