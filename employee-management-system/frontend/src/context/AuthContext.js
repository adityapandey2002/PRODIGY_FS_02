import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user
  const loadUser = async () => {
    try {
      const res = await authAPI.getMe();
      dispatch({
        type: 'USER_LOADED',
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const res = await authAPI.login(formData);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      });
      toast.success('Login successful!');
      return res.data;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL' });
      throw error;
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      const res = await authAPI.register(formData);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
      toast.success('Registration successful!');
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await authAPI.logout();
      dispatch({ type: 'LOGOUT' });
      toast.success('Logged out successfully!');
    } catch (error) {
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Update password
  const updatePassword = async (passwords) => {
    try {
      const res = await authAPI.updatePassword(passwords);
      toast.success('Password updated successfully!');
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (state.token) {
      loadUser();
    } else {
      dispatch({ type: 'AUTH_ERROR' });
    }
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        loadUser,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
