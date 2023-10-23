/* eslint-disable react/prop-types */
// En IniciarSesionPage.jsx (Componente de página)

// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import { Password } from "primereact/password";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Content } from "../../../App";
import { useAuth } from "../../../context/AuthContext";
import styled from "styled-components";
import { api, useApi } from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { autenticando, revisandoAutentication } from "../../../store/auth";
import { useMountEffect } from "primereact/hooks";
const Contenedor = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
`;

const Titulo = styled.h2`
  text-transform: uppercase;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 0 1px 0 #538a90, 0 2px 0 #538a70, 0 3px 0 #538a75, 0 4px 0 #538a80, 0 5px 0 #538a90, 0 6px 1px rgba(0, 0, 0, 0.1),
    0 0 5px rgba(0, 0, 0, 0.5), 0 1px 10px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.7), 0 5px 10px rgba(0, 0, 0, 0.5),
    0 10px 10px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  gap: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.65);
`;

const ContenedorCampos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const ContenedorSpan = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
`;

export const IniciarSesionPage = () => {
  const msgs = useRef(null);
  const { login } = useAuth();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const loading = useMemo(() => status === "revisando-autenticacion", [status]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    rut: "",
    contrasena: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    // await login(formData.rut, formData.contrasena);
    login(formData.rut, formData.contrasena);

    dispatch(autenticando(formData));
    console.log(errorMessage);
    // dispatch(revisandoAutentication());
    // const res = await post("autenticacion/login", formData);
    console.log("HOLA");
    // console.log(res);
    navigate("/");
  };

  // Intento de login con redux

  // const onSubmit = async (event) => {
  //   event.preventDefault();

  //   dispatch(revisandoAutentication());

  //   await dispatch(autenticado(formData.rut, formData.contrasena));

  //   const esAuntenticado = useSelector((state) => state.auth.status === "autenticado");

  //   if (esAuntenticado) {
  //     navigate("/");
  //   } else {
  //     console.log("Autenticacion fallida");
  //   }
  // };

  // useEffect(() => {
  //   if (msgs.current) {
  //     msgs.current.clear();
  //     msgs.current.show({ id: "1", sticky: true, severity: "error", summary: "Error", detail: errorMessage, closable: false });
  //   }
  // }, [errorMessage]);
  return (
    <Contenedor>
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
        <div>
          <Button label="Iniciar Sesión" disabled={loading} severity="success" rounded type="submit" />
        </div>
      </Form>
    </Contenedor>
  );
};
