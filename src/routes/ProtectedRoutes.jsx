import { Navigate, Route, Routes } from "react-router-dom";
import { AdminRoutes } from "./AdminRoutes";
import { ClienteRoutes } from "./ClienteRoutes";
import { ProveedorRoutes } from "./ProveedorRoutes";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const ProtectedRoutes = () => {
  const { status, rol } = useSelector((state) => state.auth);
  if (status == "no-autenticado") {
    return <Navigate to={"/iniciar-sesion"} />;
  }
  // useEffect(() => {

  // }, [status]);
  return (
    <>
      <Routes>
        {rol == "admin" && <Route path="/*" element={<AdminRoutes />} />}
        {rol == "cliente" && <Route path="/*" element={<ClienteRoutes />} />}
        {rol == "proveedor" && <Route path="/proveedor/*" element={<ProveedorRoutes />} />}
      </Routes>
    </>
  );
};
