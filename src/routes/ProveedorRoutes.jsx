import { Route, Routes } from "react-router-dom";
import { Content } from "../App";
import { AgregarProductosProveedor } from "../components/AgregarProductosProveedor";
import { MisProductos } from "../components/MisProductos";
import { ProductosProvider } from "../context/ProductosContext";

export const ProveedorRoutes = () => {
  return (
    <ProductosProvider>
      <Content>
        <Routes>
          <Route path="/agregarProductos" element={<AgregarProductosProveedor />} />
          <Route path="/verProductos" element={<MisProductos />} />
        </Routes>
      </Content>
    </ProductosProvider>
  );
};
