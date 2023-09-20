import { Route, Routes } from "react-router-dom";
import MenuLateral from "./components/MenuLateral";
import { IniciarSesion } from "./components/IniciarSesion";
import { Productos } from "./components/Productos";
import { AgregarProductos } from "./components/AgregarProductos";
import "./App.css";
import "./CSS/Menu.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AgregarProveedores from "./components/AgregarProveedores";
import styled from "styled-components";

import {PrincipalPage, RegistrarUsuarios} from './pages'

const Container = styled.div`
  background-color: #538A95;
  width: 100%;
  height: 100vh;
  display: flex;
`

const Content = styled.div`
    width: 100%;
    margin: 50px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
`

function App() {
  return (
    <>
      <Container className="contenedorPrincipal">
        <MenuLateral />
        <Content className="contenedor">
          <Routes>
            <Route path="/iniciar-sesion" element={<IniciarSesion />} />
            <Route path="/registrar" element={<RegistrarUsuarios />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/agregarProductos" element={<AgregarProductos />} />
            <Route path="/proveedores" element={<AgregarProveedores />} />
            <Route path="/" element={<PrincipalPage />} />
          </Routes>
        </Content>

      </Container>
    </>
  );
}

export default App;
