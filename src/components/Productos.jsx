import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import "../CSS/Productos.css";

export const Productos = () => {
  const [productos, setProductos] = useState([]);

  const cargarProductos = () => {
    const productosGuardados =
      JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(productosGuardados);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter((producto) => producto.id !== id);
    setProductos(nuevosProductos);
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));
  };

  const botonEliminar = (rowData) => {
    return (
      <div>
        <Button
          icon="pi pi-times"
          rounded
          severity="danger"
          aria-label="Cancel"
          onClick={() => eliminarProducto(rowData.id)}
        />
      </div>
    );
  };

  return (
    <div className="container">
      <div className="tableWrapper">
        <h2 className="title">Productos</h2>
        <Button className="p-button-raised p-button-success" icon="pi pi-plus">
          <Link
            to="/admin/agregarProductos"
            style={{ textDecoration: "none", color: "white" }}
          >
            Agregar Productos
          </Link>
        </Button>
        <DataTable value={productos}>
          <Column field="codigoBarra" header="Código de barra" />
          <Column field="producto" header="Productos" />
          <Column field="categorias" header="Categorias" />
          <Column field="cantidad" header="Cantidad" />
          <Column field="precio" header="Precio" />
          <Column body={botonEliminar} />
        </DataTable>
      </div>
    </div>
  );
};
