import React, { useEffect, useState } from "react";
import { InputContainer } from "./InputContainer";
import { Formulario, Opciones, Campos, ContenedorCampos, Contenedor, Inputs } from "./StyledComponents";
import { api } from "../../../api/api";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";

export const RegistrarComercio = () => {
  const estructuraFormulario = {
    nombre: "",
    direccion: "",
    propietario: "",
    telefono: "",
  };
  const [formulario, setFormulario] = useState(estructuraFormulario);
  const [nombreCliente, setNombreCliente] = useState([]);

  const limpiarFormulario = () => {
    formik.resetForm(
      setFormulario({
        ...estructuraFormulario,
      })
    );
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

    validate: (data) => {
      let errors = {};
      if (!data.nombre) {
        errors.nombre = "Nombre requerido";
      } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(data.nombre)) {
        errors.nombre = "Nombre invalido";
      }
      if (!data.direccion) {
        errors.direccion = "Dirección requerida";
      } else if (!/^[a-zA-ZÀ-ÿ\s]/.test(data.direccion)) {
        errors.direccion = "Dirección invalida";
      }
      if (!data.propietario) {
        errors.propietario = "Propietario requerido";
      }
      if (!data.telefono) {
        errors.telefono = "Teléfono requerido";
      } else if (!/^[a-zA-Z0-9À-ÿ\s]{4,40}$/.test(data.telefono)) {
        errors.telefono = "Teléfono invalido";
      }
      return errors;
    },
    onSubmit: (data) => {
      console.log(data);
      crearComercio();
      limpiarFormulario();
    },
  });

  useEffect(() => {
    traerUsuarios();
  }, []);

  const isFormFieldInvalid = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  return (
    <Contenedor>
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
                  formik.setFieldValue("propietario", e.value);
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
                placeholder="El telefono debe llevar '9' al inicio.."
                value={formik.values.telefono}
                handleChange={(e) => {
                  formik.setFieldValue("telefono", e.target.value);
                }}
                className={classNames({ "p-invalid": isFormFieldInvalid("telefono") })}
              />
              {getFormErrorMessage("telefono")}
            </Campos>
            <Opciones>
              <Button label="Registrar" severity="success" rounded type="submit" />
              <Button label="Limpiar" severity="danger" rounded onClick={limpiarFormulario} />
            </Opciones>
          </Inputs>
        </div>
      </Formulario>
    </Contenedor>
  );
};
