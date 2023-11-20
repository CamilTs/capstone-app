import React from "react";
import styled from "styled-components";

const Titulo = styled.h5`
  font-size: 18px;
  display: flex;
  margin: 0;
  gap: 0.5rem;
  align-items: center;

  &.tituloCard {
    color: black;
    width: 100%;
    justify-content: center;
    background-color: #f3f4f6;
    border-bottom: 3px solid #e5e7eb;
  }
`;

export const CustomCard = ({ titulo, icono, colorContenedor, colorIcono, datos, texto }) => (
  <div className="col-12 md:col-4 lg:col-4">
    <div className="surface-card shadow-2 p-3 border-round">
      <div className="flex justify-content-between mb-3">
        <div>
          <Titulo className="block mb-3">{titulo}</Titulo>
          <div className="text-900 font-medium text-xl">{Array.isArray(datos) ? datos.reduce((a, b) => a + b.cantidadVendida, 0) : datos}</div>
        </div>
        <div className={`flex align-items-center justify-content-center ${colorContenedor} border-round`} style={{ width: "3rem", height: "3rem" }}>
          <i className={`pi ${icono} ${colorIcono} text-xl`}></i>
        </div>
      </div>
      <span className="text-green-500 font-medium">{Array.isArray(datos) ? datos.reduce((a, b) => a + b.cantidadVendida, 0) : datos} </span>
      <span className="text-500"> {texto} </span>
    </div>
  </div>
);
