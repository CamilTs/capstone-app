import { Route, Routes } from "react-router-dom";
import { PrincipalPage, VenderProducto } from "../pages";
import { Productos } from "../pages/Productos/VerProductos/ProductosPage";
import { Content } from "../App";
import AgregarProveedores from "../components/AgregarProveedores";

export const ClienteRoutes = () => {
  return (
    <Content width="100%">
      <Routes>
        <Route path="" element={<PrincipalPage />} />
        <Route path="productos" element={<Productos />} />
        <Route path="venta" element={<VenderProducto />} />
        <Route path="proveedor" element={<AgregarProveedores />} />
      </Routes>
    </Content>
  );
};
