/* eslint-disable react/prop-types */
// En IniciarSesionPage.jsx (Componente de página)

// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { Messages } from "primereact/messages";
import { useDispatch, useSelector } from "react-redux";
import { autenticando, revisandoAutentication } from "../../../store/auth";
import { Toast } from "primereact/toast";
import { Contenedor, Titulo, Form, ContenedorCampos, Boton } from "../components/StyledIniciarSesion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formatoRut } from "../../../components/Formatos";
import { InputContainer } from "../../../components/InputContainer";
import { Message } from "primereact/message";

export const IniciarSesionPage = () => {
  const msgs = useRef(null);
  const toast = useRef(null);
  const { status, errorMessage } = useSelector((state) => state.auth);
  const loading = useMemo(() => status === "cargando", [status]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useDispatch();

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

  const formik = useFormik({
    initialValues: {
      rut: "",
      contrasena: "",
    },
    validationSchema: Yup.object({
      rut: Yup.string().required("El rut es obligatorio"),
      contrasena: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const submit = async (e) => {
    e.preventDefault();

    const { rut, contrasena } = formik.values;

    msgs.current.clear();

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

  const verContrasena = () => {
    const input = document.getElementById("contrasena");
    if (input.type === "password") {
      input.type = "text";
      setIsPasswordVisible(true);
    } else {
      input.type = "password";
      setIsPasswordVisible(false);
    }
  };

  const validacionValores = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return validacionValores(name) ? (
      <span>
        <Message
          style={{ border: "solid red", borderWidth: "0 0 0 6px" }}
          className="sticky"
          severity="error"
          text={`${formik.errors[name]}`}
        ></Message>
      </span>
    ) : null;
  };

  return (
    <Contenedor>
      <Toast ref={toast} />
      <Form onSubmit={formik.handleSubmit}>
        <Titulo>Iniciar Sesión</Titulo>
        <ContenedorCampos>
          <div className="flex">
            <span className="flex p-float-label p-inputgroup-addon">
              <i className="pi pi-user" />
            </span>
            <InputContainer
              className="inicio"
              placeholder="Ingrese su rut"
              name="rut"
              maxlength="12"
              value={formatoRut(formik.values.rut)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {getFormErrorMessage("rut")}
          <div className="flex">
            <span className="flex p-float-label p-inputgroup-addon">
              <i style={{ cursor: "pointer" }} className={isPasswordVisible ? "pi pi-eye" : "pi pi-eye-slash"} onClick={verContrasena} />
            </span>
            <InputContainer
              className="inicio"
              placeholder="Ingrese su contraseña"
              id="contrasena"
              name="contrasena"
              type="password"
              value={formik.values.contrasena}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {getFormErrorMessage("contrasena")}
        </ContenedorCampos>
        <Messages ref={msgs} />
        <Boton label="Iniciar Sesión" icon="pi pi-sign-in" iconPos="right" disabled={loading} severity="success" onClick={submit} />
      </Form>
    </Contenedor>
  );
};
