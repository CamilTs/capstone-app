import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

import { useProductos } from "../context/ProductosContext";
import { useAuth } from "../context/AuthContext";
import { ConfirmDialog } from "primereact/confirmdialog";

const categorias = [
  { label: "Alimento", value: "Alimento" },
  { label: "Electrodoméstico", value: "Electrodoméstico" },
  { label: "Electrónica", value: "Electrónica" },
];

export const AgregarProductosProveedor = () => {
  const { agregarProducto } = useProductos();
  const { proveedorActual } = useAuth();
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

  const estructuraFormulario = {
    id: Date.now(),
    codigoBarra: "",
    nombre: "",
    imagen: "",
    categoria: null,
    valor: Number(0),
  };
  const [producto, setProducto] = useState(estructuraFormulario);

  const toast = useRef(null);
  const mostrar = () => {
    toast.current.show({ severity: "success", summary: "Listo", detail: "Producto Agregado", life: 2000 });
  };

  const handleAgregarProducto = () => {
    const productoConProveedor = { ...producto, proveedorId: proveedorActual };
    agregarProducto(productoConProveedor, proveedorActual);
    mostrar();
    console.log(producto);
    setConfirmDialogVisible(false);
    setProducto(estructuraFormulario);
  };

  return (
    <div>
      <Toast ref={toast} />
      <h2>Agregar Producto</h2>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="nombre">Nombre</label>
          <InputText id="nombre" value={producto.nombre} onChange={(e) => setProducto({ ...producto, nombre: e.target.value })} />
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
          <label htmlFor="valor">Valor</label>
          <InputText id="valor" value={producto.valor} onChange={(e) => setProducto({ ...producto, valor: parseFloat(e.target.value) })} />
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
  );
};
