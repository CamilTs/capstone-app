import { Navigate, Route, Routes } from "react-router-dom";
import { AgregarProductos, GraficosCliente, VenderProducto, AgregarProveedores, Publicaciones } from "../pages";
import { Productos } from "../pages/Productos/VerProductos/ProductosPage";
import { Content } from "../App";

import { Tickets } from "../pages/Tickets/Tickets";
import { useEffect, useRef, useState } from "react";
import { useContextSocket } from "../context/SocketContext";
import { Toast } from "primereact/toast";

export const ClienteRoutes = () => {
  const [alertas, setAlertas] = useState([]);
  const { socket } = useContextSocket();
  const toast = useRef(null);

  const getAlertas = () => {
    const alertasStorage = localStorage.getItem("alertas");
    if (alertasStorage) {
      // const alertasParseadas =
      setAlertas(JSON.parse(alertasStorage));
      // mostrarAlertas(alertas);
      // setAlertas(alertasParseadas);
    } else {
      setAlertas([]);
    }
  };

  const escucharAlertas = async (payload) => {
    const { data } = payload;
    const { success } = data;
    console.log(data);
    showToast(data);

    // Obtener alertas del localStorage
    const alertas = localStorage.getItem("alertas");

    if (!success) {
      if (alertas) {
        // Si hay alertas, parsear y filtrar la alerta actual
        const alertasParseadas = JSON.parse(alertas);
        const alertasFiltradas = alertasParseadas.filter((alerta) => alerta.data.nombre !== data.nombre);

        // Agregar la nueva alerta
        alertasFiltradas.push(payload);

        // Actualizar el localStorage con la nueva lista de alertas
        localStorage.setItem("alertas", JSON.stringify(alertasFiltradas));
      } else {
        // Si no hay alertas, simplemente agregar la nueva alerta
        localStorage.setItem("alertas", JSON.stringify([payload]));
      }
    } else {
      // Si success es true, verificar y eliminar la alerta existente del localStorage
      if (alertas) {
        const alertasParseadas = JSON.parse(alertas);
        const alertasFiltradas = alertasParseadas.filter((alerta) => alerta.data.nombre !== data.nombre);
        localStorage.setItem("alertas", JSON.stringify(alertasFiltradas));
      }
      // Puedes realizar otras acciones relacionadas con el caso success === true aquí si es necesario
    }
    getAlertas();
  };

  const showToast = (alerta) => {
    if (alerta.success) {
      toast.current.show({
        severity: "success",
        summary: "Stock actualizado",
        detail: alerta.mensaje,
        life: 3000,
      });
    } else {
      toast.current.show({
        severity: "error",
        summary: `Stock bajo de ${alerta.nombre}`,
        detail: `Quedan ${alerta.cantidad} unidades`,
        life: 5000,
      });
    }
  };

  useEffect(() => {
    getAlertas();
    socket.on("stockBajo", escucharAlertas);

    return () => {
      socket.off("stockBajo", escucharAlertas);
    };
  }, []);
  return (
    <>
      <Content>
        <Routes>
          <Route path="" element={<VenderProducto alertas={alertas} />} />
          <Route path="verProvedor" element={<AgregarProveedores />} />
          <Route path="verPublicaciones" element={<Publicaciones />} />
          <Route path="agregarProductos" element={<AgregarProductos />} />
          <Route path="productos" element={<Productos />} />
          <Route path="graficos" element={<GraficosCliente />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
        <Toast ref={toast} />
      </Content>
    </>
  );
};
