import { Button } from "primereact/button";
import { Image } from "primereact/image";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { cerrarSesion } from "../store/auth";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useRef } from "react";
import { Toast } from "primereact/toast";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const TextoUsuario = styled.span`
  color: black;
  font-size: 16px;
`;

export const PerfilCard = ({ cerrarCuenta: cerrarCuentaDialog }) => {
  const [usuario, setUsuario] = useState(null);
  const toast = useRef(null);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const traerUsuario = async () => {
    const res = await api.get(`usuario/${id}`);
    setUsuario(res.data.data);
  };

  useEffect(() => {
    traerUsuario();
  }, []);
  return (
    <Content>
      <Toast ref={toast} />
      {usuario && (
        <div>
          <Image src={usuario.imagen} alt="Image" width="150" height="150" imageStyle={{ borderRadius: 100, objectFit: "cover" }} />
          <div>
            <TextoUsuario>
              {usuario.nombre} {usuario.apellidos}
            </TextoUsuario>
          </div>
          <div>
            <TextoUsuario>{usuario.rol.rol}</TextoUsuario>
          </div>
          <div>
            <TextoUsuario>{usuario.correo}</TextoUsuario>
          </div>
          <Button severity="danger" label="Cerrar Sesión" onClick={cerrarCuentaDialog} />
        </div>
      )}
    </Content>
  );
};
