import styled from "styled-components";

export const Contenedor = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;

  @media (max-width: 675px) {
    gap: 1rem;
    overflow-x: scroll;
  }
`;

export const ContenedorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 675px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ContenedorOpciones = styled.div`
  gap: 5px;
  display: flex;
`;

export const ContenedorExportar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;

export const ContenedorTabla = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Titulo = styled.h2`
  font-size: 25px;
`;

export const CustomCircle = styled.div`
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  font-weight: bold;
  font-size: 14px;
  width: 2rem;
  height: 2rem;

  &.bg-red-100 {
    background-color: #ffcdd2;
  }

  &.text-red-900 {
    color: #b71c1c;
  }

  &.bg-yellow-100 {
    background-color: #ffecb3;
  }

  &.text-yellow-900 {
    color: #ff6f00;
  }

  &.bg-green-100 {
    background-color: #c8e6c9;
  }

  &.text-green-900 {
    color: #1b5e20;
  }
`;
