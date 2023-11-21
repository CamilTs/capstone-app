import { Navigate, Route, Routes } from "react-router-dom";
import { AgregarProductos, Clientes, GestionarCuentas, Tickets } from "../pages";
import { Content } from "../App";
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
          <Route path="" element={<GestionarCuentas />} />
          <Route path="agregarProductos" element={<AgregarProductos />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Content>
    </ProductosProvider>
  );
};
