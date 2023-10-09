import { Navigate, Route, Routes } from "react-router-dom";
import MenuLateral from "./components/MenuLateral";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import styled from "styled-components";
import { IniciarSesionPage } from "./pages";
import { useAuth } from "./context/AuthContext";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { Button } from "primereact/button";
import { useState } from "react";

const Container = styled.div`
  background-color: #538a95;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ContenedorMenuPagina = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
`;

export const Content = styled.div`
  /* width: 100%; */
  width: ${({ width }) => (width ? width : "100%")};
  margin: ${({ margin }) => (margin ? margin : "50px")};
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: auto;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  color: black;
  letter-spacing: 0.4;
  }
`;

const ButtonMenu = styled(Button)`
  border-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background: white;
  color: black;
  display: flex;
  width: 1rem;
  height: 2rem;
  padding: 0.5rem;
  border: 0px solid black;

  &:enabled:hover {
    background: #538a95;
    color: white;
    border: 1px solid black;
  }
  }
`;

function App() {
  const { user } = useAuth();
  const [menuVisible, setMenuVisible] = useState(true);

  const abrirMenu = () => {
    setMenuVisible(true);
  };

  const cerrarMenu = () => {
    setMenuVisible(false);
  };

  const botonMenu = () => {
    if (menuVisible) {
      cerrarMenu();
    } else {
      abrirMenu();
    }
  };

  return (
    <ContenedorMenuPagina>
      {user ? <MenuLateral style={{ display: menuVisible ? "block" : "none" }} /> : null}
      <Container>
        <ButtonMenu icon={menuVisible ? "pi pi-chevron-left" : "pi pi-chevron-right"} onClick={botonMenu} />
        <Routes>
          {!user && <Route path="/iniciar-sesion" element={<IniciarSesionPage />} />}
          <Route path="/*" element={<ProtectedRoutes />} />
          <Route path="**" element={<Navigate to={"/"} replace />} />
        </Routes>
      </Container>
    </ContenedorMenuPagina>
  );
}

export default App;
