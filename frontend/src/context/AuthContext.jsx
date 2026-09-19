import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('darukaa_token') || 'demo-jwt-token');
  const [user, setUser] = useState({
    email: 'admin@darukaa.earth',
    full_name: 'MRV Administrator',
    role: 'Administrator'
  });

  const login = (email, password) => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + btoa(JSON.stringify({ sub: email, role: 'Administrator' })) + '.mockSignature';
    localStorage.setItem('darukaa_token', mockToken);
    setToken(mockToken);
    setUser({ email, full_name: email.split('@')[0], role: 'Administrator' });
    return true;
  };

  const register = (name, email, role) => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + btoa(JSON.stringify({ sub: email, role: role || 'Administrator' })) + '.mockSignature';
    localStorage.setItem('darukaa_token', mockToken);
    setToken(mockToken);
    setUser({ email, full_name: name, role: role || 'Administrator' });
    return true;
  };

  const logout = () => {
    localStorage.removeItem('darukaa_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
