import { Navigate, Route, Routes } from "react-router-dom";
import {  Clientes, GestionarCuentas, Tickets } from "../pages";
import { Content } from "../App";
import { AgregarProductosAdmin } from "../pages/ProductosAdmin/AgregarProductos/AgregarProductosAdminPage";

export const AdminRoutes = () => {
  // const login = false;

  // if (login == false) {
  //   return <Navigate to={'/iniciar-sesion'}/>
  // }
  return (
    <>
      <Content width="100%">
        <Routes>
          <Route path="" element={<GestionarCuentas />} />
          <Route path="agregarProductos" element={<AgregarProductosAdmin />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Content>
    </>
  );
};
