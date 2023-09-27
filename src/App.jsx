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

const Container = styled.div`
  background-color: #538a95;
  width: 100%;
  height: 100vh;
  display: flex;
  }
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

function App() {
  const { user } = useAuth();

  return (
    <>
      <Container>
        {user ? <MenuLateral /> : null}
        <Routes>
          {!user && <Route path="/iniciar-sesion" element={<IniciarSesionPage />} />}
          <Route path="/*" element={<ProtectedRoutes />} />
          <Route path="**" element={<Navigate to={"/"} replace />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
