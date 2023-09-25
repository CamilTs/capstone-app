/* eslint-disable react/prop-types */
import { Card } from "primereact/card";
import styled from "styled-components";

const ImgContainer = styled.div`
  border: 1px solid #fff;
  box-shadow: 0px 0px 5px 0px rgb(0, 0, 0, 0.25);
  flex: 1;
  display: flex;
  flex-direction: row;
`;
const Image = styled.img`
  width: 200px;
  height: 150px;
  float: left;
  object-fit: contain;
  border-radius: 10px;
  background-color: white;
`;
const DataContainer = styled.div`
  width: 35%;
  gap: 10px;
  float: right;
  font-size: 13px;
  color: black;
`;

const CardProductos = styled(Card)`
  width: 350px;
  height: 220px;
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
          <span>Nombre: {producto.producto} </span>
          <span>Cantidad: {producto.cantidad}</span>
        </DataContainer>
      </CardProductos>
    </ImgContainer>
  );
};
