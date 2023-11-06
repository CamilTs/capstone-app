import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputContainer } from "../../../components/InputContainer";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
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

export const RegistrarUsuarios = () => {
  const [imagen, setImagen] = useState(null);
  const estructuraFormulario = {
    rut: "",
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    repetir: "",
    imagen: "",
    rol: "",
  };
  const [formulario, setFormulario] = useState(estructuraFormulario);

  const rolOptions = [
    { label: "Administrador", value: "administrador" },
    { label: "Cliente", value: "cliente" },
    { label: "Proveedor", value: "proveedor" },
  ];

  const toast = useRef(null);

  const limpiarFormulario = () => {
    formik.resetForm(setFormulario(estructuraFormulario), setImagen(null));
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
      const response = await api.post("usuario", {
        ...formik.values,
      });
      const { data } = response;
      limpiarFormulario();
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("se intento crear el usuario");
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

  const formatoRut = (value) => {
    const rut = value.replace(/[^0-9kK]/g, "");

    if (rut.length > 1) {
      const verificador = rut.slice(-1);
      const rutPrincipal = rut.slice(0, -1);

      const formattedRUT = rutPrincipal.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + verificador;
      return formattedRUT;
    }
    return rut;
  };

  const camposVacios = () => {
    return (
      !formik.values.rol ||
      !formik.values.imagen ||
      formik.values.rut.length < 12 ||
      formik.values.nombre < 1 ||
      formik.values.apellido < 1 ||
      !formik.values.correo ||
      !formik.values.contrasena ||
      !formik.values.repetir ||
      formik.values.contrasena !== formik.values.repetir
    );
  };

  const camposLimpiar = () => {
    return formik.isValid != "";
  };

  const confirmarCrear = () => {
    confirmDialog({
      message: "¿Está seguro que desea crear este usuario?",
      header: "Confirmar",
      icon: "pi pi-question-circle",
      acceptClassName: "p-button-success ",
      acceptLabel: "Si",
      acceptIcon: "pi pi-check",
      rejectClassName: "p-button-danger ",
      rejectLabel: "No",
      rejectIcon: "pi pi-times",
      accept: () => {
        if (camposVacios()) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Ops! Algo salió mal, revise los campos",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Éxito",
            detail: "Usuario creado",
            life: 3000,
          });
          crearUsuario();
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
      icon: "pi pi-exclamation-triangle",
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
    <Contenedor>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Formulario onSubmit={formik.handleSubmit}>
        <Campos>
          <label htmlFor="rol">Rol</label>
          <Dropdown
            style={{ width: "100%" }}
            name="rol"
            id="rol"
            options={rolOptions}
            placeholder="Seleccionar Rol"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rol}
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
          </ContenedorCampos>
        </Inputs>
      </Formulario>
      <Opciones>
        <Button raised label="Registrar" severity="success" rounded onClick={confirmarCrear} disabled={camposVacios()} />
        <Button raised label="Limpiar" severity="danger" rounded onClick={confirmarLimpiar} disabled={camposLimpiar()} />
      </Opciones>
    </Contenedor>
  );
};
