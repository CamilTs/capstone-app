import { Route, Routes } from "react-router-dom";
import { RegistrarUsuarios } from "../pages";
import { Content } from "../App";
import AgregarProductos from "../pages/Productos/AgregarProductos/AgregarProductosPage";
import { ProductosProvider } from "../context/ProductosContext";

export const AdminRoutes = () => {
  // const login = false;

  // if (login == false) {
  //   return <Navigate to={'/iniciar-sesion'}/>
  // }
  return (
    <ProductosProvider>
      <Content width="100%">
        <Routes>
          <Route path="" element={<RegistrarUsuarios />} />
          <Route path="agregarProductos" element={<AgregarProductos />} />
        </Routes>
      </Content>
    </ProductosProvider>
  );
};
