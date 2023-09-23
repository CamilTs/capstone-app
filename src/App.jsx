import { Route, Routes } from "react-router-dom";
import MenuLateral from "./components/MenuLateral";
// import { Productos } from "./components/Productos";
// import { AgregarProductos } from "./components/AgregarProductos";
import "./App.css";
import "./CSS/Menu.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// import AgregarProveedores from "./components/AgregarProveedores";
import styled from "styled-components";
import { AdminRoutes, ClienteRoutes, ProveedorRoutes } from "./routes";
import { IniciarSesionPage } from "./pages";
import { useAuth } from "./context/AuthContext";

const Container = styled.div`
  background-color: #538a95;
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const Content = styled.div`
  /* width: 100%; */
  width: ${({width}) => (width? width: '100%')};
  margin: ${({margin}) => (margin? margin: '50px')};
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
`;

function App() {
  const {user} = useAuth()
  
  return (
    <>
      <Container className="contenedorPrincipal">
        {user? <MenuLateral />:null}
        <Routes>
          <Route path="/iniciar-sesion" element={<IniciarSesionPage />} />

          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/cliente/*" element={<ClienteRoutes />} />
          <Route path="/proveedor/*" element={<ProveedorRoutes />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
