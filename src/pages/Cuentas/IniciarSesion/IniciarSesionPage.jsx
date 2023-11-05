/* eslint-disable react/prop-types */
// En IniciarSesionPage.jsx (Componente de página)

// import { useDispatch, useSelector } from "react-redux";
import { useMemo, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import { useDispatch, useSelector } from "react-redux";
import { autenticando, revisandoAutentication } from "../../../store/auth";
import { Toast } from "primereact/toast";
import { Contenedor, Titulo, Form, ContenedorCampos, ContenedorSpan, Boton } from "../components/StyledIniciarSesion";
import { useFormik } from "formik";
import * as Yup from "yup";

export const IniciarSesionPage = () => {
  const msgs = useRef(null);
  const toast = useRef(null);
  const { status, errorMessage } = useSelector((state) => state.auth);
  const loading = useMemo(() => status === "cargando", [status]);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    rut: "",
    contrasena: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    dispatch(autenticando(formik.values));

    if (status == "autenticado") {
      toast.current.show({
        severity: "success",
        summary: "Iniciando sesión...",
        detail: "Espere un momento por favor",
        life: 2000,
      });
    } else if (errorMessage) {
      try {
        throw new Error("Ingresa tus datos");
      } catch (error) {
        msgs.current.show([
          {
            severity: "error",
            summary: "Error",
            detail: error.message,
            sticky: true,
          },
        ]);
      }
    }
    if (formik.values.rut != "") {
      dispatch(revisandoAutentication(formik.values));
    } else {
      try {
        throw new Error("Ingresa tu rut");
      } catch (error) {
        msgs.current.show([
          {
            severity: "error",
            summary: "Error",
            detail: error.message,
            sticky: true,
          },
        ]);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      ...formData,
    },
    validationSchema: Yup.object({
      rut: Yup.string().required("Ingrese el rut"),
      contrasena: Yup.string().required("Ingrese la contraseña"),
    }),
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const isFormFieldInvalid = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : null;
  };

  return (
    <Contenedor>
      <Toast ref={toast} />
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width-device-width, initial-scale-1.0" />
        <title>Bienvenido</title>
      </head>
      <Form onSubmit={formik.handleSubmit}>
        <Titulo>Iniciar Sesión</Titulo>
        <ContenedorCampos>
          <ContenedorSpan className="p-float-label p-input-icon-left">
            <i className="pi pi-user"></i>
            <InputText value={formik.values.rut} name="rut" onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <label htmlFor="rut">Rut</label>
          </ContenedorSpan>
          {getFormErrorMessage("rut")}
          <ContenedorSpan className="p-float-label p-input-icon-left">
            <i className="pi pi-eye"></i>
            <InputText type="password" value={formik.values.contrasena} name="contrasena" onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <label htmlFor="password">Contraseña</label>
          </ContenedorSpan>
          {getFormErrorMessage("contrasena")}
        </ContenedorCampos>
        {errorMessage && <Messages ref={msgs} />}
        <Boton label="Iniciar Sesión" disabled={loading} severity="success" onClick={submit} />
      </Form>
    </Contenedor>
  );
};
