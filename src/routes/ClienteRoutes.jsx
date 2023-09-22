import { Route, Routes } from "react-router-dom";
import { PrincipalPage } from "../pages";
import { Productos } from "../components/Productos";

export const ClienteRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<PrincipalPage />} />
      <Route path="productos" element={<Productos />} />
    </Routes>
  );
};
