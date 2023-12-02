import styled from "styled-components";

export const Contenedor = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  flex-direction: column;
  overflow-y: auto;
`;

export const ContenedorGraficos = styled.div`
  display: grid;
  justify-items: center;
  gap: 1rem;
  padding: 0.5rem;
  grid-template-areas:
    "tercero tercero contenedor"
    "tercero tercero contenedor";
  grid-template-columns: 80px 1fr 1fr;

  @media (max-width: 950px) {
    grid-template-areas:
      "tercero"
      "contenedor"
      "primero"
      "segundo";
    grid-template-columns: 1fr;
  }
`;

export const ContenedorDerecha = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 1rem;
  grid-area: contenedor;
`;

export const ContenedorDatos = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  padding: 0.5rem;
  width: 100%;
  height: 100%;
  border: 1px solid #e5e7eb;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  &.primero {
    grid-area: primero;
  }
  &.segundo {
    grid-area: segundo;
  }
  &.tercero {
    grid-area: tercero;
  }
`;

export const Titulo = styled.h5`
  font-size: 18px;
  display: flex;
  margin: 0;
  gap: 0.5rem;
  align-items: center;

  &.tituloCard {
    font-size: 24px;
    font-weight: 600;
    color: black;
    width: 100%;
    justify-content: center;
    background-color: #f3f4f6;
    padding: 0.5rem;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    border-bottom: 3px solid #e5e7eb;
  }
`;
