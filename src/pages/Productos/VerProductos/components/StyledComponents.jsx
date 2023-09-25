import styled from "styled-components";

const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Tabla = styled.div`
  padding: 20px;
  border-radius: 5px;
  background-color: white;
  height: 100%;
  width: 100%;
  overflow-x: auto;

  @media (max-width: 1199.98px) {
    padding: 10px;
    font-size: 12px;
  }
  @media (max-width: 991.98px) {
    padding: 8px;
    font-size: 10px;
  }
  @media (max-width: 767.98px) {
    padding: 6px;
    font-size: 10px;
  }
  @media (max-width: 575.95px) {
    padding: 4px;
    font-size: 10px;
  }
`;

const NombreColumna = styled.th`
  @media (max-width: 1199.98px) {
    font-size: 14px;
  }

  @media (max-width: 991.98px) {
    font-size: 12px;
  }

  @media (max-width: 767.98px) {
    font-size: 10px;
  }

  @media (max-width: 575.95px) {
    font-size: 10px;
  }
`;

const DatosCelda = styled.div`
  white-space: nowrap;
  font-size: 14px;

  @media (max-width: 1199.98px) {
    font-size: 14px;
  }

  @media (max-width: 991.98px) {
    font-size: 14px;
  }

  @media (max-width: 767.98px) {
    font-size: 14px;
  }

  @media (max-width: 575.95px) {
    font-size: 14px;
  }
`;
