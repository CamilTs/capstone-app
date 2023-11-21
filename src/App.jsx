import "/node_modules/primeflex/primeflex.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { MenuLateral } from "./components/MenuLateral";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import styled from "styled-components";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { useEffect, useRef, useState } from "react";
import { SocketProvider } from "./context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { cerrarSesion, checkAuthToken } from "./store/auth";
import { PublicRoutes } from "./routes/PublicRoutes";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

const ContenedorMenuPagina = styled.div`
  height: 100%;
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: #538a95;
`;

const Container = styled.div`
  background-color: #538a95;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Content = styled.div`
  /* width: 100%; */
  width: ${({ width }) => (width ? width : "100%")};
  margin: ${({ margin }) => (margin ? margin : "50px")};
  background-color: #fff;
  border-radius: 10px;
  height: auto
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  color: black;
  letter-spacing: 0.4;
`;

function App() {
  const { status, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useRef(null);

  const confirmarCerrarCuenta = () => {
    confirmDialog({
      message: "¿Deseas cerrar sesión?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Si",
      acceptIcon: "pi pi-check",
      rejectClassName: "p-button-secondary",
      rejectLabel: "No",
      rejectIcon: "pi pi-times",
      accept: () => {
        toast.current.show({ severity: "success", summary: "Éxito", detail: "Cerrando sesión", life: 2000 });
        dispatch(cerrarSesion());
      },
      reject: () => {
        toast.current.show({
          severity: "info",
          summary: "Cancelado",
          detail: "Cierre de sesión cancelado",
          life: 2000,
        });
      },
    });
  };

  useEffect(() => {
    dispatch(checkAuthToken());
  }, []);
  return (
    <>
      <ContenedorMenuPagina>
        <SocketProvider>
          {status == "autenticado" ? <MenuLateral cerrarCuenta={confirmarCerrarCuenta} /> : null}
          <Container>
            <Routes>
              {status == "autenticado" ? (
                <Route path="/*" element={<ProtectedRoutes />} />
              ) : (
                <Route path="/*" element={<PublicRoutes status={status} />} />
              )}
            </Routes>
          </Container>
        </SocketProvider>
      </ContenedorMenuPagina>
      <ConfirmDialog />
      <Toast ref={toast} />
    </>
  );
}

export default App;
