import { Card } from "primereact/card";
import { useProductos } from "../context/ProductosContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useState } from "react";

export const MisProductos = () => {
  const { productosData, eliminarProducto } = useProductos();
  const { proveedorActual } = useAuth();
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [productoAEliminarId, setProductoAEliminarId] = useState(null);

  const productoDelProveedor = productosData[proveedorActual] || [];

  const handleEliminarProductoClick = () => {
    if (productoAEliminarId) {
      console.log("ID del producto a eliminar:", productoAEliminarId);
      const proveedorId = proveedorActual;
      eliminarProducto(productoAEliminarId, proveedorId);
      setConfirmDialogVisible(false);
      setProductoAEliminarId(null);
    }
  };
  return (
    <div>
      <h2>Lista de Productos</h2>
      <div className="p-grid">
        {productoDelProveedor.map((producto) => (
          <div key={producto.id} className="p-col-12 p-md-4">
            <Card title={producto.nombre} style={{ marginBottom: "1rem" }}>
              <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: "100%" }} />
              <p>Categoría: {producto.categoria}</p>
              <p>Valor: ${producto.valor.toFixed(2)}</p>
              <Button
                label="Eliminar"
                icon="pi pi-trash"
                onClick={() => {
                  setProductoAEliminarId(producto.id);
                  setConfirmDialogVisible(true);
                }}
              />
            </Card>
          </div>
        ))}
      </div>
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
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => setConfirmDialogVisible(false)} />
            <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={handleEliminarProductoClick} />
          </div>
        }
      />
    </div>
  );
};
