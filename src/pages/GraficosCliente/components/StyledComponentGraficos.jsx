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
`;

export const ContenedorGraficos = styled.div`
  display: grid;
  justify-items: center;
  border-radius: 6px;
  gap: 1rem;
  grid-template-areas:
    "tercero tercero contenedor"
    "tercero tercero contenedor";

  grid-template-columns: 100px 1fr 1fr;
`;

export const ContenedorDerecha = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  grid-area: contenedor;
`;

export const ContenedorDatos = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  padding: 0.5rem;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;

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
  font-size: 25px;
  display: flex;
  margin: 0;
  margin-bottom: 1rem;
  box-sizing: border-box;
`;
