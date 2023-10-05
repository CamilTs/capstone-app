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
  flex-flow: column;
  gap: 20px;
  overflow: auto;
`;

const PrimerContenedor = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 90%;
`;

// COMPONENTES

export const PrincipalPage = () => {
  const { getProductosDeHoy } = useProductos();
  const productosHoy = getProductosDeHoy();

  const tabla1 = [
    {
      name: "Producto1",
      totalSold: 4,
      quantity: 12,
    },
    {
      name: "Producto2",
      totalSold: 4,
      quantity: 12,
    },
    {
      name: "Producto3",
      totalSold: 4,
      quantity: 12,
    },
    {
      name: "Producto4",
      totalSold: 4,
      quantity: 12,
    },
    {
      name: "Producto5",
      totalSold: 4,
      quantity: 12,
    },
  ];
  const tabla2 = [
    {
      correlatives: "Producto1",
      name: 4,
      date: new Date(),
      sale: 1000,
    },
    {
      correlatives: "Producto1",
      name: 4,
      date: new Date(),
      sale: 1000,
    },
    {
      correlatives: "Producto1",
      name: 4,
      date: new Date(),
      sale: 1000,
    },
    {
      correlatives: "Producto1",
      name: 4,
      date: new Date(),
      sale: 1000,
    },
    {
      correlatives: "Producto1",
      name: 4,
      date: new Date(),
      sale: 1000,
    },
  ];

  const tabla2Formateada = tabla2.map((item) => {
    return { ...item, date: item.date.toString() };
  });

  return (
    <Contenedor>
      <h1 style={{ fontSize: "25px" }}>Movimientos Recientes</h1>
      <PrimerContenedor>
        {productosHoy.map((producto) => (
          <CardProductoReciente key={producto.id} producto={producto} />
        ))}
      </PrimerContenedor>

      <PrimerContenedor>
        <DataTable value={tabla1} rows={5} showGridlines tableStyle={{ minWidth: "50%", height: "300px" }}>
          <Column field="name" header="Producto"></Column>
          <Column field="totalSold" header="Total vendido"></Column>
          <Column field="quantity" header="Cantidad total"></Column>
        </DataTable>

        <DataTable value={tabla2Formateada} showGridlines tableStyle={{ minWidth: "50%", height: "300px" }}>
          <Column field="correlatives" header="Correlativos"></Column>
          <Column field="name" header="Nombre"></Column>
          <Column field="date" header="Fecha"></Column>
          <Column field="sale" header="Venta"></Column>
        </DataTable>
      </PrimerContenedor>
    </Contenedor>
  );
};
