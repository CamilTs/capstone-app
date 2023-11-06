import React, { useEffect, useRef, useState } from "react";
import { InputContainer } from "../../../components/InputContainer";
import { Formulario, Opciones, Campos, ContenedorCampos, Contenedor } from "./StyledComponents";
import { api } from "../../../api/api";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { ComercioSchema } from "../../../components/Validaciones";
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

  const formik = useFormik({
    initialValues: {
      ...formulario,
    },
    validationSchema: ComercioSchema,

    onSubmit: (data) => {
      console.log(data);
    },
  });

  const camposVacios = () => {
    return !formik.values.propietario || !formik.values.nombre || !formik.values.direccion || !formik.values.telefono;
  };

  const camposLimpiar = () => {
    return formik.isValid != "";
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
        if (camposVacios()) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Ops! Algo ha salido mal, revisa los campos",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Éxito",
            detail: "¡¡Registro exitoso!!",
            life: 3000,
          });
          crearComercio();
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

  const isFormFieldInvalid = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : null;
  };

  useEffect(() => {
    traerUsuarios();
  }, []);

  return (
    <Contenedor>
      <Toast ref={toast} />
      <Formulario onSubmit={formik.handleSubmit}>
        <ContenedorCampos>
          <Campos>
            <label htmlFor="propietario">Propietario</label>
            <Dropdown
              name="propietario"
              id="propietario"
              options={nombreCliente}
              optionLabel="nombre"
              placeholder="Seleccione un propietario.."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.propietario}
            />
            {getFormErrorMessage("propietario")}
          </Campos>
          <Campos>
            <label htmlFor="nombre">Nombre</label>
            <InputContainer
              name="nombre"
              placeholder="Ingrese el nombre del comercio.."
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {getFormErrorMessage("nombre")}
          </Campos>
          <Campos>
            <label htmlFor="direccion">Dirrección</label>
            <InputContainer
              name="direccion"
              placeholder="Ingrese la dirección del comercio.."
              value={formik.values.direccion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {getFormErrorMessage("direccion")}
          </Campos>
          <Campos>
            <label htmlFor="telefono">Teléfono</label>
            <InputContainer
              name="telefono"
              type="number"
              placeholder="El telefono debe llevar '9' al inicio.."
              value={formik.values.telefono}
              onChange={(e) => {
                if (e.target.value.length <= 9) {
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
            />
            {getFormErrorMessage("telefono")}
          </Campos>
          <ConfirmDialog />
        </ContenedorCampos>
      </Formulario>
      <Opciones>
        <Button raised label="Registrar" severity="success" rounded onClick={confirmarComercio} disabled={camposVacios()} />
        <Button raised label="Limpiar" severity="danger" rounded onClick={confirmarLimpiar} disabled={camposLimpiar()} />
      </Opciones>
    </Contenedor>
  );
};
