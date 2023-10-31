import { Navigate, Route, Routes } from "react-router-dom";
import { Content } from "../App";
import { AgregarPublicacion } from "../pages/Publicacion/AgregarPublicacion";
import { MisPublicados } from "../pages/Publicacion/MisPublicados";
import { ProductosProvider } from "../context/ProductosContext";

export const ProveedorRoutes = () => {
  return (
    <ProductosProvider>
      <Content>
        <Routes>
          <Route path="" element={<AgregarPublicacion />} />
          <Route path="/ver-Publicados" element={<MisPublicados />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Content>
    </ProductosProvider>
  );
};
