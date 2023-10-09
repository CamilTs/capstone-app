import React, { useState, useRef } from "react";
import { useProductos } from "../../../context/ProductosContext";
import { useAuth } from "../../../context/AuthContext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import {
  ContenedorAncho,
  ContenedorPrimario,
  ContenedorImg,
  ImagenPreview,
  ImagenImagen,
  SpanImagen,
  LabelImagen,
  ContenedorCampos,
  Campos,
  ContenedorNumber,
  Opciones,
  Titulo,
} from "./components/StyledAgregarProductos";

const categorias = [
  { label: "Alimentos y bebidas", value: "Alimentos y bebidas" },
  { label: "Electrodoméstico", value: "Electrodoméstico" },
  { label: "Electrónica", value: "Electrónica" },
];

export const AgregarProductos = () => {
  const { agregarProducto } = useProductos();
  const { user } = useAuth();
  const [imagen, setimagen] = useState(null);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const toast = useRef(null);

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

  const handleFileChange = (e) => {
    const file = e.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Cuando se completa la lectura del archivo, el resultado estará en reader.result
        const base64String = reader.result;
        setProducto({ ...producto, imagen: base64String });
      };
      // Lee el archivo como una URL de datos (base64)
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleAgregarProducto = () => {
    agregarProducto(producto, user.id);
    toast.current.show({ severity: "success", summary: "Listo", detail: "Producto Agregado", life: 2000 });

    setConfirmDialogVisible(false);
    setProducto(estructuraFormulario);
    console.log(producto);
  };

  const handleLimpiarFormulario = () => {
    setProducto(estructuraFormulario);
    setimagen(null);
  };

  const agregarProductoDialog = (
    <React.Fragment>
      <Button label="Agregar" icon="pi pi-check" severity="success" onClick={handleAgregarProducto} />
      <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={() => setConfirmDialogVisible(false)} />
    </React.Fragment>
  );

  return (
    <ContenedorAncho>
      <Titulo>
        <h2>Agregar Productos</h2>
      </Titulo>
      <form onSubmit={handleSubmit}>
        <Toast ref={toast} />
        <ContenedorPrimario>
          <ContenedorImg>
            <ImagenPreview>{producto.imagen == "" ? <SpanImagen className="pi pi-camera" /> : <ImagenImagen src={producto.imagen} />}</ImagenPreview>
            {imagen && (
              <div style={{ marginTop: "10px" }}>
                <img src={URL.createObjectURL(imagen)} alt="Vista previa de la foto de perfil" style={{ maxWidth: "100px" }} />
              </div>
            )}
            <LabelImagen>
              <label htmlFor="imagen">Imagen</label>
              <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} auto chooseLabel="Subir" onSelect={handleFileChange} />
            </LabelImagen>
          </ContenedorImg>
          <ContenedorCampos>
            <Campos>
              <label htmlFor="producto">Nombre</label>
              <InputText id="producto" value={producto.producto} onChange={(e) => setProducto({ ...producto, producto: e.target.value })} />
              <label htmlFor="codigoBarra">Codigo de barra</label>
              <InputText id="codigoBarra" value={producto.codigoBarra} onChange={(e) => setProducto({ ...producto, codigoBarra: e.target.value })} />
              <label htmlFor="categoria">Categoría</label>
              <Dropdown
                id="categoria"
                options={categorias}
                value={producto.categoria}
                onChange={(e) => setProducto({ ...producto, categoria: e.value })}
                placeholder="Seleccione una categoría"
              />
            </Campos>
            <ContenedorNumber>
              <Campos>
                <label htmlFor="cantidad" className="font-bold block mb-2">
                  Cantidad
                </label>
                <InputNumber
                  inputId="minmax-buttons"
                  value={producto.cantidad}
                  onValueChange={(e) => setProducto({ ...producto, cantidad: e.target.value })}
                  mode="decimal"
                  showButtons
                  min={0}
                  max={100}
                />
              </Campos>
              <Campos>
                <label htmlFor="precio" className="font-bold block mb-2">
                  Precio
                </label>
                <InputNumber id="precio" value={producto.precio} onValueChange={(e) => setProducto({ ...producto, precio: e.target.value })} />
              </Campos>
            </ContenedorNumber>
            <Opciones>
              <Button
                label="Agregar"
                icon="pi pi-plus"
                className="p-button-success"
                rounded
                onClick={() => {
                  setConfirmDialogVisible(true);
                }}
              />
              <Button label="Limpiar" icon="pi pi-trash" className="p-button-danger" rounded onClick={handleLimpiarFormulario} />
            </Opciones>
          </ContenedorCampos>
        </ContenedorPrimario>
        <ConfirmDialog
          visible={confirmDialogVisible}
          onHide={() => setConfirmDialogVisible(false)}
          message="¿Seguro que deseas agregar el producto?"
          header="Confirmar Agregado"
          icon="pi pi-question-circle"
          acceptClassName="p-button-success"
          footer={agregarProductoDialog}
        />
      </form>
    </ContenedorAncho>
  );
};

export default AgregarProductos;
