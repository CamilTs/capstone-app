import { Navigate, Route, Routes } from "react-router-dom";
import { IniciarSesionPage } from "../pages";

export const PublicRoutes = ({ status }) => {
  if (status == "autenticado") {
    return <Navigate to={"/"} replace />;
  }
  return (
    <Routes>
      <Route path="/iniciar-sesion" element={<IniciarSesionPage />} />
      <Route path="*" element={<Navigate to={"/iniciar-sesion"} />} />
    </Routes>
  );
};
