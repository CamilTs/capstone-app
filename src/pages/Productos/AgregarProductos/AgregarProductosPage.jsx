import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
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
  LabelImagen,
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
      limpiarFormulario();
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("se intento agregar el producto");
    }
  };

  const limpiarFormulario = () => {
    formik.resetForm(setFormulario(estructuraFormulario), setImagen(null));
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

  const confirmarAgregar = () => {
    confirmDialog({
      message: "¿Estás seguro de agregar este producto?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-success",
      acceptLabel: "Si",
      acceptIcon: "pi pi-check",
      rejectClassName: "p-button-danger",
      rejectLabel: "No",
      rejectIcon: "pi pi-times",
      accept: () => {
        if (
          formik.values.nombre != "" &&
          formik.values.codigo_barra != "" &&
          formik.values.categoria != null &&
          formik.values.cantidad != 0 &&
          formik.values.precio != 0 &&
          formik.values.imagen != ""
        ) {
          toast.current.show({
            severity: "success",
            summary: "Listo",
            detail: "Producto Agregado",
            life: 2000,
          });
          agregarProductoDB();
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Ops! Algo salió mal, revise los campos",
            life: 3000,
          });
        }
      },
      reject: () => {
        toast.current.show({
          severity: "info",
          summary: "Cancelado",
          detail: "Registro cancelado",
          life: 3000,
        });
      },
    });
  };

  const confirmarLimpiar = () => {
    confirmDialog({
      message: "¿Está seguro que desea limpiar el formulario?",
      header: "Confirmar",
      icon: "pi pi-question-circle",
      acceptClassName: "p-button-success",
      acceptLabel: "Si",
      acceptIcon: "pi pi-check",
      rejectClassName: "p-button-danger",
      rejectLabel: "No",
      rejectIcon: "pi pi-times",
      accept: () => {
        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: "Formulario Limpiado",
          life: 3000,
        });
        limpiarFormulario();
      },
      reject: () => {
        toast.current.show({
          severity: "info",
          summary: "Cancelado",
          detail: "Limpieza cancelada",
          life: 3000,
        });
      },
    });
  };

  const validacionValores = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return validacionValores(name) ? <div className="p-error">{formik.errors[name]}</div> : null;
  };

  return (
    <ContenedorAncho>
      <Titulo>Agregar Productos</Titulo>
      <Toast ref={toast} />
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
            <LabelImagen>
              <label htmlFor="imagen">Imagen</label>
              <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} auto chooseLabel="Subir" onSelect={handleFileChange} />
            </LabelImagen>
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
          </ContenedorCampos>
        </ContenedorPrimario>
      </Formulario>
      <Opciones>
        <Button label="Agregar" icon="pi pi-plus" className="p-button-success" rounded onClick={confirmarAgregar} />
        <Button label="Limpiar" icon="pi pi-trash" className="p-button-danger" rounded onClick={confirmarLimpiar} />
      </Opciones>
    </ContenedorAncho>
  );
};

export default AgregarProductos;
