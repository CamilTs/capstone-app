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

export const RegistrarComercio = () => {
  const estructuraFormulario = {
    nombre: "",
    direccion: "",
    propietario: "",
    telefono: "",
  };
  const [formulario, setFormulario] = useState(estructuraFormulario);
  const [nombreCliente, setNombreCliente] = useState([]);
  const [verConfirmar, setVerConfirmar] = useState(false);
  const [verLimpiar, setVerLimpiar] = useState(false);
  const toast = useRef(null);

  const limpiarFormulario = () => {
    formik.resetForm(setFormulario(estructuraFormulario));
    toast.current.show({
      severity: "info",
      summary: "Éxito",
      detail: "Formulario Limpiado",
      life: 3000,
    });
    setVerLimpiar(false);
  };

  const crearComercio = async () => {
    try {
      const response = await api.post("comercio", {
        ...formik.values,
      });
      const { data } = response;
      if (!data.success) {
        console.log("Error al crear comercio");
      }
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: `Comercio asignado a ${formik.values.propietario.nombre}`,
        life: 2000,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("Error al crear comercio");
    } finally {
      setVerConfirmar(false);
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

  const validacionValores = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return validacionValores(name) ? (
      <span>
        <Message className="sticky" severity="error" text={`${formik.errors[name]}`}></Message>
      </span>
    ) : null;
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
              maxlength="9"
              placeholder="El telefono debe llevar '9' al inicio.."
              value={formatoTelefono(formik.values.telefono)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {getFormErrorMessage("telefono")}
          </Campos>
        </ContenedorCampos>
      </Formulario>
      <Opciones>
        <Button
          raised
          label="Registrar"
          severity="success"
          rounded
          onClick={() => setVerConfirmar(true)}
          disabled={!formik.dirty || !formik.isValid}
        />
        <Button raised label="Limpiar" severity="danger" rounded onClick={() => setVerLimpiar(true)} disabled={formik.isValid} />
      </Opciones>

      <CustomConfirmDialog
        visible={verConfirmar}
        onHide={() => setVerConfirmar(false)}
        onConfirm={crearComercio}
        type="submit"
        message="¿Confirmar regristro?"
        header="Confirmar"
      />

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
