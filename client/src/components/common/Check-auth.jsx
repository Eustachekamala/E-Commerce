import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * CheckAuth component to handle authentication and authorization redirections.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isAuthenticated - Indicates if the user is authenticated.
 * @param {Object} props.user - The authenticated user object.
 * @param {string} props.user.role - The role of the authenticated user.
 * @param {React.ReactNode} props.children - The child components to render if authenticated.
 * @returns {React.ReactNode} - The appropriate redirection or the child components.
 */
function CheckAuth({ isAuthenticated, user, children }) {
    const loacation = useLocation();

    if (
        !isAuthenticated &&
        !(
            location.pathname.includes("/login") ||
            loacation.pathname.includes("/register")
        )
    ) {
        return <Navigate to='/auth/login' />;
    }

    if (isAuthenticated && (loacation.pathname.includes('/login') || (loacation.pathname.includes('/register')))) {
        if (user?.role === 'admin') {
            return <Navigate to='/admin/dashboard' />
        } else {
            return <Navigate to='/shop/home' />
        }
    }

    if (isAuthenticated && user?.role !== "admin" && location.pathname.includes('admin')) {
        return <Navigate to="/unauth-page" />
    }

    if (isAuthenticated && user?.role === "admin" && loacation.pathname.includes('shop')) {
        return <Navigate to="/admin/dashboard" />
    }

    return <>{children}</>
}

CheckAuth.propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    children: PropTypes.array
}

export default CheckAuth;
