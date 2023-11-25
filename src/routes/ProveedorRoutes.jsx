import { Navigate, Route, Routes } from "react-router-dom";
import { Content } from "../App";
import { AgregarPublicacion } from "../pages/Publicacion/AgregarPublicacion";
import { MisPublicados } from "../pages/Publicacion/MisPublicados";

export const ProveedorRoutes = () => {
  return (
    <>
      <Content width="100%">
        <Routes>
          <Route path="" element={<AgregarPublicacion />} />
          <Route path="/ver-Publicados" element={<MisPublicados />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Content>
    </>
  );
};
