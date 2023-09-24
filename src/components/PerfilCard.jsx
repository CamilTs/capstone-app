import { Button } from "primereact/button";
import { Image } from 'primereact/image';
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";


const Content = styled.div`
    display: grid;
    place-content: center;
`;

export const PerfilCard = () => {
  const { user, logout } = useAuth();
  return (
    <Content>
      {user && (
        
        <>
        <Image src={user.fotoPerfil} alt="Image" width="150" height="150" imageStyle={{borderRadius:100, objectFit:'cover'}} />
          <div>
            <span style={{ color: "#000" }}>
              {user.nombre} {user.apellidos}
            </span>
          </div>
          <div>
            <span style={{ color: "#000" }}>{user.rol}</span>
          </div>
          <div>
            <span style={{ color: "#000" }}>{user.correo}</span>
          </div>
      <Button severity="danger" onClick={logout}>
        Cerrar Sesión
      </Button>
        </>
      )}

    </Content>
  );
};
