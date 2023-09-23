import { Route, Routes } from "react-router-dom";
import { RegistrarUsuarios } from "../pages";
import { AgregarProductos } from "../pages/Productos/AgregarProductos/AgregarProductosPage";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="registrar" element={<RegistrarUsuarios />} />
      <Route path="agregarProductos" element={<AgregarProductos />} />
    </Routes>
  );
};
