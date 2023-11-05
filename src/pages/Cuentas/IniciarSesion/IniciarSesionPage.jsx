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

export const IniciarSesionPage = () => {
  const msgs = useRef(null);
  const { status, errorMessage } = useSelector((state) => state.auth);
  const loading = useMemo(() => status === "cargando", [status]);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    rut: "",
    contrasena: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const toast = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    dispatch(autenticando(formData));
    if (formData.rut == "" || formData.contrasena == "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Debe completar todos los campos",
        life: 3000,
      });
    } else {
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Iniciando sesión...",
        life: 3000,
      });
    }
  };

  return (
    <Contenedor>
      <Toast ref={toast} />
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width-device-width, initial-scale-1.0" />
        <title>Bienvenido</title>
      </head>
      <Form onSubmit={submit}>
        <Titulo>Iniciar Sesión</Titulo>
        <ContenedorCampos>
          <ContenedorSpan className="p-float-label p-input-icon-left">
            <i className="pi pi-user"></i>
            <InputText value={formData.rut} name="rut" onChange={handleChange} />
            <label htmlFor="rut">Rut</label>
          </ContenedorSpan>
          <ContenedorSpan className="p-float-label p-input-icon-left">
            <i className="pi pi-eye"></i>
            <InputText type="password" value={formData.contrasena} name="contrasena" onChange={handleChange} feedback={false} />
            <label htmlFor="password">Contraseña</label>
          </ContenedorSpan>
        </ContenedorCampos>
        {errorMessage && (
          <div>
            <Messages ref={msgs} />
          </div>
        )}
        <Boton label="Iniciar Sesión" disabled={loading} severity="success" type="submit" />
      </Form>
    </Contenedor>
  );
};
