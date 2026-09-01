import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  // If no token exists in localStorage, redirect user to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}