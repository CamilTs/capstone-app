import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BotonCustom = styled(Button)`
  marign: 0 5px;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BotonesAgregarProductos = ({ guardarProductosLocal }) => {
  return (
    <Card>
      <BotonCustom
        style={{ marginRight: "10px" }}
        className="custom-button"
        severity="success"
        label="Confirmar"
        onClick={guardarProductosLocal}
      />
      <Link to="/cliente/productos">
        <BotonCustom severity="danger" label="Cancelar" />
      </Link>
    </Card>
  );
};

export default BotonesAgregarProductos;
