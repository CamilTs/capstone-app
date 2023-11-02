import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputContainer } from "./InputContainer";
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
import { classNames } from "primereact/utils";
import * as Yup from "yup";

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

  const RegistrarSchema = Yup.object().shape({
    rut: Yup.string()
      .required("Rut requerido")
      .min(9, "Rut invalido")
      .max(9, "Rut invalido")
      .matches(/^[0-9]{7,8}[0-9kK]$/, "Rut invalido"),
    nombre: Yup.string()
      .required("Nombre requerido")
      .min(1, "Nombre invalido")
      .max(40, "Nombre invalido")
      .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Nombre invalido"),
    apellido: Yup.string()
      .required("Apellido requerido")
      .min(1, "Apellido invalido")
      .max(40, "Apellido invalido")
      .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Apellido invalido"),
    correo: Yup.string()
      .required("Correo requerido")
      .email("Correo invalido")
      .min(1, "Correo invalido")
      .max(40, "Correo invalido")
      .matches(/\S+@\S+\.\S+/, "Correo invalido"),
    contrasena: Yup.string()
      .required("Contraseña requerida")
      .min(4, "Contraseña invalida")
      .max(40, "Contraseña invalida")
      .matches(/^[a-zA-Z0-9À-ÿ\s]{4,40}$/, "Contraseña invalida"),
    repetir: Yup.string()
      .required("Debe repetir la contraseña")
      .min(4, "Repetir contraseña invalida")
      .max(40, "Repetir contraseña invalida")
      .oneOf([Yup.ref("contrasena"), null], "Las contraseñas no coinciden"),
    imagen: Yup.string().required("Imagen requerida"),
    rol: Yup.string().required("Rol requerido"),
  });

  const formik = useFormik({
    initialValues: {
      ...formulario,
    },
    validationSchema: RegistrarSchema,

    onSubmit: (data) => {
      console.log(data);
    },
  });

  const isFormFieldInvalid = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  const formatoRut = (value) => {
    const rut = value.replace(/[^\d]/g, "");

    if (rut.length > 1) {
      const verificador = rut.slice(-1);
      const rutPrincipal = rut.slice(0, -1);

      const formattedRUT = rutPrincipal.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + verificador;
      return formattedRUT;
    }
    return rut;
  };

  const confirmarCrear = () => {
    confirmDialog({
      message: "¿Está seguro que desea crear este usuario?",
      header: "Confirmar",
      icon: "pi pi-question-circle",
      acceptClassName: "p-button-success",
      acceptLabel: "Si",
      acceptIcon: "pi pi-check",
      rejectClassName: "p-button-danger",
      rejectLabel: "No",
      rejectIcon: "pi pi-times",
      accept: () => {
        if (
          formik.values.rol != "" &&
          formik.values.imagen != "" &&
          formik.values.rut != "" &&
          formik.values.nombre != "" &&
          formik.values.apellido != "" &&
          formik.values.correo != "" &&
          formik.values.contrasena != "" &&
          formik.values.repetir != ""
        ) {
          toast.current.show({
            severity: "success",
            summary: "Éxito",
            detail: "¡¡Registro exitoso!!",
            life: 3000,
          });
          crearUsuario();
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
          severity: "warn",
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
          severity: "info",
          summary: "Éxito",
          detail: "Formulario Limpiado",
          life: 3000,
        });
        limpiarFormulario();
      },
      reject: () => {
        toast.current.show({
          severity: "warn",
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
      <Formulario onSubmit={formik.handleSubmit}>
        <Inputs>
          <Campos>
            <label htmlFor="rol">Rol</label>
            <Dropdown
              style={{ width: "100%" }}
              id="rol"
              options={rolOptions}
              onChange={(e) => {
                formik.setFieldValue("rol", e.target.value);
              }}
              className={classNames({ "p-invalid": isFormFieldInvalid("rol") })}
              placeholder="Seleccionar Rol"
              name="rol"
              value={formik.values.rol}
            />
          </Campos>
          {getFormErrorMessage("rol")}
        </Inputs>
        <div style={{ display: "flex", gap: "1rem" }}>
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
          <ContenedorCampos>
            <InputRow>
              <Campos>
                <label htmlFor="rut">Rut</label>
                <InputContainer
                  name="rut"
                  placeholder="Ingrese rut sin puntos ni guión.."
                  value={formatoRut(formik.values.rut)}
                  handleChange={(e) => {
                    formik.setFieldValue("rut", e.target.value.replace(/[^\d]/g, ""));
                  }}
                  className={classNames({ "p-invalid": isFormFieldInvalid("rut") })}
                />
                {getFormErrorMessage("rut")}
              </Campos>
              <Campos>
                <label htmlFor="nombre">Nombre</label>
                <InputContainer
                  name="nombre"
                  placeholder="Ingrese su nombre.."
                  value={formik.values.nombre}
                  handleChange={(e) => {
                    formik.setFieldValue("nombre", e.target.value);
                  }}
                  className={classNames({ "p-invalid": isFormFieldInvalid("nombre") })}
                />
                {getFormErrorMessage("nombre")}
              </Campos>
            </InputRow>
            <InputRow>
              <Campos>
                <label htmlFor="apellido">Apellido</label>
                <InputContainer
                  name="apellido"
                  placeholder="Ingrese su apellido.."
                  value={formik.values.apellido}
                  handleChange={(e) => {
                    formik.setFieldValue("apellido", e.target.value);
                  }}
                  className={classNames({ "p-invalid": isFormFieldInvalid("apellido") })}
                />
                {getFormErrorMessage("apellido")}
              </Campos>
              <Campos>
                <label htmlFor="correo">Correo</label>
                <InputContainer
                  name="correo"
                  type={"email"}
                  placeholder="El correo debe llevar @.."
                  value={formik.values.correo}
                  handleChange={(e) => {
                    formik.setFieldValue("correo", e.target.value);
                  }}
                  className={classNames({ "p-invalid": isFormFieldInvalid("correo") })}
                />
                {getFormErrorMessage("correo")}
              </Campos>
            </InputRow>
            <InputRow>
              <Campos>
                <label htmlFor="contrasena">Contraseña</label>
                <InputContainer
                  name="contrasena"
                  placeholder="Ingrese su contraseña.."
                  value={formik.values.contrasena}
                  type={"password"}
                  handleChange={(e) => {
                    formik.setFieldValue("contrasena", e.target.value);
                  }}
                  className={classNames({ "p-invalid": isFormFieldInvalid("contrasena") })}
                />
                {getFormErrorMessage("contrasena")}
              </Campos>
              <Campos>
                <label htmlFor="repetir">Repetir contraseña</label>
                <InputContainer
                  name="repetir"
                  placeholder="Repita su contraseña.."
                  value={formik.values.repetir}
                  type={"password"}
                  handleChange={(e) => {
                    formik.setFieldValue("repetir", e.target.value);
                  }}
                  className={classNames({ "p-invalid": isFormFieldInvalid("repetir") })}
                />
                {getFormErrorMessage("repetir")}
              </Campos>
            </InputRow>
            <ConfirmDialog />
            <Opciones>
              <Button label="Registrar" severity="success" rounded onClick={confirmarCrear} />
              <Button label="Limpiar" severity="danger" rounded onClick={confirmarLimpiar} />
            </Opciones>
          </ContenedorCampos>
        </div>
      </Formulario>
    </Contenedor>
  );
};
