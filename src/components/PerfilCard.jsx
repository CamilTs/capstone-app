import { Button } from "primereact/button";
import { Image } from "primereact/image";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

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

export const PerfilCard = () => {
  const { user, logout } = useAuth();
  return (
    <Content>
      {user && (
        <>
          <Image src={user.fotoPerfil} alt="Image" width="150" height="150" imageStyle={{ borderRadius: 100, objectFit: "cover" }} />
          <div>
            <TextoUsuario>
              {user.nombre} {user.apellidos}
            </TextoUsuario>
          </div>
          <div>
            <TextoUsuario>{user.rol}</TextoUsuario>
          </div>
          <div>
            <TextoUsuario>{user.correo}</TextoUsuario>
          </div>
          <Button severity="danger" onClick={logout}>
            Cerrar Sesión
          </Button>
        </>
      )}
    </Content>
  );
};
