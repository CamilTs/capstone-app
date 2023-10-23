import React, { useState, useRef } from "react";
import { useProductos } from "../../../context/ProductosContext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { api } from "../../../api/api";
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
import { useSelector } from "react-redux";

const categorias = [
  { label: "Alimentos y bebidas", value: "Alimentos y bebidas" },
  { label: "Electrodoméstico", value: "Electrodoméstico" },
  { label: "Electrónica", value: "Electrónica" },
];

export const AgregarProductos = () => {
  const { agregarProducto } = useProductos();
  const { id, comercio } = useSelector((state) => state.auth);
  const [imagen, setimagen] = useState(null);
  const [confirmDialogAgregar, setConfirmDialogAgregar] = useState(false);
  const [confirmDialogLimpiar, setConfirmDialogLimpiar] = useState(false);
  const toast = useRef(null);

  const estructuraFormulario = {
    id: Date.now(),
    fecha: new Date(),
    codigo_barra: "",
    nombre: "",
    imagen: "",
    categoria: null,
    cantidad: Number(0),
    clienteId: id,
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
    agregarProducto(producto, id);
    toast.current.show({ severity: "success", summary: "Listo", detail: "Producto Agregado", life: 2000 });

    setConfirmDialogAgregar(false);
    setProducto(estructuraFormulario);
    console.log(producto);
  };

  const agregarProductoDB = async () => {
    try {
      const response = await api.post("producto/agregarProducto", {
        ...producto,
        comercio,
        imagenes: [producto.imagen],
      });
      const { data } = response;
      setConfirmDialogAgregar(false);
      toast.current.show({ severity: "success", summary: "Listo", detail: "Producto Agregado", life: 2000 });
      handleLimpiarFormulario();
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("se intento agregar el producto");
    }
  };

  const handleLimpiarFormulario = () => {
    setProducto(estructuraFormulario);
    setimagen(null);
    setConfirmDialogLimpiar(false);
    toast.current.show({ severity: "info", summary: "Realizado", detail: "Formulario limpiado", life: 2000 });
  };

  const agregarProductoDialog = (
    <React.Fragment>
      <Button label="Agregar" icon="pi pi-check" severity="success" onClick={agregarProductoDB} />
      <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={() => setConfirmDialogAgregar(false)} />
    </React.Fragment>
  );

  const limpiarFormularioDialog = (
    <React.Fragment>
      <Button label="Limpiar" icon="pi pi-trash" severity="danger" onClick={handleLimpiarFormulario} />
      <Button label="Cancelar" icon="pi pi-times" severity="info" onClick={() => setConfirmDialogLimpiar(false)} />
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
              <InputText id="producto" value={producto.nombre} onChange={(e) => setProducto({ ...producto, nombre: e.target.value })} />
              <label htmlFor="codigo_barra">Codigo de barra</label>
              <InputText
                id="codigo_barra"
                value={producto.codigo_barra}
                onChange={(e) => setProducto({ ...producto, codigo_barra: e.target.value })}
              />
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
                  setConfirmDialogAgregar(true);
                }}
              />
              <Button label="Limpiar" icon="pi pi-trash" className="p-button-danger" rounded onClick={() => setConfirmDialogLimpiar(true)} />
            </Opciones>
          </ContenedorCampos>
        </ContenedorPrimario>
        <ConfirmDialog
          visible={confirmDialogAgregar}
          onHide={() => setConfirmDialogAgregar(false)}
          message="¿Seguro que deseas agregar el producto?"
          header="Confirmar Agregado"
          icon="pi pi-question-circle"
          acceptClassName="p-button-success"
          footer={agregarProductoDialog}
        />
        <ConfirmDialog
          visible={confirmDialogLimpiar}
          onHide={() => setConfirmDialogLimpiar(false)}
          message="¿Seguro de limpiar el formulario?"
          header="Formulario limpiado"
          icon="pi pi-question-circle"
          acceptClassName="p-button-success"
          footer={limpiarFormularioDialog}
        />
      </form>
    </ContenedorAncho>
  );
};

export default AgregarProductos;
