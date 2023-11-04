import React, { useEffect, useRef, useState } from "react";
import { InputContainer } from "./InputContainer";
import { Formulario, Opciones, Campos, ContenedorCampos, Contenedor, Inputs } from "./StyledComponents";
import { api } from "../../../api/api";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import * as Yup from "yup";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

export const RegistrarComercio = () => {
  const estructuraFormulario = {
    nombre: "",
    direccion: "",
    propietario: "",
    telefono: "",
  };
  const [formulario, setFormulario] = useState(estructuraFormulario);
  const [nombreCliente, setNombreCliente] = useState([]);
  const toast = useRef(null);

  const limpiarFormulario = () => {
    formik.resetForm(setFormulario(estructuraFormulario));
  };

  const crearComercio = async () => {
    try {
      const response = await api.post("comercio", {
        ...formik.values,
      });
      const { data } = response;
      limpiarFormulario();
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("Error al crear comercio");
    }
  };

  const traerUsuarios = async () => {
    try {
      const response = await api.get("rol/cliente");
      const { data } = response;
      console.log(data);
      const nombreCliente = data.data.map((usuario) => usuario);
      console.log(nombreCliente);
      setNombreCliente(nombreCliente);
    } catch (error) {
      console.log(error);
      console.log("Error al traer los usuarios");
    }
  };

  const ComercioSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("Nombre requerido")
      .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Nombre invalido"),
    direccion: Yup.string()
      .required("Dirección requerida")
      .matches(/^[a-zA-ZÀ-ÿ\s]/, "Dirección invalida"),
    // propietario: Yup.string().required("Propietario requerido"),
    telefono: Yup.string()
      .required("Teléfono requerido")
      .matches(/^[0-9]+$/, "El teléfono debe ser numérico")
      .min(9, "El teléfono debe tener 9 dígitos")
      .max(9, "El teléfono debe tener 9 dígitos")
      .matches(/^[9]/, "El teléfono debe comenzar con 9"),
  });

  const formik = useFormik({
    initialValues: {
      ...formulario,
    },
    validationSchema: ComercioSchema,

    onSubmit: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    traerUsuarios();
  }, []);

  const isFormFieldInvalid = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  const confirmarComercio = () => {
    confirmDialog({
      message: "¿Estás seguro que quieres registrar este comercio?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-success",
      acceptLabel: "Si",
      acceptIcon: "pi pi-check",
      rejectClassName: "p-button-danger",
      rejectLabel: "No",
      rejectIcon: "pi pi-times",
      accept: () => {
        if (formik.isValid) {
          toast.current.show({
            severity: "success",
            summary: "Éxito",
            detail: "¡¡Registro exitoso!!",
            life: 3000,
          });
          crearComercio();
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Ops! Algo ha salido mal, revisa los campos",
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

  return (
    <Contenedor>
      <Toast ref={toast} />
      <Formulario onSubmit={formik.handleSubmit}>
        <div>
          <Inputs>
            <Campos>
              <label htmlFor="propietario">Propietario</label>
              <Dropdown
                id="propietario"
                value={formik.values.propietario}
                options={nombreCliente}
                optionLabel="nombre"
                onChange={(e) => {
                  formik.setFieldValue("propietario", e.target.value);
                }}
                placeholder="Seleccione un propietario.."
                name="propietario"
                className={classNames({ "p-invalid": isFormFieldInvalid("propietario") })}
              />
              {getFormErrorMessage("propietario")}
            </Campos>
            <Campos>
              <label htmlFor="nombre">Nombre</label>
              <InputContainer
                name="nombre"
                placeholder="Ingrese el nombre del comercio.."
                value={formik.values.nombre}
                handleChange={(e) => {
                  formik.setFieldValue("nombre", e.target.value);
                }}
                className={classNames({ "p-invalid": isFormFieldInvalid("nombre") })}
              />
              {getFormErrorMessage("nombre")}
            </Campos>
            <Campos>
              <label htmlFor="direccion">Dirrección</label>
              <InputContainer
                name="direccion"
                placeholder="Ingrese la dirección del comercio.."
                value={formik.values.direccion}
                handleChange={(e) => {
                  formik.setFieldValue("direccion", e.target.value);
                }}
                className={classNames({ "p-invalid": isFormFieldInvalid("direccion") })}
              />
              {getFormErrorMessage("direccion")}
            </Campos>
            <Campos>
              <label htmlFor="telefono">Teléfono</label>
              <InputContainer
                name="telefono"
                type={"number"}
                placeholder="El telefono debe llevar '9' al inicio.."
                value={formik.values.telefono}
                handleChange={(e) => {
                  formik.setFieldValue("telefono", e.target.value);
                }}
                className={classNames({ "p-invalid": isFormFieldInvalid("telefono") })}
              />
              {getFormErrorMessage("telefono")}
            </Campos>
            <ConfirmDialog />
          </Inputs>
        </div>
        <Opciones>
          <Button label="Registrar" severity="success" rounded typeof="submit" onClick={confirmarComercio} />
          <Button label="Limpiar" severity="danger" rounded onClick={confirmarLimpiar} />
        </Opciones>
      </Formulario>
    </Contenedor>
  );
};
