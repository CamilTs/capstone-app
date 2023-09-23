import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import styled from "styled-components";

import { ContenedorForm1 } from "./components/ContenedorForm1";
import { ContenedorForm2 } from "./components/ContenedorForm2";

const Formulario = styled.div`
  display: flex;
`;

export const RegistrarUsuarios = () => {
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [cargando, setCargando] = useState(false);

  const estructuraFormulario = {
    rut: "",
    nombre: "",
    apellidos: "",
    correo: "",
    contrasena: "",
    repetir: "",
    fotoPerfil: null,
    rol: "",
  };

  const [formData, setFormData] = useState(estructuraFormulario);
  const resetForm = () => {
    setFormData(estructuraFormulario);
    setFotoPerfil(null);
  };

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    if (storedFormData) {
      setFormData(storedFormData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.files[0];
    setFotoPerfil(file);

    setFormData({
      ...formData,
      fotoPerfil: file,
    });
  };

  const rolOptions = [
    { label: "Administrador", value: "administrador" },
    { label: "Encargado", value: "encargado" },
  ];

  const cargar = () => {
    if (formData.fotoPerfil) {
      setCargando(true);

      setTimeout(() => {
        setCargando(false);
        submit(); // Llamar a la función submit cuando cargando sea falso
      }, 2000);
    }
  };

  const submit = () => {
    console.log(formData);
  };

  return (
    <>
      <h2>Registrar cuenta</h2>
      <Formulario>
        <ContenedorForm1
          rolOptions={rolOptions}
          handleChange={handleChange}
          formData={formData}
          handleFileChange={handleFileChange}
          fotoPerfil={fotoPerfil}
        />
        <ContenedorForm2 formData={formData} handleChange={handleChange} />
      </Formulario>
      <div className="flex">
        <Link to={"/iniciar-sesion"}>
          <Button
            label="Crear"
            severity="success"
            loading={cargando}
            onClick={cargar}
          />
          <Button severity="info" label="Borrar" onClick={resetForm} />
        </Link>
      </div>
      <p style={{ fontSize: "10px" }}>
        ¿Ya tienes una cuenta? Presiona{" "}
        <Link to="/Iniciar-sesion" style={{ color: "blue" }}>
          aquí
        </Link>
        .
      </p>
    </>
  );
};
