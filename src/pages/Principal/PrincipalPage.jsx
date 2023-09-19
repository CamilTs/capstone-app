/* eslint-disable react/prop-types */

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styled from "styled-components";
import { CardProductoReciente } from "./components/CardProductoReciente";

// const Container = {
//   backgroundColor: "white",
//   width:'100%',
//   height:'100%'
// };



const Content = styled.div`
  display: flex;
  justify-content: ${({width}) => (width ? 'space-between':null)};
  gap: 10px;
  width: ${({width}) => (width ? `${width}%`: '100%')};
`
// COMPONENTES 


export const PrincipalPage = () => {
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

  const agregado = {
    img: "https://r.btcdn.co/r/eyJzaG9wX2lkIjo0MDY0LCJnIjoiMTAwMHgifQ/f94f9d776de57d4/667046-7613030612339.jpg",
    name: "Super 8",
    price: 1000,
    quantity: 200,
  };

  const tabla2Formateada = tabla2.map((item) => {
    console.log(item)
    return {...item,date: item.date.toString()}
});

  const Container = styled.div`
    padding-top: 20px;
    display: flex;
    align-items: center;
    height: 100%;
    flex-flow: column;
    gap:40px;
  `

  return (

    <Container>
      <Content width="80">
        <CardProductoReciente product={agregado} />
        <CardProductoReciente product={agregado} />
        <CardProductoReciente product={agregado} />
      </Content>

      <Content>
        <DataTable value={tabla1} rows={5} showGridlines tableStyle={{ minWidth: '50rem', height:'300px' }}>
          <Column field="name" header="Producto"></Column>
          <Column field="totalSold" header="Total vendido"></Column>
          <Column field="quantity" header="Cantidad total"></Column>
        </DataTable>

        <DataTable value={tabla2Formateada}  showGridlines tableStyle={{ minWidth: '50rem', height:'300px' }}>
          <Column field="correlatives" header="Correlativos"></Column>
          <Column field="name" header="Nombre"></Column>
          <Column field="date" header="Fecha"></Column>
          <Column field="sale" header="Venta"></Column>
        </DataTable>
      </Content>
    </Container>
  );
};
