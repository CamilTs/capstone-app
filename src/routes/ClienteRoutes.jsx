import { Route, Routes } from "react-router-dom";
import { PrincipalPage } from "../pages";
import { Productos } from "../pages/Productos/VerProductos/ProductosPage";
import { Content } from "../App";
import AgregarProveedores from "../components/AgregarProveedores";
import AgregarProductos from "../pages/Productos/AgregarProductos/AgregarProductosPage";
import { ProductosProvider } from "../context/ProductosContext";

export const ClienteRoutes = () => {
  return (
    <ProductosProvider>
      <Content width="100%">
        <Routes>
          <Route path="" element={<PrincipalPage />} />
          <Route path="productos" element={<Productos />} />
          <Route path="agregarProductos" element={<AgregarProductos />} />
          <Route path="proveedor" element={<AgregarProveedores />} />
        </Routes>
      </Content>
    </ProductosProvider>
  );
};
