import { useContext } from "react";                        
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";   
function PrivateRoute({ children }) {
  const { token, loading } = useContext(AuthContext);      

  // Tunggu dulu sampai context selesai cek token
  if (loading) return null;

  // Kalau belum login, redirect ke halaman login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;