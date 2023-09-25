import { useState, useRef } from "react";
import { useProductos } from "../../../context/ProductosContext";
import { useAuth } from "../../../context/AuthContext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { CategoriasProductos } from "./components/CategoriasProductos";
import { CamposProductos } from "./components/CamposProductos";

export const AgregarProductos = () => {
  const estructuraFormulario = {
    id: Date.now(),
    fecha: new Date(),
    codigoBarra: "",
    producto: "",
    categoria: [],
    cantidad: Number(0),
    precio: Number(0),
  };
  const [producto, setProducto] = useState(estructuraFormulario);

  const { agregarProducto } = useProductos();
  const { user } = useAuth();
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCategoriasChange = (categoriasSeleccionadas) => {
    setProducto({ ...producto, categoria: categoriasSeleccionadas });
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
      console.log(producto);
    } else {
      alert("No tienes permiso para agregar productos");
    }
  };

  return (
    <>
      <h2>Agregar Productos</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-fluid p-formgrid p-grid">
          <Toast ref={toast} />
          <div className="p-field p-col">
            <CamposProductos producto={producto} handleChange={handleChange} />
            <CategoriasProductos onCategoriasChange={handleCategoriasChange} />
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
    </>
  );
};

export default AgregarProductos;
