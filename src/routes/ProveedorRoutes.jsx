import { Route, Routes } from "react-router-dom"
import AgregarProveedores from "../components/AgregarProveedores"

export const ProveedorRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AgregarProveedores/>}/>
    </Routes>
  )
}
