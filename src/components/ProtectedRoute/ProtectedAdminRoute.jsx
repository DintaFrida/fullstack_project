import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { adminToken, loading } = useContext(AuthContext);

  if (loading) return <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>;
  if (!adminToken) return <Navigate to="/admin/login" replace />;

  return children;
};

export default ProtectedAdminRoute;