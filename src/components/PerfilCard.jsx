import { Button } from "primereact/button";
import { Image } from "primereact/image";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useRef } from "react";

const ContenedorTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const ContenedorDatos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-sizing: border-box;
`;

const TextoUsuario = styled.span`
  color: black;
  font-size: 16px;
`;

export const PerfilCard = ({ cerrarCuenta: cerrarCuentaDialog }) => {
  const [usuario, setUsuario] = useState(null);
  const toast = useRef(null);
  const { id, token, status } = useSelector((state) => state.auth);
  const traerUsuario = async () => {
    console.log("ID", id)
    const res = await api.get(`usuario/${id}`);
    setUsuario(res.data.data);
  };

  useEffect(() => {
    console.log("Status", status)
    traerUsuario();
  }, [status]);
  return (
    <ContenedorTotal>
      {usuario && (
        <ContenedorTotal>
          <Image src={usuario.imagen} alt="Image" width="150" height="150" imageStyle={{ borderRadius: 100, objectFit: "cover" }} />
          <ContenedorDatos>
            <TextoUsuario>
              {usuario.nombre} {usuario.apellido}
            </TextoUsuario>
            <TextoUsuario>{usuario.rol.rol}</TextoUsuario>
            <TextoUsuario>{usuario.correo}</TextoUsuario>
            <Button
              raised
              severity="danger"
              icon="pi pi-sign-out"
              iconPos="right"
              label="Cerrar Sesión"
              onClick={cerrarCuentaDialog}
              style={{ width: "100%" }}
            />
          </ContenedorDatos>
        </ContenedorTotal>
      )}
    </ContenedorTotal>
  );
};
