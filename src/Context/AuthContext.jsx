import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthenticationContext = createContext();

export const useAuthentication = () => useContext(AuthenticationContext);

const AuthenticationContextProvider = ({ children }) => {
  const userNameKey = 'userName';
  const tokenKey = 'UserToken';

  // Track the user’s token and name in localStorage
  const [token, setToken] = useState(localStorage.getItem(tokenKey) || '');
  const [userName, setUserName] = useState(localStorage.getItem(userNameKey) || '');
  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user , setUser] = useState(localStorage.getItem("user") || "")

  // For redirecting after logout (or login), you can use react-router’s navigate:
  const navigate = useNavigate();

  useEffect(() => {
    // Whenever token changes, store or remove it from localStorage
    if (token) {
      localStorage.setItem(tokenKey, token);
    } else {
      localStorage.removeItem(tokenKey);
    }
  }, [token]);

  useEffect(() => {
    // Whenever userName changes, store or remove it from localStorage
    if (userName) {
      localStorage.setItem(userNameKey, userName);
    } else {
      localStorage.removeItem(userNameKey);
    }
  }, [userName]);

  // Log the user out (clear localStorage, context state, redirect)
  const logout = () => {
    setToken('');
    setUserName('');
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userNameKey);
    navigate('/login'); // Navigate to login after logging out
  };

  const contextValues = {
    token,
    setToken,
    userName,
    setUserName,
    user,
    setUser,
    authError,
    setAuthError,
    isLoading,
    setIsLoading,
    tokenKey,
    logout,
  };

  return (
    <AuthenticationContext.Provider value={contextValues}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
