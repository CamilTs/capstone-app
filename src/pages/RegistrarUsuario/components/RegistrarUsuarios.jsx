import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
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

  const rolOptions = [
    { label: "Administrador", value: "administrador" },
    { label: "Cliente", value: "cliente" },
    { label: "Proveedor", value: "proveedor" },
  ];

  const toast = useRef(null);

  const limpiarFormulario = () => {
    formik.resetForm(setFormulario(estructuraFormulario), setImagen(null));
    toast.current.show({
      severity: "info",
      summary: "Formulario limpiado",
      detail: "Se limpió el formulario",
      life: 2000,
    });
    setVerLimpiar(false);
  };

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

  const crearUsuario = async () => {
    try {
      // Excluye la propiedad 'contrasena' si estamos en modo 'editar'
      const dataToSend = estado === "crear" ? { ...formik.values } : { ...formik.values, contrasena: undefined, rol: undefined };

      if (estado === "crear") {
        const response = await api.post("usuario", dataToSend);
        const { data } = response;
      } else {
        const response = await api.put("usuario", dataToSend);
        const { data } = response;
        console.log(data);
      }
      toast.current.show({
        severity: estado === "crear" ? "success" : "info",
        summary: estado === "crear" ? "Creado" : "Editado",
        detail: estado === "crear" ? "Usuario creado" : "Usuario actualizado",
        life: 2000,
      });
      estado === "crear" ? formik.resetForm() : cambiarPestania(2);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `Error al ${estado === "crear" ? "crear" : "editar"} el usuario`,
        life: 2000,
      });
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

  const camposVacios = () => {
    console.log(formik.values);
    if (estado === "crear") {
      return (
        !formik.values.rol ||
        !formik.values.imagen ||
        (formik.values.rut.length < 9 && 12) ||
        !formik.values.nombre ||
        !formik.values.apellido ||
        !formik.values.correo ||
        !formik.values.contrasena ||
        formik.values.contrasena !== formik.values.repetir
      );
    }
    // Si estás en modo "editar", verifica solo las condiciones relevantes
    return (
      !formik.values.rol ||
      !formik.values.imagen ||
      formik.values.rut.length < 7 ||
      !formik.values.nombre ||
      !formik.values.apellido ||
      !formik.values.correo
    );
  };

  const validacionValores = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return validacionValores(name) ? (
      <span>
        <Message className="absolute" severity="error" text={`${formik.errors[name]}`}></Message>
      </span>
    ) : null;
  };

  const cargarImagen = async () => {
    if (estado === "crear") return;
    try {
      const { data } = await api.get(`usuario/img/${formulario.rut}`);
      formik.setFieldValue("imagen", data.data.imagen);
    } catch (error) {
      console.log(error);
      console.log("Error al cargar la imagen");
    }
  };

  useEffect(() => {
    cargarImagen();
  }, [estado]);

  return (
    <Contenedor>
      <Toast ref={toast} />
      <Formulario onSubmit={formik.handleSubmit}>
        <Campos>
          <label htmlFor="rol">Rol</label>
          <InputContainerDropdown
            style={{ width: "100%" }}
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
              mode="basic"
              accept="image/*"
              maxFileSize={1000000}
              auto
              chooseLabel="Seleccionar"
              onSelect={handleFileChange}
              onBlur={formik.handleBlur}
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
                  disabled={estado === "editar"}
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
                  icon="pi pi-eye"
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
                />
                {getFormErrorMessage("repetir")}
              </Campos>
            </InputRow>
            <Opciones>
              {estado == "crear" ? (
                <Button raised label="Registrar" severity="success" rounded onClick={() => setVerConfirmar(true)} disabled={camposVacios()} />
              ) : (
                <Button raised label="Actualizar" severity="warning" rounded onClick={() => setVerConfirmar(true)} disabled={camposVacios()} />
              )}
              <Button raised label="Limpiar" severity="danger" rounded onClick={() => setVerLimpiar(true)} disabled={!formik.dirty} type="button" />
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
