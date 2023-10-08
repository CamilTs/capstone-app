/* eslint-disable react/prop-types */

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styled from "styled-components";
import { CardProductoReciente } from "./components/CardProductoReciente";

import { useProductos } from "../../context/ProductosContext";

const Contenedor = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
`;

const PrimerContenedor = styled.div`
  display: flex;
  height: 450px;
  justify-content: center;
  align-items: center;
  // flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
`;

// COMPONENTES

export const PrincipalPage = () => {
  const { getProductosDeHoy } = useProductos();
  const productosHoy = getProductosDeHoy();

  const formatearFecha = (fecha) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(fecha).toLocaleString("es-ES", options);
  };

  const productosRecientesTabla = productosHoy.map((producto) => {
    return {
      nombre: producto.producto,
      cantidad: producto.cantidad,
      precio: producto.precio,
      fecha: formatearFecha(producto.fecha),
    };
  });

  return (
    <Contenedor>
      <h1 style={{ fontSize: "25px" }}>Movimientos recientes</h1>
      <PrimerContenedor>
        {productosHoy.map((producto) => (
          <CardProductoReciente key={producto.id} producto={producto} />
        ))}
      </PrimerContenedor>

      <PrimerContenedor>
        <div>
          <h1 style={{ fontSize: "20px" }}>Recientes agregados</h1>
          <DataTable value={productosRecientesTabla} rows={5} showGridlines tableStyle={{ minWidth: "50%", height: "300px" }}>
            <Column field="nombre" header="Producto"></Column>
            <Column field="cantidad" header="Cantidad"></Column>
            <Column field="precio" header="Precio"></Column>
            <Column field="fecha" header="Fecha de movimiento"></Column>
          </DataTable>
        </div>
      </PrimerContenedor>
    </Contenedor>
  );
};
