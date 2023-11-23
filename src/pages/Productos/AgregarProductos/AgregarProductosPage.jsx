import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { api } from "../../../api/api";
import { InputContainer } from "../../../components/InputContainer";
import {
  ContenedorAncho,
  ContenedorPrimario,
  ContenedorImg,
  ImagenPreview,
  ImagenImagen,
  SpanImagen,
  ContenedorCampos,
  Campos,
  ContenedorNumber,
  Opciones,
  Titulo,
  Formulario,
} from "./components/StyledAgregarProductos";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { ProductoSchema } from "../../../components/Validaciones";
import { Message } from "primereact/message";
import { CustomConfirmDialog } from "../../../components/CustomConfirmDialog";
import { Toast } from "primereact/toast";

const categorias = [
  { label: "Alimentos y bebidas", value: "Alimentos y bebidas" },
  { label: "Electrodoméstico", value: "Electrodoméstico" },
  { label: "Electrónica", value: "Electrónica" },
];

export const AgregarProductos = () => {
  const { id, comercio } = useSelector((state) => state.auth);
  const [imagen, setImagen] = useState(null);
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
  const [formulario, setFormulario] = useState(estructuraFormulario);
  const [verConfirmar, setVerConfirmar] = useState(false);
  const [verLimpiar, setVerLimpiar] = useState(false);

  const handleFileChange = (e) => {
    const file = e.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Cuando se completa la lectura del archivo, el resultado estará en reader.result
        const base64String = reader.result;
        formik.setFieldValue("imagen", base64String);
      };
      // Lee el archivo como una URL de datos (base64)
      reader.readAsDataURL(file);
    }
  };

  const agregarProductoDB = async () => {
    try {
      const response = await api.post("producto/agregarProducto", {
        ...formik.values,
        comercio,
        imagenes: [formik.values.imagen],
      });
      const { data } = response;
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Producto agregado",
        life: 2000,
      });
      formik.resetForm();
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("se intento agregar el producto");
    } finally {
      setVerConfirmar(false);
    }
  };

  const limpiarFormulario = () => {
    formik.resetForm();
    setFormulario({
      ...formulario,
    }),
      setImagen(null);
    toast.current.show({
      severity: "info",
      summary: "Éxito",
      detail: "Formulario Limpiado",
      life: 2000,
    });
    setVerLimpiar(false);
  };

  const formik = useFormik({
    initialValues: {
      ...formulario,
    },
    validationSchema: ProductoSchema,

    onSubmit: (data) => {
      console.log(data);
    },
  });

  const validacionValores = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return validacionValores(name) ? (
      <span>
        <Message className="sticky" severity="error" text={`${formik.errors[name]}`}></Message>
      </span>
    ) : null;
  };

  return (
    <ContenedorAncho>
      <Toast ref={toast} />
      <Titulo>Agregar Productos</Titulo>
      <div className="flex flex-column md:gap-1">
        <Formulario onSubmit={formik.handleSubmit}>
          <ContenedorPrimario>
            <ContenedorImg>
              <ImagenPreview>
                {formik.values.imagen == "" ? <SpanImagen className="pi pi-camera" /> : <ImagenImagen src={formik.values.imagen} />}
              </ImagenPreview>
              {imagen && (
                <div style={{ marginTop: "10px" }}>
                  <img src={URL.createObjectURL(imagen)} alt="Vista previa de la foto de perfil" style={{ maxWidth: "100px" }} />
                </div>
              )}
              <label htmlFor="imagen"></label>
              <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} auto chooseLabel="Subir" onSelect={handleFileChange} />
              {getFormErrorMessage("imagen")}
            </ContenedorImg>
            <ContenedorCampos>
              <Campos>
                <label htmlFor="nombre">Nombre</label>
                <InputText
                  id="nombre"
                  name="nombre"
                  placeholder="Ingrese nombre del producto.."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nombre}
                />
                {getFormErrorMessage("nombre")}
                <label htmlFor="codigo_barra">Código de barra</label>
                <InputText
                  id="codigo_barra"
                  name="codigo_barra"
                  placeholder="Ingrese código de barra.."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.codigo_barra}
                />
                {getFormErrorMessage("codigo_barra")}
                <label htmlFor="categoria">Categoría</label>
                <Dropdown
                  id="categoria"
                  name="categoria"
                  options={categorias}
                  placeholder="Seleccione una categoría"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.categoria}
                />
                {getFormErrorMessage("categoria")}
              </Campos>
              <ContenedorNumber>
                <Campos>
                  <label htmlFor="cantidad">Cantidad</label>
                  <InputContainer
                    inputId="minmax-buttons"
                    name="cantidad"
                    type="number"
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cantidad}
                  />
                  {getFormErrorMessage("cantidad")}
                </Campos>
                <Campos>
                  <label htmlFor="precio">Precio</label>
                  <InputContainer
                    id="precio"
                    name="precio"
                    type="number"
                    mode="decimal"
                    showButtons
                    min={0}
                    max={1000000}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.precio}
                  />
                  {getFormErrorMessage("precio")}
                </Campos>
              </ContenedorNumber>
              <Opciones>
                <Button
                  label="Agregar"
                  icon="pi pi-plus"
                  className="p-button-success"
                  disabled={!formik.dirty || !formik.isValid}
                  onClick={() => setVerConfirmar(true)}
                />
                <Button label="Limpiar" icon="pi pi-trash" className="p-button-danger" onClick={() => setVerLimpiar(true)} type="button" />
              </Opciones>
            </ContenedorCampos>
          </ContenedorPrimario>
        </Formulario>
      </div>

      <CustomConfirmDialog
        visible={verConfirmar}
        onHide={() => setVerConfirmar(false)}
        onConfirm={agregarProductoDB}
        type="submit"
        message="¿Confirmar creación?"
        header="Confirmar"
      />

      <CustomConfirmDialog
        visible={verLimpiar}
        onHide={() => setVerLimpiar(false)}
        onConfirm={limpiarFormulario}
        message="¿Seguro de limpiar el formulario?"
        header="Limpiar"
      />
    </ContenedorAncho>
  );
};
