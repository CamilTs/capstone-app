import { Route, Routes } from "react-router-dom"
import AgregarProveedores from "../components/AgregarProveedores"
import { Content } from "../App"

export const ProveedorRoutes = () => {

  return (
    <Content>

    <Routes>
      <Route path="" element={<AgregarProveedores/>}/>
    </Routes>
    </Content>
  )
}
