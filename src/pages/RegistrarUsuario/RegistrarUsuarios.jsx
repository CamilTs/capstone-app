import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
// import { useAuth } from "../../context/AuthContext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { InputContainer } from "./components/InputContainer";
import { Formulario, InputRow, Inputs } from "./components/StyledComponents";

export const RegistrarUsuarios = () => {
  const [fotoPerfil, setFotoPerfil] = useState(null);
  // const { signUp } = useAuth();
  const estructuraFormulario = {
    rut: "",
    nombre: "",
    apellidos: "",
    correo: "",
    contrasena: "",
    repetir: "",
    fotoPerfil: "",
    rol: "",
  };

  const [formData, setFormData] = useState(estructuraFormulario);
  const resetForm = () => {
    setFormData(estructuraFormulario);
    setFotoPerfil(null);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Cuando se completa la lectura del archivo, el resultado estará en reader.result
        const base64String = reader.result;
        setFormData({ ...formData, fotoPerfil: base64String });
      };

      // Lee el archivo como una URL de datos (base64)
      reader.readAsDataURL(file);
    }
  };

  const rolOptions = [
    { label: "Administrador", value: "administrador" },
    { label: "Cliente", value: "cliente" },
    { label: "Proveedor", value: "proveedor" },
  ];

  const submit = () => {
    const data = { ...formData };
    delete data.repetir;
    // signUp(data);
    resetForm();
  };

  return (
    <>
      <h2>Registrar cuenta</h2>
      <Formulario>
        <Inputs direction="column" className="CONTENEDOR FORM 1">
          <div style={{ width: "60%" }}>
            <Dropdown
              style={{ width: "100%" }}
              id="rol"
              options={rolOptions}
              onChange={handleChange}
              placeholder="Seleccionar Rol"
              name="rol"
              value={formData.rol}
            />
          </div>
          <div
            style={{
              border: "1px solid #999999bf",
              width: "200px",
              height: "200px",
              backgroundColor: "#e8f1f3",
              display: "grid",
              placeContent: "center",
            }}
          >
            {formData.fotoPerfil == "" ? (
              <span
                style={{
                  fontSize: "50px",
                  color: "white",
                }}
                className="pi pi-camera"
              ></span>
            ) : (
              <Image src={formData.fotoPerfil} width="200" height="200" />
            )}
          </div>
          <FileUpload id="fotoPerfil" mode="basic" accept="image/*" onSelect={handleFileChange} />
          {fotoPerfil && (
            <div style={{ marginTop: "10px" }}>
              <img src={URL.createObjectURL(fotoPerfil)} alt="Vista previa de la foto de perfil" style={{ maxWidth: "100px" }} />
            </div>
          )}
        </Inputs>
        <Inputs>
          <InputRow>
            <InputContainer value={formData.rut} label="Rut" name="rut" handleChange={handleChange} />
            <InputContainer value={formData.nombre} label="Nombre" name="nombre" handleChange={handleChange} />
          </InputRow>
          <InputRow>
            <InputContainer value={formData.apellidos} label="Apellidos" name="apellidos" handleChange={handleChange} />
            <InputContainer value={formData.correo} label="Correo" name="correo" handleChange={handleChange} />
          </InputRow>
          <InputRow>
            <InputContainer value={formData.contrasena} label="Contraseña" name="contrasena" type={"password"} handleChange={handleChange} />
            <InputContainer value={formData.repetir} label="Repita su contraseña" name="repetir" type={"password"} handleChange={handleChange} />
          </InputRow>
        </Inputs>
      </Formulario>
      <div className="flex">
        <Button label="Crear" severity="success" onClick={submit} />
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
