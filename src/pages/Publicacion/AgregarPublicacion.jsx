import { InputText } from "primereact/inputtext";
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
  Contenedor2,
  ContenedorBotones,
  ContenedorCampos,
  ContenedorImg,
  Formulario,
  ImagenImagen,
  ImagenPreview,
  SpanImagen,
  Titulo,
} from "./components/StyledComponents";
import { classNames } from "primereact/utils";

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
    precio: Number(0),
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
      toast.current.show({ severity: "success", summary: "Listo", detail: "Publicación Agregada", life: 2000 });
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

    validate: (data) => {
      let errors = {};
      if (!data.nombre) {
        errors.nombre = "El nombre es requerido";
      } else if (data.nombre.length < 3) {
        errors.nombre = "El nombre debe tener al menos 3 caracteres";
      }
      if (!data.precio) {
        errors.precio = "El precio es requerido";
      } else if (data.precio < 0) {
        errors.precio = "El precio debe ser mayor a 0";
      }
      if (!data.codigo_barra) {
        errors.codigo_barra = "El código de barra es requerido";
      } else if (data.codigo_barra.length < 3) {
        errors.codigo_barra = "El código de barra debe tener al menos 3 caracteres";
      }
      if (!data.categoria) {
        errors.categoria = "La categoría es requerida";
      }
      if (!data.imagen) {
        errors.imagen = "La imagen es requerida";
      }
      return errors;
    },
    onSubmit: (data) => {
      console.log(data);
      agregarPublicacion();
    },
  });

  const isFormFieldInvalid = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) && <small className="p-error">{formik.errors[name]}</small>;
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
        <Contenedor2>
          <ContenedorCampos>
            <Campos>
              <label htmlFor="nombre">Nombre</label>
              <InputText
                id="nombre"
                placeholder="Ingrese su nombre de la publicación..."
                value={formik.values.nombre}
                onChange={(e) => {
                  formik.setFieldValue("nombre", e.target.value);
                }}
              />
              {getFormErrorMessage("nombre")}
            </Campos>
            <Campos>
              <label htmlFor="codigo_barra">Codigo de barra</label>
              <InputText
                id="codigo_barra"
                placeholder="Ingrese el código de barra..."
                value={formik.values.codigo_barra}
                onChange={(e) => {
                  formik.setFieldValue("codigo_barra", e.target.value);
                }}
              />
              {getFormErrorMessage("codigo_barra")}
            </Campos>
            <Campos>
              <label htmlFor="categoria">Categoría</label>
              <Dropdown
                id="categoria"
                options={categorias}
                value={formik.values.categoria}
                onChange={(e) => {
                  formik.setFieldValue("categoria", e.target.value);
                }}
                className={classNames({ "p-invalid": isFormFieldInvalid("categoria") })}
                placeholder="Seleccione una categoría"
              />
              {getFormErrorMessage("categoria")}
            </Campos>
            <Campos>
              <label htmlFor="precio">Precio</label>
              <InputText
                id="precio"
                value={formik.values.precio}
                onChange={(e) => {
                  formik.setFieldValue("precio", e.target.value);
                }}
              />
              {getFormErrorMessage("precio")}
            </Campos>
            <ContenedorBotones>
              <Button label="Agregar" className="p-button-success" type="submit" />
              <Button label="Limpiar" className="p-button-danger" onClick={() => limpiarFormulario()} />
            </ContenedorBotones>
          </ContenedorCampos>
        </Contenedor2>
      </Formulario>
      {/* <div className="p-field">
        <Button
          label="Agregar"
          className="p-button-success"
          onClick={() => {
            setConfirmDialogVisible(true);
          }}
        />
      </div>
      <ConfirmDialog
        visible={confirmDialogVisible}
        onHide={() => setConfirmDialogVisible(false)}
        message="¿Listo para agregar la publicación?"
        header="Confirmar Publicación"
        icon="pi pi-question-circle"
        acceptClassName="p-button-success"
        acceptLabel="Sí"
        rejectLabel="No"
        footer={
          <div>
            <Button label="Añadir" icon="pi pi-plus" className="p-button-success" type="submit" />
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => setConfirmDialogVisible(false)} />
          </div>
        }
      /> */}
    </Contenedor>
  );
};
