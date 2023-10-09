/* eslint-disable react/prop-types */

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useProductos } from "../../context/ProductosContext";
import {
  Contenedor,
  ContenedorCard,
  CardProductos,
  Imagen,
  TituloCard,
  NombreContenedor,
  TituloPrincipal,
  TituloTabla,
  ContenedorMovimientos,
  ContenedorTabla,
} from "./components/StyledPaginaPrincipal";

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
      <TituloPrincipal>Movimientos recientes</TituloPrincipal>
      <ContenedorCard>
        {productosHoy.map((producto) => (
          <CardProductos key={producto.id}>
            <Imagen src={producto.imagen} />
            <NombreContenedor>
              <TituloCard>{producto.producto}</TituloCard>
            </NombreContenedor>
          </CardProductos>
        ))}
      </ContenedorCard>
      <ContenedorMovimientos>
        <ContenedorTabla>
          <TituloTabla>Recientes agregados</TituloTabla>
          <DataTable value={productosRecientesTabla} rows={5} showGridlines tableStyle={{ minWidth: "50%", height: "300px" }}>
            <Column field="nombre" header="Producto"></Column>
            <Column field="cantidad" header="Cantidad"></Column>
            <Column field="precio" header="Precio"></Column>
            <Column field="fecha" header="Fecha de movimiento"></Column>
          </DataTable>
        </ContenedorTabla>
      </ContenedorMovimientos>
    </Contenedor>
  );
};
