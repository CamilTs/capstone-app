import styled from "styled-components";

export const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 1rem 2rem 1rem 2rem;
`;

export const ContenedorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ContenedorOpciones = styled.div`
  gap: 5px;
  display: flex;
`;

export const ContenedorExportar = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1rem;
`;

export const ContenedorTabla = styled.div`
  padding: 1rem;
  border-radius: 5px;
  background-color: white;
  width: 100%;
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
