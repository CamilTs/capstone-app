import styled from "styled-components";

export const Contenedor = styled.div`
  background-color: gray;
  padding: 1rem 2rem 1rem 2rem;
  display: flex;
  width: 100%;
  height: 100%;

  @media (max-width 1200px) {
    overflow-y: scroll;
    flex-wrap: wrap;
  }
`;

export const ContenedorGraficos = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  border: 1px solid black;

  @media (max-width: 1500px) {
  }
`;

export const ContenedorDatos = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
`;

export const Titulo = styled.h5`
  font-size: 25px;
  display: flex;
  justify-content: center;
`;
