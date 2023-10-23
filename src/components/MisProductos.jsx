import { Card } from "primereact/card";
import { useProductos } from "../context/ProductosContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import styled from "styled-components";
import { formatoCurrencyCLP } from "./FormatoDinero";
import { useSelector } from "react-redux";

const ProductosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 100%;
  padding: 16px;
  overflow: auto;
  max-height: 720px;
`;

const CardProductos = styled(Card)`
  width: 300px;
  height: auto;
  flex-grow: 1;
  border: 1px solid black;
  background-color: #64a0ab;
  color: black;
`;

const ImgContainer = styled.img`
  min-width: 250px;
  max-width: 250px;
  min-height: 200px;
  max-height: 200px;
  object-fit: contain;
  border-radius: 10px;
  background-color: white;
`;

export const MisProductos = () => {
  // const { user } = useAuth();
  const { id } = useSelector((state) => state.auth);
  const [productos, setProductos] = useState(initialState);
  // const { eliminarProducto, productos } = useProductos();
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [productoAEliminarId, setProductoAEliminarId] = useState(null);
  // const productosProveedor = user ? productos.filter((el) => el.proveedorId == id) : [];

  const toast = useRef(null);
  const mostrar = () => {
    toast.current.show({ severity: "info", summary: "Eliminado", detail: "Producto Eliminado", life: 2000 });
  };

  const handleEliminarProductoClick = () => {
    // if (productoAEliminarId) {
    //   console.log("ID del producto a eliminar:", productoAEliminarId);
    //   const proveedorId = user;
    //   eliminarProducto(productoAEliminarId, proveedorId);
    //   mostrar();
    //   setConfirmDialogVisible(false);
    //   setProductoAEliminarId(null);
    // }
  };

  return (
    <div>
      <Toast ref={toast} />
      <h2>Lista de Productos</h2>
      <ProductosContainer>
        {productos.map((producto) => (
          <div key={producto.id} className="p-col-12 p-md-4">
            <CardProductos title={producto.producto} style={{ marginBottom: "1rem" }}>
              <ImgContainer src={producto.imagen} alt={producto.producto} style={{ maxWidth: "100%" }} />
              <div>
                <p>Categoría: {producto.categoria}</p>
                <p>Valor: {formatoCurrencyCLP(producto.precio)}</p>
              </div>
              <Button
                label="Eliminar"
                icon="pi pi-trash"
                className="p-button-danger"
                onClick={() => {
                  setProductoAEliminarId(producto.id);
                  setConfirmDialogVisible(true);
                }}
              />
            </CardProductos>
          </div>
        ))}
      </ProductosContainer>
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
