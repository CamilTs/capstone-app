import styled from "styled-components";

export const ContenedorProveedores = styled.div`
  width: 100%;
`;

export const ContenedorHeader = styled.div`
  display: flex;
  margin-bottom: 1rem;
  justify-content: flex-start;
  align-items: center;
`;

export const MiniPerfil = styled.div`
  display: flex;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #50838f;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.8);
`;

export const DatosMiniPerfil = styled.div`
  flex: 1;
  padding-left: 10px;
  color: white;
`;

export const NombreProveedor = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const DescripcionProveedor = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

export const TelefonoProveedor = styled.div`
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
`;

export const CorreoProveedor = styled.div`
  font-size: 0.95rem;
`;

export const BotonesProveedor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
`;

export const ContenedorBoton = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  justify-content: center;
`;

export const ContenedorInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const Campos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
