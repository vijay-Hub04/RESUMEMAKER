import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser, logoutUser, clearAuthError } from '../features/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

  const login = (credentials) => dispatch(loginUser(credentials));
  const register = (userData) => dispatch(registerUser(userData));
  const logout = () => dispatch(logoutUser());
  const resetError = () => dispatch(clearAuthError());

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    resetError,
  };
};

export default useAuth;
