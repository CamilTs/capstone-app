import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import "../../../CSS/Productos.css";

import { useProductos } from "../../../context/ProductosContext";
import { useAuth } from "../../../context/AuthContext";

import { formatoCurrencyCLP } from "../../../components/FormatoDinero";

export const Productos = () => {
  const { user } = useAuth();
  const { productosData, eliminarProducto } = useProductos();
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [productoAEliminarId, setProductoAEliminarId] = useState(null);

  const productosCliente = user ? productosData[user.id] || [] : [];

  const handleEliminarProducto = (productoId) => {
    if (user) {
      if (user.rol === "cliente") {
        setProductoAEliminarId(productoId, user.id);
        setConfirmDialogVisible(true);
      } else {
        alert("No puedes eliminar el producto");
      }
    }
  };

  const toast = useRef(null);
  const mostrar = () => {
    toast.current.show({ severity: "info", summary: "Eliminado", detail: "Producto Eliminado", life: 2000 });
  };

  const handleEliminarProductoClick = () => {
    if (productoAEliminarId) {
      console.log("ID del producto a eliminar:", productoAEliminarId);
      eliminarProducto(productoAEliminarId, user.id);
      mostrar();
      setConfirmDialogVisible(false);
      setProductoAEliminarId(null);
    }
  };

  const botonEliminar = (rowData) => {
    return (
      <div>
        <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel" onClick={() => handleEliminarProducto(rowData.id)} />
        <ConfirmDialog
          visible={confirmDialogVisible}
          onHide={() => setConfirmDialogVisible(false)}
          message="¿Seguro que deseas eliminar este producto?"
          header="Confirmar Eliminación"
          icon="pi pi-exclamation-triangle"
          acceptClassName="p-button-danger"
          acceptLabel="Sí"
          rejectLabel="No"
          footer={
            <div>
              <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={handleEliminarProductoClick} />
              <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => setConfirmDialogVisible(false)} />
            </div>
          }
        />
      </div>
    );
  };

  return (
    <div className="container">
      <Toast ref={toast} />
      <div className="tableWrapper">
        <h2 className="title">Productos</h2>
        <Button className="p-button-raised p-button-success" icon="pi pi-plus">
          <Link to="/cliente/agregarProductos" style={{ textDecoration: "none", color: "white" }}>
            Agregar Productos
          </Link>
        </Button>
        <DataTable value={productosCliente}>
          <Column field="codigoBarra" header="Código de barra" />
          <Column field="producto" header="Productos" />
          <Column field="categoria" header="Categorias" />
          <Column field="cantidad" header="Cantidad" />
          <Column field="precio" header="Precio" body={(rowData) => formatoCurrencyCLP(rowData.precio)} />
          <Column body={botonEliminar} />
        </DataTable>
      </div>
    </div>
  );
};
