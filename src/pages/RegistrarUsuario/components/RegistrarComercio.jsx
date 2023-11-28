import React, { useEffect, useRef, useState } from "react";
import { InputContainer } from "../../../components/InputContainer";
import { Formulario, Opciones, Campos, ContenedorCampos, Contenedor } from "./StyledComponents";
import { api } from "../../../api/api";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { ComercioSchema } from "../../../components/Validaciones";
import { Toast } from "primereact/toast";
import { CustomConfirmDialog } from "../../../components/CustomConfirmDialog";
import { formatoTelefono } from "../../../components/Formatos";
import { Message } from "primereact/message";

export const RegistrarComercio = ({ estructuraFormularioComercio, formulario, setFormulario, estado, cambiarPestania, nombreCliente }) => {
  const [verConfirmar, setVerConfirmar] = useState(false);
  const [verLimpiar, setVerLimpiar] = useState(false);
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
            <Dropdown
              name="propietario"
              id="propietario"
              options={nombreCliente}
              optionLabel="nombre"
              placeholder="Seleccione un propietario.."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.propietario}
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
              maxlength="9"
              placeholder="El telefono debe llevar '9' al inicio.."
              value={formatoTelefono(formik.values.telefono)}
              onChange={(e) => {
                if (!e.target.value || /^[0-9]*$/.test(e.target.value)) {
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
            />
            {getFormErrorMessage("telefono")}
          </Campos>
        </ContenedorCampos>
      </Formulario>
      <Opciones>
        {estado == "crear" ? (
          <Button
            raised
            label="Registrar"
            severity="success"
            rounded
            onClick={() => setVerConfirmar(true)}
            disabled={!formik.dirty || !formik.isValid}
          />
        ) : (
          <Button raised label="Actualizar" severity="warning" rounded onClick={() => setVerConfirmar(true)} disabled={!formik.dirty} />
        )}
        <Button raised label="Limpiar" severity="danger" rounded onClick={() => setVerLimpiar(true)} disabled={!formik.dirty} type="button" />
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
