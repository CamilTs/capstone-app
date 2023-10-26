import { Navigate, Route, Routes } from "react-router-dom";
import { IniciarSesionPage } from "../pages";

export const PublicRoutes = ({ status }) => {
  console.log(status);
  if (status == "autenticado") {
    return <Navigate to={"/"} replace />;
  }
  console.log("first");
  return (
    <Routes>
      <Route path="/iniciar-sesion" element={<IniciarSesionPage />} />
      <Route path="*" element={<Navigate to={"/iniciar-sesion"} />} />
    </Routes>
  );
};
