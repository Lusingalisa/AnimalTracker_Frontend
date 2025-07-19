// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Dashboard from './components/Dashboard';
// import Alerts from './components/Alerts';
// import ProtectedRoute from './components/ProtectedRoute';
// import CattleMap from './components/CattleMap';
// import LandingPage from './components/LandingPage';
// import Profile from './components/Profile';
// import GeofenceManager from './components/GeofenceManager';
// import 'react-toastify/dist/ReactToastify.css';
// import CattleDetails from './components/CattleDetails';
// import Health from './components/Health';
// import { Moon, Sun } from 'react-bootstrap-icons';
// import Cattle3D from './components/Cattle3D';



// function App() {
//   const [darkMode, setDarkMode] = useState(() => {
//     // Check localStorage for saved preference or use system preference
//     const savedPreference = localStorage.getItem('darkMode');
//     if (savedPreference !== null) {
//       return JSON.parse(savedPreference);
//     }
//     return window.matchMedia('(prefers-color-scheme: dark)').matches;
//   });

//   // Apply theme class to document root
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.setAttribute('data-bs-theme', 'dark');
//       document.body.classList.add('bg-dark');
//       document.body.classList.remove('bg-light');
//     } else {
//       document.documentElement.setAttribute('data-bs-theme', 'light');
//       document.body.classList.add('bg-light');
//       document.body.classList.remove('bg-dark');
//     }
//     localStorage.setItem('darkMode', JSON.stringify(darkMode));
//   }, [darkMode]);

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <Router>
//       <div className={`min-vh-100 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
//         <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-dark bg-primary'} shadow-sm`}>
//           <div className="container">
//             <Link className="navbar-brand" to="/">Herd Track System</Link>
//             <div className="d-flex align-items-center">
//               <button 
//                 className="btn btn-link text-decoration-none me-2"
//                 onClick={toggleTheme}
//                 aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
//               >
//                 {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//               </button>
//               <button
//                 className="navbar-toggler"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#navbarNav"
//                 aria-controls="navbarNav"
//                 aria-expanded="false"
//                 aria-label="Toggle navigation"
//               >
//                 <span className="navbar-toggler-icon"></span>
//               </button>
//               <div className="collapse navbar-collapse" id="navbarNav">
//                 <ul className="navbar-nav ms-auto">
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/login">Login</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/signup">Sign Up</Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </nav>
//         <Routes>
//           <Route path="/login" element={<Login darkMode={darkMode} />} />
//           <Route path="/signup" element={<Signup darkMode={darkMode} />} />
//           <Route path="/dashboard" element={<ProtectedRoute><Dashboard darkMode={darkMode} /></ProtectedRoute>} />
//           <Route path="/alerts" element={<ProtectedRoute><Alerts darkMode={darkMode} /></ProtectedRoute>} />
//           <Route path="/cattle-map" element={<CattleMap darkMode={darkMode} />} />
//           <Route path="/profile" element={<Profile darkMode={darkMode} />} />
//           <Route path="/geofence-manager" element={<GeofenceManager darkMode={darkMode} />} />
//           <Route path="/health" element={<ProtectedRoute><Health darkMode={darkMode} /></ProtectedRoute>} />
//           <Route path="/cattle/:cattle_id" element={<CattleDetails darkMode={darkMode} />} />
//           <Route path="/" element={<LandingPage darkMode={darkMode} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Alerts from './components/Alerts';
import ProtectedRoute from './components/ProtectedRoute';
import CattleMap from './components/CattleMap';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import GeofenceManager from './components/GeofenceManager';
import 'react-toastify/dist/ReactToastify.css';
import CattleDetails from './components/CattleDetails';
import Health from './components/Health';
import { Moon, Sun } from 'react-bootstrap-icons';
import Cattle3D from './components/Cattle3D';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedPreference = localStorage.getItem('darkMode');
    if (savedPreference !== null) {
      return JSON.parse(savedPreference);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      document.body.classList.add('bg-dark');
      document.body.classList.remove('bg-light');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      document.body.classList.add('bg-light');
      document.body.classList.remove('bg-dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`min-vh-100 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-dark bg-primary'} shadow-sm`}>
          <div className="container">
            <Link className="navbar-brand" to="/">Herd Track System</Link>
            <div className="d-flex align-items-center">
              <button 
                className="btn btn-link text-decoration-none me-2"
                onClick={toggleTheme}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cattle-3d">3D Simulation</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/login" element={<Login darkMode={darkMode} />} />
          <Route path="/signup" element={<Signup darkMode={darkMode} />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard darkMode={darkMode} /></ProtectedRoute>} />
          <Route path="/alerts" element={<ProtectedRoute><Alerts darkMode={darkMode} /></ProtectedRoute>} />
          <Route path="/cattle-map" element={<CattleMap darkMode={darkMode} />} />
          <Route path="/profile" element={<Profile darkMode={darkMode} />} />
          <Route path="/geofence-manager" element={<GeofenceManager darkMode={darkMode} />} />
          <Route path="/health" element={<ProtectedRoute><Health darkMode={darkMode} /></ProtectedRoute>} />
          <Route path="/cattle/:cattle_id" element={<CattleDetails darkMode={darkMode} />} />
          <Route path="/" element={<LandingPage darkMode={darkMode} />} />
          <Route path="/cattle-3d" element={<Cattle3D darkMode={darkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;