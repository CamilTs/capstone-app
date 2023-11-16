import { Navigate, Route, Routes } from "react-router-dom";
import { AgregarProductos, GraficosCliente, VenderProducto, AgregarProveedores } from "../pages";
import { Productos } from "../pages/Productos/VerProductos/ProductosPage";
import { Content } from "../App";
import { ProductosProvider } from "../context/ProductosContext";

export const ClienteRoutes = () => {
  return (
    <ProductosProvider>
      <Content>
        <Routes>
          <Route path="" element={<VenderProducto />} />
          <Route path="verProvedor" element={<AgregarProveedores />} />
          <Route path="agregarProductos" element={<AgregarProductos />} />
          <Route path="productos" element={<Productos />} />
          <Route path="graficos" element={<GraficosCliente />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Content>
    </ProductosProvider>
  );
};
