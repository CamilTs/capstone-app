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
