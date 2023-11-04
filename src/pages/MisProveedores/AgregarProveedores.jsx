import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import {
  ContenedorProveedores,
  ContenedorHeader,
  MiniPerfil,
  DatosMiniPerfil,
  NombreProveedor,
  DescripcionProveedor,
  TelefonoProveedor,
  CorreoProveedor,
  ContenedorBoton,
  Formulario,
  ContenedorInput,
  Campos,
} from "./components/StyledAgregarProveedor";
import { api } from "../../api/api";
import * as Yup from "yup";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";

const AgregarProveedores = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    telefono: "",
    correo: "",
  });
  // const [proveedoresGuardados, setProveedoresGuardados] = useState([]);
  const toast = useRef(null);

  const verFormulario = () => {
    limpiarFormulario();
    setMostrarFormulario(true);
  };

  const ocultarFormulario = () => {
    setMostrarFormulario();
  };

  const limpiarFormulario = () => {
    formik.resetForm(
      setFormulario({
        ...formulario,
      })
    );
  };

  const agregarProveedor = async () => {
    try {
      const response = await api.post("proveedor", {
        ...formik.values,
      });
      const { data } = response;
      limpiarFormulario();
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("se intento agregar al proveedor");
    }
  };

  const ProveedorSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .matches(/^[a-zA-Z ]+$/, "El nombre solo debe contener letras"),
    descripcion: Yup.string()
      .required("La descripcion es requerida")
      .min(10, "La descripcion debe tener al menos 10 caracteres")
      .max(200, "La descripcion debe tener maximo 200 caracteres")
      .matches(/^[a-zA-Z0-9 ]+$/, "La descripcion solo debe contener letras y numeros"),
    telefono: Yup.string()
      .required("El numero es requerido")
      .min(9, "El numero debe tener al menos 9 caracteres")
      .max(9, "El numero debe tener maximo 9 caracteres")
      .matches(/^[0-9]+$/, "El numero solo debe contener numeros")
      .matches(/^[9]+$/, "El numero debe empezar con 9"),
    correo: Yup.string().required("El correo es requerido").email("Ingrese un correo valido"),
  });

  const formik = useFormik({
    initialValues: {
      ...formulario,
    },

    validationSchema: ProveedorSchema,

    onSubmit: (data) => {
      console.log(data);
    },
  });

  const isFormFieldInvalid = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  const confirmarGuardado = () => {
    confirmDialog({
      message: "¿Está seguro que desea guardar el formulario?",
      header: "Confirmar",
      icon: "pi pi-question-circle",
      acceptClassName: "p-button-success",
      acceptLabel: "Si",
      acceptIcon: "pi pi-check",
      rejectClassName: "p-button-danger",
      rejectLabel: "No",
      rejectIcon: "pi pi-times",
      accept: () => {
        if (formik.values.nombre != "" && formik.values.descripcion != "" && formik.values.telefono != "" && formik.values.correo != "") {
          toast.current.show({
            severity: "success",
            summary: "Éxito",
            detail: "Formulario Guardado",
            life: 3000,
          });
          agregarProveedor();
          ocultarFormulario();
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
          detail: "Creación cancelada",
          life: 3000,
        });
      },
    });
  };

  const confirmarCancelar = () => {
    confirmDialog({
      message: "¿Está seguro que desea cancelar el formulario?",
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
          severity: "info",
          summary: "Éxito",
          detail: "Formulario Cancelado",
          life: 3000,
        });
        ocultarFormulario();
      },
      reject: () => {
        toast.current.show({
          severity: "info",
          summary: "Cancelado",
          detail: "Acción cancelada",
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

  return (
    <ContenedorProveedores>
      <ConfirmDialog />
      <ContenedorHeader>
        <Button label="Agregar Proveedor" severity="success" icon="pi pi-plus" onClick={verFormulario} />
      </ContenedorHeader>
      <Dialog visible={mostrarFormulario} onHide={ocultarFormulario} header="Agregar Proveedor">
        <Formulario onSubmit={formik.handleSubmit}>
          <Toast ref={toast} />
          <ContenedorInput>
            <Campos>
              <label htmlFor="nombre">Nombre</label>
              <InputText
                placeholder="Ingrese su nombre"
                name="nombre"
                value={formik.values.nombre}
                onChange={(e) => formik.setFieldValue("nombre", e.target.value)}
              />
              <div>{getFormErrorMessage("nombre")}</div>
            </Campos>
            <Campos>
              <label htmlFor="descripcion">Descripción</label>
              <InputTextarea
                id="descripcion"
                value={formik.values.descripcion}
                onChange={(e) => {
                  formik.setFieldValue("descripcion", e.target.value);
                }}
                rows={5}
                autoResize
              />
              {getFormErrorMessage("descripcion")}
            </Campos>
            <Campos>
              <label htmlFor="telefono">Número de teléfono</label>
              <InputText
                name="telefono"
                placeholder="El telefono debe llevar '9' al inicio.."
                value={formik.values.telefono}
                onChange={(e) => {
                  formik.setFieldValue("telefono", e.target.value);
                }}
                className={classNames({ "p-invalid": isFormFieldInvalid("telefono") })}
              />
              {getFormErrorMessage("telefono")}
            </Campos>
            <Campos>
              <label htmlFor="correo">Correo</label>
              <InputText
                name="correo"
                type={"email"}
                placeholder="El correo debe llevar @.."
                value={formik.values.correo}
                onChange={(e) => {
                  formik.setFieldValue("correo", e.target.value);
                }}
                className={classNames({ "p-invalid": isFormFieldInvalid("correo") })}
              />
              {getFormErrorMessage("correo")}
            </Campos>
          </ContenedorInput>
          <ContenedorBoton>
            <Button label="Guardar" severity="success" icon="pi pi-check" onClick={confirmarGuardado} />
            <Button label="Cancelar" severity="danger" icon="pi pi-times" onClick={confirmarCancelar} />
            <Button label="Limpiar" severity="info" icon="pi pi-trash" onClick={confirmarLimpiar} />
          </ContenedorBoton>
        </Formulario>
      </Dialog>

      {/* {proveedoresGuardados.map((formulario, index) => (
        <MiniPerfil key={index}>
          <DatosMiniPerfil>
            <NombreProveedor>Nombre: {formulario.nombre}</NombreProveedor>
            <DescripcionProveedor>Descripción: {formulario.descripcion}</DescripcionProveedor>
            <TelefonoProveedor>Teléfono: {formulario.numero}</TelefonoProveedor>
            <CorreoProveedor>Correo: {formulario.correo}</CorreoProveedor>
          </DatosMiniPerfil>
        </MiniPerfil>
      ))} */}
    </ContenedorProveedores>
  );
};

export default AgregarProveedores;
