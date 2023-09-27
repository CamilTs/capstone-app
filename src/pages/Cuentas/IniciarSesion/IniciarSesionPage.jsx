/* eslint-disable react/prop-types */
// En IniciarSesionPage.jsx (Componente de página)

import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Content } from "../../../App";
import { useAuth } from "../../../context/AuthContext";
import styled from "styled-components";

export const IniciarSesionPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rut: "",
    contrasena: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  // const toast = useRef(null);
  // const mostrar = () => {
  //   toast.current.show({ severity: "success", summary: "Listo", detail: "Producto Agregado", life: 2000 });
  // };

  const submit = () => {
    login(formData.rut, formData.contrasena);
    navigate("/");
  };

  const Titulo = styled.h2`
    text-transform: uppercase;
    margin: 2rem 0 2rem 0;
  `;

  // ====== Revisar ======
  const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 20%;
    width: 100%;
  `;

  return (
    <Content width="auto" margin="auto">
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
        <Button style={{ margin: "auto" }} label="Iniciar Sesión" severity="success" onClick={submit} />
      </div>
    </Content>
  );
};
