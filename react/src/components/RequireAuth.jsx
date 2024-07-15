import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext'; // Import the hook created earlier
import Cookies from 'js-cookie';

const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();
    const userInfo = Cookies.get('userInfo');

    if (!userInfo) {
        // Redirect them to the login page, but save the current location they were trying to go to after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;