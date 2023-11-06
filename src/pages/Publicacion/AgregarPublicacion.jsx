import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { useSelector } from "react-redux";
import { api } from "../../api/api";
import { useFormik } from "formik";
import {
  Campos,
  Contenedor,
  ContenedorBotones,
  ContenedorCampos,
  ContenedorImg,
  Formulario,
  ImagenImagen,
  ImagenPreview,
  SpanImagen,
  Titulo,
} from "./components/StyledComponents";
import { InputContainer } from "../../components/InputContainer";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { publicacionSchema } from "../../components/Validaciones";

const categorias = [
  { label: "Alimento", value: "Alimento" },
  { label: "Electrodoméstico", value: "Electrodoméstico" },
  { label: "Electrónica", value: "Electrónica" },
];

export const AgregarPublicacion = () => {
  const { id } = useSelector((state) => state.auth);

  const estructuraFormulario = {
    id: Date.now(),
    nombre: "",
    precio: Number(""),
    codigo_barra: "",
    categoria: null,
    imagen: "",
    proveedorId: id,
  };
  const [formulario, setFormulario] = useState(estructuraFormulario);
  const [imagen, setImagen] = useState(null);

  const toast = useRef(null);

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

  const agregarPublicacion = async () => {
    try {
      const response = await api.post("publicacion", {
        ...formik.values,
      });
      const { data } = response;
      limpiarFormulario();
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("Se intento agregar publicación");
    }
  };

  const limpiarFormulario = () => {
    formik.resetForm(setFormulario(estructuraFormulario), setImagen(null));
  };

  const formik = useFormik({
    initialValues: {
      ...formulario,
    },
    validationSchema: publicacionSchema,

    onSubmit: (data) => {
      console.log(data);
      limpiarFormulario();
    },
  });

  const validacionValores = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return validacionValores(name) ? <div className="p-error">{formik.errors[name]}</div> : null;
  };

  const confirmarAgregarPublicacion = () => {
    confirmDialog({
      message: "¿Está seguro que desea agregar esta publicación?",
      header: "Confirmación",
      icon: "pi pi-question-circle",
      acceptClassName: "p-button-success",
      acceptLabel: "Si",
      acceptIcon: "pi pi-check",
      rejectClassName: "p-button-danger",
      rejectLabel: "No",
      rejectIcon: "pi pi-times",
      accept: () => {
        if (
          formik.values.categoria != "" &&
          formik.values.imagen != "" &&
          formik.values.nombre != "" &&
          formik.values.precio != "" &&
          formik.values.codigo_barra != "0"
        ) {
          toast.current.show({ severity: "success", summary: "Éxito", detail: "¡¡Publicación agregada!!", life: 3000 });
          agregarPublicacion();
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Ops! Algo ha salido mal, revisa los campos",
            life: 3000,
          });
        }
      },
      reject: () => toast.current.show({ severity: "info", summary: "Cancelado", detail: "Se cancelo el agregar", life: 3000 }),
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

  return (
    <Contenedor>
      <Toast ref={toast} />
      <Titulo>Agregar Publicación</Titulo>
      <Formulario onSubmit={formik.handleSubmit}>
        <Campos>
          <ContenedorImg>
            <ImagenPreview>
              {formik.values.imagen == "" ? <SpanImagen className="pi pi-camera" /> : <ImagenImagen src={formik.values.imagen} />}
            </ImagenPreview>
            {imagen && (
              <div style={{ marginTop: "10px" }}>
                <img src={URL.createObjectURL(imagen)} alt="Vista previa de la foto de perfil" />
              </div>
            )}
            <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} auto chooseLabel="Seleccionar" onSelect={handleFileChange} />
            {getFormErrorMessage("imagen")}
          </ContenedorImg>
        </Campos>
        <ContenedorCampos>
          <Campos>
            <label htmlFor="nombre">Nombre</label>
            <InputContainer
              id="nombre"
              name="nombre"
              placeholder="Ingrese su nombre de la publicación..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
            />
            {getFormErrorMessage("nombre")}
          </Campos>
          <Campos>
            <label htmlFor="codigo_barra">Código de barra</label>
            <InputContainer
              id="codigo_barra"
              name="codigo_barra"
              placeholder="Ingrese el código de barra..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.codigo_barra}
            />
            {getFormErrorMessage("codigo_barra")}
          </Campos>
          <Campos>
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
          <Campos>
            <label htmlFor="precio">Precio</label>
            <InputContainer
              id="precio"
              name="precio"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.precio}
            />
            {getFormErrorMessage("precio")}
          </Campos>
        </ContenedorCampos>
      </Formulario>
      <ContenedorBotones>
        <Button label="Agregar" className="p-button-success" onClick={confirmarAgregarPublicacion} />
        <Button label="Limpiar" className="p-button-danger" onClick={confirmarLimpiar} />
      </ContenedorBotones>
    </Contenedor>
  );
};
