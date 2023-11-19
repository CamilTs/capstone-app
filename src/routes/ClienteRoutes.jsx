import { Navigate, Route, Routes } from "react-router-dom";
import { AgregarProductos, GraficosCliente, PrincipalPage, VenderProducto } from "../pages";
import { Productos } from "../pages/Productos/VerProductos/ProductosPage";
import { Content } from "../App";
import AgregarProveedores from "../pages/MisProveedores/AgregarProveedores";
import { VerPublicaciones} from "../pages/Publicaciones/VerPublicaciones";
// import AgregarProductos from "../pages/Productos/AgregarProductos/AgregarProductosPage";
import { ProductosProvider } from "../context/ProductosContext";

export const ClienteRoutes = () => {
  return (
    <ProductosProvider>
      <Content>
        <Routes>
          <Route path="" element={<VenderProducto />} />
          <Route path="productos" element={<Productos />} />
          <Route path="agregarProductos" element={<AgregarProductos />} />
          <Route path="verProvedor" element={<AgregarProveedores />} />
          <Route path="verPublicaciones" element={<VerPublicaciones />} />
          <Route path="graficos" element={<GraficosCliente />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Content>
    </ProductosProvider>
  );
};
