import { Route, Routes } from "react-router-dom";
import { PrincipalPage } from "../pages";
import { Productos } from "../components/Productos";
import { Content } from "../App";

export const ClienteRoutes = () => {

 
  return (
    <Content>

    <Routes>
      <Route path="" element={<PrincipalPage />} />
      <Route path="productos" element={<Productos />} />
    </Routes>
    </Content>
  );
};
