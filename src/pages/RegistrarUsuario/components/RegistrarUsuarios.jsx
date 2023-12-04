import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { InputContainer, InputContainerDropdown } from "../../../components/InputContainer";
import { Toast } from "primereact/toast";
import { useFormik } from "formik";
import {
  Formulario,
  InputRow,
  Inputs,
  Campos,
  ContenedorImg,
  ImagenPreview,
  ImagenImagen,
  SpanImagen,
  ContenedorCampos,
  Opciones,
  Contenedor,
} from "./StyledComponents";
import { api } from "../../../api/api";
import { RegistrarSchema } from "../../../components/Validaciones";
import { CustomConfirmDialog } from "../../../components/CustomConfirmDialog";
import { formatoRut } from "../../../components/Formatos";
import { Message } from "primereact/message";

export const RegistrarUsuarios = ({ estructuraFormulario, formulario, setFormulario, estado, cambiarPestania }) => {
  const [imagen, setImagen] = useState(null);
  const [verConfirmar, setVerConfirmar] = useState(false);
  const [verLimpiar, setVerLimpiar] = useState(false);
  const toast = useRef(null);
  const fileUploadRef = useRef(null);

  const rolOptions = [
    { label: "Administrador", value: "administrador" },
    { label: "Cliente", value: "cliente" },
    { label: "Proveedor", value: "proveedor" },
  ];

  const limpiarFormulario = () => {
    formik.resetForm(setFormulario(estructuraFormulario), setImagen(null));
    toast.current.show({
      severity: "info",
      summary: "Formulario limpiado",
      detail: "Se limpió el formulario",
      life: 2000,
    });
    fileUploadRef.current.clear();
    setVerLimpiar(false);
  };

  const handleFileChange = (e) => {
    const file = e.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        formik.setFieldValue("imagen", base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  const crearUsuario = async () => {
    try {
      // Excluye la propiedad 'contrasena' si estamos en modo 'editar'
      const dataToSend = estado === "crear" ? { ...formik.values } : { ...formik.values, rol: undefined };

      let response;
      if (estado === "crear") {
        response = await api.post("usuario", dataToSend);
      } else {
        response = await api.put("usuario", dataToSend);
      }

      if (response.data.success === false) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: response.data.data,
          life: 2000,
        });
      } else {
        toast.current.show({
          severity: estado === "crear" ? "success" : "info",
          summary: estado === "crear" ? "Creado" : "Editado",
          detail: estado === "crear" ? "Usuario creado" : "Usuario actualizado",
          life: 2000,
        });
        estado === "crear" ? formik.resetForm() : cambiarPestania(2);
        estado === "crear" ? fileUploadRef.current.clear() : cambiarPestania(2);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setVerConfirmar(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      ...formulario,
    },
    validationSchema: RegistrarSchema,

    onSubmit: (data) => {
      console.log(data);
    },
  });

  const validacionValores = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return validacionValores(name) ? (
      <span>
        <Message className="absolute" severity="error" text={`${formik.errors[name]}`}></Message>
      </span>
    ) : null;
  };

  // const cargarImagen = async () => {
  //   if (estado === "crear") return;
  //   try {
  //     const { data } = await api.get(`usuario/img/${formulario.rut}`);
  //     formik.setFieldValue("imagen", data.data.imagen);
  //   } catch (error) {
  //     console.log(error);
  //     console.log("Error al cargar la imagen");
  //   }
  // };

  useEffect(() => {}, []);

  return (
    <Contenedor>
      <Toast ref={toast} />
      <Formulario onSubmit={formik.handleSubmit}>
        <Campos>
          <label htmlFor="rol">Rol</label>
          <InputContainerDropdown
            name="rol"
            id="rol"
            options={rolOptions}
            placeholder="Seleccionar Rol"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rol}
            disabled={estado === "editar"}
          />
          {getFormErrorMessage("rol")}
        </Campos>
        <Inputs>
          <ContenedorImg>
            <ImagenPreview>
              {formik.values.imagen == "" ? <SpanImagen className="pi pi-camera" /> : <ImagenImagen src={formik.values.imagen} />}
            </ImagenPreview>
            {imagen && (
              <div style={{ marginTop: "10px" }}>
                <img src={URL.createObjectURL(imagen)} alt="Vista previa de la foto de perfil" />
              </div>
            )}
            <FileUpload
              ref={fileUploadRef}
              mode="basic"
              accept="image/*"
              maxFileSize={1000000}
              auto={false}
              chooseLabel="Escoger"
              onSelect={handleFileChange}
              chooseOptions={{
                icon: "pi pi-folder-open",
                style: {
                  backgroundColor: "rgb(57 170 205)",
                  color: "white",
                  border: "2px solid rgb(76 147 164)",
                  borderRadius: "2rem",
                },
              }}
              disabled={!formik.values.rol}
            />
            {getFormErrorMessage("imagen")}
          </ContenedorImg>
          <ContenedorCampos>
            <InputRow>
              <Campos>
                <label htmlFor="rut">Rut</label>
                <InputContainer
                  name="rut"
                  id="rut"
                  maxlength="12"
                  placeholder="Ingrese rut sin puntos ni guión.."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formatoRut(formik.values.rut)}
                  disabled={estado === "editar" || !formik.values.rol}
                />
                {getFormErrorMessage("rut")}
              </Campos>
              <Campos>
                <label htmlFor="nombre">Nombre</label>
                <InputContainer
                  name="nombre"
                  placeholder="Ingrese su nombre.."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nombre}
                  disabled={!formik.values.rol}
                />
                {getFormErrorMessage("nombre")}
              </Campos>
            </InputRow>
            <InputRow>
              <Campos>
                <label htmlFor="apellido">Apellido</label>
                <InputContainer
                  name="apellido"
                  id="apellido"
                  placeholder="Ingrese su apellido.."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.apellido}
                  disabled={!formik.values.rol}
                />
                {getFormErrorMessage("apellido")}
              </Campos>
              <Campos>
                <label htmlFor="correo">Correo</label>
                <InputContainer
                  name="correo"
                  id="correo"
                  type={"email"}
                  placeholder="Ingrese su correo.."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.correo}
                  disabled={!formik.values.rol}
                />
                {getFormErrorMessage("correo")}
              </Campos>
            </InputRow>
            <InputRow>
              <Campos>
                <label htmlFor="contrasena">Contraseña</label>
                <InputContainer
                  name="contrasena"
                  id="contrasena"
                  placeholder="Ingrese su contraseña.."
                  type={"password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contrasena}
                  disabled={!formik.values.rol}
                />
                {getFormErrorMessage("contrasena")}
              </Campos>
              <Campos>
                <label htmlFor="repetir">Repetir contraseña</label>
                <InputContainer
                  name="repetir"
                  id="repetir"
                  placeholder="Repita su contraseña.."
                  type={"password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.repetir}
                  disabled={!formik.values.rol}
                />
                {getFormErrorMessage("repetir")}
              </Campos>
            </InputRow>
            <Opciones>
              {estado == "crear" ? (
                <Button
                  icon="pi pi-plus"
                  raised
                  label="Registrar"
                  severity="success"
                  rounded
                  onClick={() => setVerConfirmar(true)}
                  disabled={!formik.isValid || !formik.dirty}
                />
              ) : (
                <Button
                  icon="pi pi-pencil"
                  raised
                  label="Actualizar"
                  severity="warning"
                  rounded
                  onClick={() => setVerConfirmar(true)}
                  disabled={!formik.isValid || !formik.dirty}
                />
              )}
              {estado === "crear" ? (
                <Button
                  icon="pi pi-trash"
                  raised
                  label="Limpiar"
                  severity="danger"
                  rounded
                  onClick={() => setVerLimpiar(true)}
                  disabled={!formik.dirty}
                  type="button"
                />
              ) : (
                <Button icon="pi pi-arrow-right" raised label="Cancelar" severity="danger" rounded onClick={() => cambiarPestania(2)} type="button" />
              )}
            </Opciones>
          </ContenedorCampos>
        </Inputs>
      </Formulario>

      {estado === "crear" ? (
        <CustomConfirmDialog
          visible={verConfirmar}
          onHide={() => setVerConfirmar(false)}
          onConfirm={crearUsuario}
          type="submit"
          message="¿Confirmar creación?"
          header="Confirmar"
        />
      ) : (
        <CustomConfirmDialog
          visible={verConfirmar}
          onHide={() => setVerConfirmar(false)}
          onConfirm={crearUsuario}
          type="submit"
          message={`¿Confirmar modificación del usuario?`}
          header="Actualización"
        />
      )}

      <CustomConfirmDialog
        visible={verLimpiar}
        onHide={() => setVerLimpiar(false)}
        onConfirm={limpiarFormulario}
        message="¿Seguro de limpiar el formulario?"
        header="Limpiar"
      />
    </Contenedor>
  );
};
