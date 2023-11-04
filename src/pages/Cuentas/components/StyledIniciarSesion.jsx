import { Button } from "primereact/button";
import styled from "styled-components";

export const Contenedor = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
`;

export const Titulo = styled.h2`
  text-transform: uppercase;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 0 1px 0 #538a90, 0 2px 0 #538a70, 0 3px 0 #538a75, 0 4px 0 #538a80, 0 5px 0 #538a90, 0 6px 1px rgba(0, 0, 0, 0.1),
    0 0 5px rgba(0, 0, 0, 0.5), 0 1px 10px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.7), 0 5px 10px rgba(0, 0, 0, 0.5),
    0 10px 10px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.15);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  gap: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.65);
`;

export const ContenedorCampos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const ContenedorSpan = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
`;

export const Boton = styled(Button)`
  width: 100%;
`;
