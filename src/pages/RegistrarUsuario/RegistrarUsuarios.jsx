import { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputContainer } from "./components/InputContainer";
import { Formulario, InputRow, Inputs } from "./components/StyledComponents";
import { TabView, TabPanel } from "primereact/tabview";
import { Prueba1 } from "./components/Prueba1";
import { Prueba2 } from "./components/Prueba2";
import { Prueba3 } from "./components/Prueba3";
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
    <>
      <TabView>
        <TabPanel header="panel1">
          <Prueba1 />
        </TabPanel>
        <TabPanel header="panel2">
          <Prueba2 />
        </TabPanel>
        <TabPanel header="panel3">
          <Prueba3 />
        </TabPanel>
      </TabView>
    </>
  );
};
