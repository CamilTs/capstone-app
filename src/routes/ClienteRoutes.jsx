import { Navigate, Route, Routes } from "react-router-dom";
import { PrincipalPage, VenderProducto } from "../pages";
import { Productos } from "../pages/Productos/VerProductos/ProductosPage";
import { Content } from "../App";
import AgregarProveedores from "../components/AgregarProveedores";
import AgregarProductos from "../pages/Productos/AgregarProductos/AgregarProductosPage";
import { ProductosProvider } from "../context/ProductosContext";

export const ClienteRoutes = () => {
  return (
    <ProductosProvider>
      <Content>
        <Routes>
          <Route path="" element={<PrincipalPage />} />
          <Route path="productos" element={<Productos />} />
          <Route path="venta" element={<VenderProducto />} />
          <Route path="agregarProductos" element={<AgregarProductos />} />
          <Route path="verProvedor" element={<AgregarProveedores />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Content>
    </ProductosProvider>
  );
};
