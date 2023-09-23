import { Navigate, Route, Routes } from "react-router-dom"
import { RegistrarUsuarios } from "../pages"
import AgregarProductos from "../components/AgregarProductos"
import { Content } from "../App";

export const AdminRoutes = () => {
  // const login = false;

  // if (login == false) {
  //   return <Navigate to={'/iniciar-sesion'}/>
  // }
  return (
    <Content>

    <Routes>
    <Route path="registrar" element={<RegistrarUsuarios />} />
    <Route path="agregarProductos" element={<AgregarProductos />} />
    </Routes>
    </Content>
  )
}
