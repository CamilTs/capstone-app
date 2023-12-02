import React from "react";
import styled from "styled-components";

const Titulo = styled.h5`
  font-size: 18px;
  display: flex;
  margin: 0;
  gap: 0.5rem;
  align-items: center;
`;

export const CustomCard = ({ titulo, icono, colorContenedor, colorIcono, primerDatos, segundoDatos, primerTexto, segundoTexto }) => (
  <div className="flex flex-row w-full justify-content-center">
    <div className="w-11 surface-card shadow-2 p-3 border-round">
      <div className="flex justify-content-between mb-3">
        <div>
          <Titulo className="block mb-3">{titulo}</Titulo>
          <div className="text-900 font-medium text-xl">
            {Array.isArray(primerDatos) ? primerDatos.reduce((a, b) => a + b.cantidadVendida, 0) : primerDatos}
          </div>
        </div>
        <div className={`flex align-items-center justify-content-center ${colorContenedor} border-round`} style={{ width: "3rem", height: "3rem" }}>
          <i className={`pi ${icono} ${colorIcono} text-xl`}></i>
        </div>
      </div>
      <span className="text-500"> {primerTexto} </span>
      <span className="text-green-500 font-medium">
        {Array.isArray(segundoDatos) ? segundoDatos.reduce((a, b) => a + b.cantidadVendida, 0) : segundoDatos}{" "}
      </span>
      <span className="text-500"> {segundoTexto} </span>
    </div>
  </div>
);
