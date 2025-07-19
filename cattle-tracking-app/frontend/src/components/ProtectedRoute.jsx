import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, darkMode }) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
  return (
    <div className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
      {children}
    </div>
  );
}

export default ProtectedRoute;