import React, { useEffect, useRef, useState } from "react";
import { InputContainer, InputContainerDropdown } from "../../../components/InputContainer";
import { Formulario, Opciones, Campos, ContenedorCampos, Contenedor } from "./StyledComponents";
import { api } from "../../../api/api";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { ComercioSchema } from "../../../components/Validaciones";
import { Toast } from "primereact/toast";
import { CustomConfirmDialog } from "../../../components/CustomConfirmDialog";
import { Message } from "primereact/message";

export const RegistrarComercio = ({ estructuraFormularioComercio, formulario, setFormulario, estado, cambiarPestania, nombreCliente }) => {
  const [verConfirmar, setVerConfirmar] = useState(false);
  const [verLimpiar, setVerLimpiar] = useState(false);
  const [propietarioSeleccionado, setPropietarioSeleccionado] = useState({})
  const toast = useRef(null);

  const limpiarFormulario = () => {
    formik.resetForm(setFormulario(estructuraFormularioComercio));
    toast.current.show({
      severity: "info",
      summary: "Formulario limpio",
      detail: "Se limpia el formulario",
      life: 2000,
    });
    setVerLimpiar(false);
  };

  const crearComercio = async () => {
    try {
      const dataToSend = estado === "crear" ? { ...formik.values } : { ...formik.values };

      if (estado === "crear") {
        const response = await api.post("comercio", dataToSend);
        const { data } = response;
      } else {
        const response = await api.put(`comercio/${dataToSend._id}`, dataToSend);
        const { data } = response;
      }
      toast.current.show({
        severity: estado === "crear" ? "success" : "info",
        summary: estado === "crear" ? "Creado" : "Editado",
        detail: estado === "crear" ? `Comercio asignado a ${formik.values.propietario.nombre}` : "Comercio editado",
        life: 2000,
      });
      
    estado=='crear'&& setPropietarioSeleccionado({});

      estado === "crear" ? formik.resetForm() : cambiarPestania(3);
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `Error al ${estado === "crear" ? "crear" : "editar"} el comercio`,
        life: 2000,
      });
    } finally {
      setVerConfirmar(false);
    }
  };

  const controlarPropietario = (e) => {
    setPropietarioSeleccionado(e.value)
    formik.handleChange(e)
    formik.setFieldValue("propietario", e.value.id)
  }

  const formik = useFormik({
    initialValues: {
      ...formulario,
    },
    validationSchema: ComercioSchema,

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

  useEffect(() => {}, [estado]);

  return (
    <Contenedor>
      <Toast ref={toast} />
      <Formulario onSubmit={formik.handleSubmit}>
        <ContenedorCampos>
          <Campos>
            <label htmlFor="propietario">Propietario</label>
            <InputContainerDropdown
              name="propietario"
              id="propietario"
              options={nombreCliente}
              optionLabel="nombre"
              placeholder="Seleccione un propietario.."
              onChange={controlarPropietario}
              onBlur={formik.handleBlur}
              value={propietarioSeleccionado}
              disabled={estado === "editar"}
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
              disabled={!formik.values.propietario}
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
              disabled={!formik.values.propietario}
            />
            {getFormErrorMessage("direccion")}
          </Campos>
          <Campos>
            <label htmlFor="telefono">Teléfono</label>
            <InputContainer
              name="telefono"
              maxlength="9"
              placeholder="El teléfono debe llevar '9' al inicio.."
              value={formik.values.telefono}
              onChange={(e) => {
                if (!e.target.value || /^[0-9]*$/.test(e.target.value)) {
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
              disabled={!formik.values.propietario}
            />
            {getFormErrorMessage("telefono")}
          </Campos>
        </ContenedorCampos>
      </Formulario>
      <Opciones>

        {estado == "crear" ? (
          <Button
            icon="pi pi-plus"
            raised
            label="Registrar"
            severity="success"
            rounded
            onClick={() => setVerConfirmar(true)}
            disabled={!formik.dirty || !formik.isValid}
          />
        ) : (
          <Button
            icon="pi pi-pencil"
            raised
            label="Actualizar"
            severity="warning"
            rounded
            onClick={() => setVerConfirmar(true)}
            disabled={!formik.dirty}
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
          <Button icon="pi pi-arrow-right" raised label="Cancelar" severity="danger" rounded onClick={() => cambiarPestania(3)} type="button" />
        )}
      </Opciones>

      {estado === "crear" ? (
        <CustomConfirmDialog
          visible={verConfirmar}
          onHide={() => setVerConfirmar(false)}
          onConfirm={crearComercio}
          type="submit"
          message="¿Confirmar creación?"
          header="Confirmar"
        />
      ) : (
        <CustomConfirmDialog
          visible={verConfirmar}
          onHide={() => setVerConfirmar(false)}
          onConfirm={crearComercio}
          type="submit"
          message={`¿Confirmar modificación del comercio?`}
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
