import { Navigate, Route, Routes } from "react-router-dom";
import { IniciarSesionPage } from "../pages";
import { useAuth } from "../context/AuthContext";

export const PublicRoutes = () => {
  const { user } = useAuth();

  if (user) {
    <Navigate to={"/"} />;
  }
  return (
    <>
      <Routes>{!user && <Route path="/iniciar-sesion" element={<IniciarSesionPage />} />}</Routes>
    </>
  );
};
