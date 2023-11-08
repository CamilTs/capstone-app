import styled from "styled-components";

export const Contenedor = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  overflow: auto;
`;

export const ContendorFinal = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #538a95;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
`;

export const ContenedorGraficos = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 6px;
  gap: 1rem;
`;

export const ContenedorDatos = styled.div`
  color: black;
  display: flex;
  border-radius: 6px;
  padding: 1rem;
  flex-direction: column;
  width: 100%;
  background-color: #ffffff;
`;

export const Titulo = styled.h5`
  font-size: 25px;
  display: flex;
  margin: 0;
  margin-bottom: 1rem;
  box-sizing: border-box;

  &.a {
    color: white;
  }
`;
