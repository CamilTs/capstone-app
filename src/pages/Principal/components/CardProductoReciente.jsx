/* eslint-disable react/prop-types */
import { Card } from "primereact/card";
import styled from "styled-components";

const ImgContainer = styled.div`
  width: 80%;
  height: 96%;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgb(0, 0, 0, 0.5);
  flex: 1;
  display: flex;
  flex-direction: row;
`;
const Image = styled.img`
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 10px;
  background-color: white;
`;
const DataContainer = styled.div`
  width: 100%;
  gap: 10px;
  font-size: 16px;
  color: black;
  display: flex;
  padding: 10px;
  justify-content: space-evenly;
`;

const CardProductos = styled(Card)`
  width: 100%;
  max-width: 422px;
  height: 100%;
  flex-grow: 1;
  border: 1px solid black;
  background-color: #e2e37c;
`;

export const CardProductoReciente = ({ producto }) => {
  return (
    <ImgContainer>
      <CardProductos>
        <Image src={producto.imagen} alt={producto.producto} />
        <DataContainer>
          <span>Nombre: {producto.producto}</span>
          <span>Cantidad: {producto.cantidad}</span>
        </DataContainer>
      </CardProductos>
    </ImgContainer>
  );
};
