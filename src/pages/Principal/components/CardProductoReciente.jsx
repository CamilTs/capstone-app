/* eslint-disable react/prop-types */
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
  height: 200px;
`;
const DataContainer = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column wrap;
  justify-content: center;

  gap: 10px;
`;

export const CardProductoReciente = ({ product }) => {
  return (
    <ImgContainer>
      <div>
        <Image src={product.img} alt={product.name} />
      </div>
      <DataContainer>
        <div>
          <div>
            <span>Nombre: </span>
          </div>
          <span style={{ color: "#000" }}>{product.name}</span>
        </div>
        <div>
          <div>
            <span>Cantidad</span>
          </div>
          <span style={{ color: "#423f3f" }}>{product.quantity}</span>
        </div>
      </DataContainer>
    </ImgContainer>
  );
};
