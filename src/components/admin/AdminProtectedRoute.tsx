
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const isLoggedIn = localStorage.getItem('admin_logged_in');
  
  if (!isLoggedIn || isLoggedIn !== 'true') {
    return null;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
