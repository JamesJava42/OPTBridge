import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const homeByRole = {
  subscriber: '/tracker',
  employee: '/support',
  admin: '/admin',
};

function ProtectedRoute({ roles, children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (!roles.includes(user.role)) return <Navigate to={homeByRole[user.role] || '/'} replace />;
  if (user.role === 'subscriber' && user.subscription !== 'active') return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
