import { Navigate, Route, Routes } from "react-router-dom";
import { Content } from "../App";
import { AgregarPublicacion } from "../pages/Publicacion/AgregarPublicacion";
import { MisPublicados } from "../pages/Publicacion/MisPublicados";
import { Tickets } from "../pages/Tickets/Tickets";

export const ProveedorRoutes = () => {
  return (
    <>
      <Content width="100%">
        <Routes>
          <Route path="" element={<AgregarPublicacion />} />
          <Route path="/ver-Publicados" element={<MisPublicados />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Content>
    </>
  );
};
