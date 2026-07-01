import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = (newToken, userData = null) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
  };

  const adminLogin = (newToken) => {
    localStorage.setItem("adminToken", newToken);
    setAdminToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, adminToken, user, login, logout, adminLogin, adminLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};