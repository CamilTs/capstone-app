import { Navigate, Route, Routes } from "react-router-dom";
import { AgregarProductos, GraficosCliente, VenderProducto, AgregarProveedores } from "../pages";
import { Productos } from "../pages/Productos/VerProductos/ProductosPage";
import { Content } from "../App";
import { VerPublicaciones } from "../pages/Publicaciones/VerPublicaciones";
// import AgregarProductos from "../pages/Productos/AgregarProductos/AgregarProductosPage";
import { ProductosProvider } from "../context/ProductosContext";
import { Tickets } from "../pages/Tickets/Tickets";

export const ClienteRoutes = () => {
  return (
    <ProductosProvider>
      <Content>
        <Routes>
          <Route path="" element={<VenderProducto />} />
          <Route path="verProvedor" element={<AgregarProveedores />} />
          <Route path="verPublicaciones" element={<VerPublicaciones />} />
          <Route path="agregarProductos" element={<AgregarProductos />} />
          <Route path="productos" element={<Productos />} />
          <Route path="graficos" element={<GraficosCliente />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Content>
    </ProductosProvider>
  );
};
