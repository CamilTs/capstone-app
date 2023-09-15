import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import '../CSS/Productos.css';


const initialProductos = [
  { codigoProducto: '001', producto: 'Producto 1', cantidad: 1, precio: 1000 },
  { codigoProducto: '002', producto: 'Producto 2', cantidad: 5, precio: 2000 },
  { codigoProducto: '003', producto: 'Producto 3', cantidad: 2, precio: 1000 },
];

export const Productos = () => {
  const [productos, setProductos] = useState(initialProductos);

  const eliminarProducto = (codigoProducto) => {
    const nuevosProductos = productos.filter((producto) => producto.codigoProducto !== codigoProducto);
    setProductos(nuevosProductos);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel" onClick={() => eliminarProducto(rowData.codigoProducto)}/>
      </div>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="tableWrapper">
          <h2 className="title">Productos</h2>
          <DataTable value={productos}>
            <Column field="codigoProducto" header="Código de Producto" />
            <Column field="producto" header="Productos" />
            <Column field="cantidad" header="Cantidad" />
            <Column field="precio" header="Precio" />
            <Column body={actionBodyTemplate} />
          </DataTable>
        </div>
      </div>
    </div>
  );
};





