import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import styled from "styled-components";

const Formulario = styled.div`
  display: flex;
`;

const Inputs = styled.div`
  flex: 1;
  display: flex;
  flex-flow: ${({direction}) => direction?`${direction} wrap`:'row wrap'};
  /* flex-flow: row wrap; */
  justify-content: center;
  align-items:${({direction}) => direction == 'column'?`center`:null};
  gap: 20px;
`;
const Input = styled(InputText)`
  width: 100%;
`;

const InputContainer = styled.span`
  width: 40%;
`;
const InputRow = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
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

  // ======== FORM HOOK ========

  const [formData, setFormData] = useState(estructuraFormulario);
  const resetForm = () => {
    setFormData(estructuraFormulario);
    setFotoPerfil(null);
  };

  // == INTENTO DE ALMACENAMIENTO == //
  // Cargar los objetos guardados desde localStorage al cargar la página
  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    if (storedFormData) {
      setFormData(storedFormData);
    }
  }, []);

  // Guardar los objetos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // ================================= //

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

  //  ========== FORM HOOK =========

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
        <Inputs direction="column" className="CONTENEDOR FORM 1" >
            <div style={{width:'60%',}}>
              <Dropdown
              style={{width:'100%'}}
                id="rol"
                options={rolOptions}
                onChange={handleChange}
                placeholder="Seleccionar Rol"
                name="rol"
                value={formData.rol}
              />
            </div>
              <div style={{
                border:'1px solid #999999bf',
                width:'200px',
                height:'200px',
                backgroundColor:'#e8f1f3',
                display:'grid',
                placeContent:'center'
              }}>
              <span style={{
                fontSize:'50px',
                color:'white',
              }} className="pi pi-camera"></span>
              </div>
            <FileUpload
              id="fotoPerfil"
              mode="basic"
              accept="image/*"
              onSelect={handleFileChange}
            />
            {fotoPerfil && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={URL.createObjectURL(fotoPerfil)}
                  alt="Vista previa de la foto de perfil"
                  style={{ maxWidth: "100px" }}
                />
              </div>
            )}
        </Inputs>
        <Inputs className="CONTENEDOR FORM 2">
          <InputRow>
            <InputContainer className="p-float-label">
              <Input value={formData.rut} name="rut" onChange={handleChange} />
              <label htmlFor="username">Rut</label>
            </InputContainer>

            <InputContainer className="p-float-label">
              <Input
                value={formData.nombre}
                name="nombre"
                onChange={handleChange}
              />
              <label htmlFor="nombre">Nombre</label>
            </InputContainer>
          </InputRow>

          <InputRow>
            <InputContainer className="p-float-label">
              <Input
                value={formData.apellidos}
                name="apellidos"
                onChange={handleChange}
              />
              <label htmlFor="apellidos">Apellidos</label>
            </InputContainer>

            <InputContainer className="p-float-label">
              <Input
                value={formData.correo}
                name="correo"
                onChange={handleChange}
              />
              <label htmlFor="correo">Correo</label>
            </InputContainer>
          </InputRow>

          <InputRow>
            <InputContainer className="p-float-label">
              <Input
                type="password"
                value={formData.contrasena}
                name="contrasena"
                onChange={handleChange}
              />
              <label htmlFor="password">Contraseña</label>
            </InputContainer>

            <InputContainer className="p-float-label">
              <Input
                type="password"
                value={formData.repetir}
                name="repetir"
                onChange={handleChange}
              />
              <label htmlFor="password">Repetir contraseña</label>
            </InputContainer>
          </InputRow>
        </Inputs>
      </Formulario>
      <div className="flex">
        <Button
          label="Crear"
          severity="success"
          loading={cargando}
          onClick={cargar}
        />
        <Button severity="info" label="Borrar" onClick={resetForm} />
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
