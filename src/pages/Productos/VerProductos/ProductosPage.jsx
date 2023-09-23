import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import "../../../CSS/Productos.css";

import { TablaProductos } from "./components/TablaProductos";

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
    const nuevosProductos = productos.filter(
      (producto) => producto && producto.id !== id
    );
    setProductos(nuevosProductos);
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));
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
        <TablaProductos
          productos={productos}
          eliminarProducto={eliminarProducto}
        />
      </div>
    </div>
  );
};
