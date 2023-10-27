import React, { useState } from "react";
import { InputContainer } from "./InputContainer";
import { Formulario, Opciones, Campos, ContenedorCampos, Contenedor, Inputs } from "./StyledComponents";
import { api } from "../../../api/api";
import { Button } from "primereact/button";

export const RegistrarComercio = () => {
  const estructuraFormulario = {
    nombre: "",
    direccion: "",
    propietario: "",
    telefono: "",
  };
  const [formulario, setFormulario] = useState(estructuraFormulario);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormulario({ ...formulario, [name]: value });
  };

  const limpiarFormulario = () => {
    setFormulario(estructuraFormulario);
  };

  const crearComercio = async () => {
    try {
      const response = await api.post("comercio", {
        ...formulario,
      });
      const { data } = response;
      limpiarFormulario();
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("Error al crear comercio");
    }
  };

  return (
    <Contenedor>
      <Formulario>
        <div>
          <Inputs>
            <Campos>
              <label htmlFor="nombre">Nombre</label>
              <InputContainer name="nombre" value={formulario.nombre} handleChange={onInputChange} />
            </Campos>
            <Campos>
              <label htmlFor="direccion">Dirrección</label>
              <InputContainer name="direccion" value={formulario.direccion} handleChange={onInputChange} />
            </Campos>
            <Campos>
              <label htmlFor="propietario">Propietario</label>
              <InputContainer name="propietario" value={formulario.propietario} handleChange={onInputChange} />
            </Campos>
            <Campos>
              <label htmlFor="telefono">Teléfono</label>
              <InputContainer name="telefono" value={formulario.telefono} handleChange={onInputChange} />
            </Campos>
            <Opciones>
              <Button label="Registrar" severity="success" rounded onClick={crearComercio} />
              <Button label="Limpiar" severity="danger" rounded onClick={limpiarFormulario} />
            </Opciones>
          </Inputs>
        </div>
      </Formulario>
    </Contenedor>
  );
};
