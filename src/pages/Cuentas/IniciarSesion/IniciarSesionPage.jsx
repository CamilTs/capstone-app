/* eslint-disable react/prop-types */
// En IniciarSesionPage.jsx (Componente de página)

// import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Content } from "../../../App";
import { useAuth } from "../../../context/AuthContext";
import styled from "styled-components";
import { api, useApi } from "../../../api/api";
// import { autenticado, revisandoAutentication } from "../../../store/auth";

const Titulo = styled.h2`
  text-transform: uppercase;
  margin: 2rem 0 2rem 0;
`;

export const IniciarSesionPage = () => {
  const { login } = useAuth();
  const { post, loading, get } = useApi();
  const navigate = useNavigate();

  // const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    rut: "",
    contrasena: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const submit = async () => {
    await login(formData.rut, formData.contrasena);

    const res = await post("autenticacion/login", formData);

    console.log(res);
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

  return (
    <Content width="auto" margin="auto">
      <form onSubmit={submit}>
        <Titulo>Iniciar Sesión</Titulo>
        <div style={{ display: "grid", placeContent: "center" }}>
          <span className="p-float-label">
            <InputText value={formData.rut} name="rut" onChange={handleChange} />
            <label htmlFor="rut">Rut</label>
          </span>
          <span className="p-float-label" style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Password value={formData.contrasena} name="contrasena" onChange={handleChange} feedback={false} />
            <label style={{ textAlign: "center" }} htmlFor="password">
              Contraseña
            </label>
          </span>
        </div>
        <div className="card flex justify-content-center">
          <Button style={{ margin: "auto" }} label="Iniciar Sesión" disabled={loading} severity="success" onClick={submit} />
        </div>
      </form>
    </Content>
  );
};
