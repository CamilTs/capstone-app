import { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputContainer } from "./components/InputContainer";
import {
  Formulario,
  InputRow,
  Inputs,
  Campos,
  ContenedorImg,
  ImagenPreview,
  ImagenImagen,
  SpanImagen,
  ContenedorCampos,
  Opciones,
  Titulo,
  Contenedor,
} from "./components/StyledComponents";
import { api } from "../../api/api";

export const RegistrarUsuarios = () => {
  const [imagen, setImagen] = useState(null);
  const estructuraFormulario = {
    rut: "",
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    repetir: "",
    imagen: "",
    rol: "",
  };
  const [formulario, setFormulario] = useState(estructuraFormulario);

  const limpiarFormulario = () => {
    setFormulario(estructuraFormulario);
    setImagen(null);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Cuando se completa la lectura del archivo, el resultado estará en reader.result
        const base64String = reader.result;
        setFormulario({ ...formulario, imagen: base64String });
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

  const crearUsuario = async () => {
    try {
      const response = await api.post("usuario", {
        ...formulario,
      });
      const { data } = response;
      limpiarFormulario();
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("se intento crear el usuario");
    }
  };

  return (
    <Contenedor>
      <Titulo>
        <h2>Registrar cuenta</h2>
      </Titulo>
      <Formulario>
        <Inputs>
          <div style={{ width: "100%" }}>
            <Dropdown
              style={{ width: "100%" }}
              id="rol"
              options={rolOptions}
              onChange={handleChange}
              placeholder="Seleccionar Rol"
              name="rol"
              value={formulario.rol}
            />
          </div>
        </Inputs>
        <div style={{ display: "flex", gap: "1rem" }}>
          <ContenedorImg>
            <ImagenPreview>
              {formulario.imagen == "" ? <SpanImagen className="pi pi-camera" /> : <ImagenImagen src={formulario.imagen} />}
            </ImagenPreview>
            {imagen && (
              <div style={{ marginTop: "10px" }}>
                <img src={URL.createObjectURL(imagen)} alt="Vista previa de la foto de perfil" />
              </div>
            )}
            <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} auto chooseLabel="Seleccionar" onSelect={handleFileChange} />
          </ContenedorImg>
          <ContenedorCampos>
            <InputRow>
              <Campos>
                <label htmlFor="rut">Rut</label>
                <InputContainer name="rut" value={formulario.rut} handleChange={handleChange} />
              </Campos>
              <Campos>
                <label htmlFor="nombre">Nombre</label>
                <InputContainer name="nombre" value={formulario.nombre} handleChange={handleChange} />
              </Campos>
            </InputRow>
            <InputRow>
              <Campos>
                <label htmlFor="apellido">Apellido</label>
                <InputContainer name="apellido" value={formulario.apellido} handleChange={handleChange} />
              </Campos>
              <Campos>
                <label htmlFor="correo">Correo</label>
                <InputContainer name="correo" value={formulario.correo} handleChange={handleChange} />
              </Campos>
            </InputRow>
            <InputRow>
              <Campos>
                <label htmlFor="contrasena">Contraseña</label>
                <InputContainer name="contrasena" value={formulario.contrasena} type={"password"} handleChange={handleChange} />
              </Campos>
              <Campos>
                <label htmlFor="correo">Repetir contraseña</label>
                <InputContainer name="repetir" value={formulario.repetir} type={"password"} handleChange={handleChange} />
              </Campos>
            </InputRow>
            <Opciones>
              <Button label="Registrar" severity="success" rounded onClick={crearUsuario} />
              <Button label="Limpiar" severity="danger" rounded onClick={limpiarFormulario} />
            </Opciones>
          </ContenedorCampos>
        </div>
      </Formulario>
    </Contenedor>
  );
};
