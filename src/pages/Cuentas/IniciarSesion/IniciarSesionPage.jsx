/* eslint-disable react/prop-types */
// En IniciarSesionPage.jsx (Componente de página)

// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
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

  useEffect(() => {
    if (errorMessage) {
      msgs.current.show({
        severity: "error",
        summary: "Error",
        detail: errorMessage,
        life: 3000,
      });
    }
  }, [errorMessage]);

  const submit = async (e) => {
    e.preventDefault();

    const { rut, contrasena } = formik.values;

    if (!rut && !contrasena) {
      msgs.current.show([
        {
          severity: "error",
          summary: "Error",
          detail: "Ingresa tus datos",
          sticky: true,
        },
      ]);
    } else if (!rut) {
      msgs.current.show([
        {
          severity: "error",
          summary: "Error",
          detail: "Falta ingresar el rut",
          sticky: true,
        },
      ]);
    } else if (!contrasena) {
      msgs.current.show([
        {
          severity: "error",
          summary: "Error",
          detail: "Falta ingresar la contraseña",
          sticky: true,
        },
      ]);
    } else {
      dispatch(autenticando(formik.values));
      toast.current.show({
        severity: "success",
        summary: "Bienvenido",
        detail: "Iniciando sesión...",
        life: 2000,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      ...formData,
    },
    validationSchema: Yup.object({
      rut: Yup.string().required("El rut es obligatorio"),
      contrasena: Yup.string().required("La contraseña es obligatoria"),
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
        <Messages ref={msgs} />
        <Boton label="Iniciar Sesión" disabled={loading} severity="success" onClick={submit} />
      </Form>
    </Contenedor>
  );
};
