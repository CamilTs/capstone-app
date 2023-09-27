import { useState, useRef } from "react";
import { useProductos } from "../../../context/ProductosContext";
import { useAuth } from "../../../context/AuthContext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import styled from "styled-components";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const ContenedorAncho = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  @media screen and (min-width: 300px) {
    padding: 10px;
    min-width: 240px;
  }
`;

const categorias = [
  { label: "Alimentos y bebidas", value: "Alimentos y bebidas" },
  { label: "Electrodoméstico", value: "Electrodoméstico" },
  { label: "Electrónica", value: "Electrónica" },
];

export const AgregarProductos = () => {
  const { agregarProducto } = useProductos();
  const { user } = useAuth();
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

  const estructuraFormulario = {
    id: Date.now(),
    fecha: new Date(),
    codigoBarra: "",
    producto: "",
    imagen: "",
    categoria: null,
    cantidad: Number(0),
    clienteId: user.id,
    precio: Number(0),
  };
  const [producto, setProducto] = useState(estructuraFormulario);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toast = useRef(null);
  const mostrar = () => {
    toast.current.show({ severity: "success", summary: "Listo", detail: "Producto Agregado", life: 2000 });
  };

  const handleAgregarProducto = () => {
    if (user && user.rol === "cliente") {
      agregarProducto(producto, user.id);
      mostrar();
      setConfirmDialogVisible(false);
      setProducto(estructuraFormulario);
      console.log(producto);
    } else {
      alert("No tienes permiso para agregar productos");
    }
  };

  return (
    <ContenedorAncho>
      <Toast ref={toast} />
      <h2>Agregar Productos</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <div className="p-field">
              <label htmlFor="producto">Nombre</label>
              <InputText id="producto" value={producto.producto} onChange={(e) => setProducto({ ...producto, producto: e.target.value })} />
            </div>
            <div className="p-field">
              <label htmlFor="codigoBarra">Codigo de barra</label>
              <InputText id="codigoBarra" value={producto.codigoBarra} onChange={(e) => setProducto({ ...producto, codigoBarra: e.target.value })} />
            </div>
            <div className="p-field">
              <label htmlFor="imagen">Imagen</label>
              <InputText id="imagen" value={producto.imagen} onChange={(e) => setProducto({ ...producto, imagen: e.target.value })} />
            </div>
            <div className="p-field">
              <label htmlFor="categoria">Categoría</label>
              <Dropdown
                id="categoria"
                options={categorias}
                value={producto.categoria}
                onChange={(e) => setProducto({ ...producto, categoria: e.value })}
                placeholder="Seleccione una categoría"
              />
            </div>
            <div className="p-field">
              <label htmlFor="cantidad">Cantidad</label>
              <InputText
                id="cantidad"
                value={producto.cantidad}
                onChange={(e) => setProducto({ ...producto, cantidad: parseFloat(e.target.value) })}
              />
            </div>
            <div className="p-field">
              <label htmlFor="precio">Precio</label>
              <InputText id="precio" value={producto.precio} onChange={(e) => setProducto({ ...producto, precio: parseFloat(e.target.value) })} />
            </div>
            <div className="p-field">
              <Button
                label="Agregar"
                className="p-button-success"
                onClick={() => {
                  handleAgregarProducto, setConfirmDialogVisible(true);
                }}
              />
            </div>
          </div>
          <ConfirmDialog
            visible={confirmDialogVisible}
            onHide={() => setConfirmDialogVisible(false)}
            message="¿Seguro que deseas agregar el producto?"
            header="Confirmar Agregado"
            icon="pi pi-question-circle"
            acceptClassName="p-button-success"
            acceptLabel="Sí"
            rejectLabel="No"
            footer={
              <div>
                <Button label="Agregar" icon="pi pi-plus" className="p-button-success" onClick={handleAgregarProducto} />
                <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => setConfirmDialogVisible(false)} />
              </div>
            }
          />
        </div>
      </form>
    </ContenedorAncho>
  );
};

export default AgregarProductos;
