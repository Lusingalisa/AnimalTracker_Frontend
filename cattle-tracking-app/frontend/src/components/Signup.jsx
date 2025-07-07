// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// function Signup() {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');

//     // Basic client-side validation
//     if (!name || !phone || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/register', {
//         name,
//         phone,
//         password,
//         branch_id: 1, // Hardcoded for now; replace with dynamic value if needed
//       });
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//       alert('Sign up successful!');
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data || 'Sign up failed. Please try again.');
//     }
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
//       <div className="card w-100" style={{ maxWidth: '400px' }}>
//         <div className="card-body p-4">
//           <h2 className="text-center mb-4 text-primary">Sign Up</h2>
//           {error && <div className="alert alert-danger">{error}</div>}
//           <form onSubmit={handleSignup}>
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="form-control"
//                 placeholder="Enter your name"
//               />
//             </div>
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
//               Sign Up
//             </button>
//           </form>
//           <p className="text-center mt-3">
//             Already have an account?{' '}
//             <Link to="/login" className="text-primary">Login</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CattleIllustration from './CattleIllustration';

function Signup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !phone || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        name,
        phone,
        password,
        branch_id: 1,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      alert('Sign up successful!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data || 'Sign up failed. Please try again.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card w-100" style={{ maxWidth: '400px' }}>
        <div className="card-body p-4">
          <CattleIllustration />
          <h2 className="text-center mb-4 text-primary">Sign Up for CattleTrack</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Enter your name"
              />
            </div>
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
              Sign Up
            </button>
          </form>
          <p className="text-center mt-3">
            Already have an account?{' '}
            <Link to="/login" className="text-primary">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;