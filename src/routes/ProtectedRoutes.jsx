import { Navigate, Route, Routes } from "react-router-dom";
import { AdminRoutes } from "./AdminRoutes";
import { ClienteRoutes } from "./ClienteRoutes";
import { ProveedorRoutes } from "./ProveedorRoutes";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoutes = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={"/iniciar-sesion"} />;
  }
  return (
    <Routes>
      {user.rol == "admin" && <Route path="/*" element={<AdminRoutes />} />}
      {user.rol == "cliente" && <Route path="/*" element={<ClienteRoutes />} />}
      {user.rol == "proveedor" && <Route path="/proveedor/*" element={<ProveedorRoutes />} />}
    </Routes>
  );
};
