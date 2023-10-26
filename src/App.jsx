import { Navigate, Route, Routes } from "react-router-dom";
import MenuLateral from "./components/MenuLateral";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import styled from "styled-components";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { SocketProvider } from "./context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthToken } from "./store/auth";
import { PublicRoutes } from "./routes/PublicRoutes";

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
`;

function App() {
  const { status, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthToken());
  }, []);
  return (
    <ContenedorMenuPagina>
      <SocketProvider>
        {status == "autenticado" ? <MenuLateral /> : null}
        <Container>
          <Routes>
            {status == "autenticado" ? (
              <Route path="/*" element={<ProtectedRoutes />} />
            ) : (
              <Route path="/*" element={<PublicRoutes status={status} />} />
            )}
            {/* <Route path="**" element={<h1>Hola mundo</h1>} /> */}
          </Routes>
        </Container>
      </SocketProvider>
    </ContenedorMenuPagina>
  );
}

export default App;
