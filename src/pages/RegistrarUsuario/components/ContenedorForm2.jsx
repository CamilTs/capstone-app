import { InputText } from "primereact/inputtext";
import styled from "styled-components";

const Inputs = styled.div`
  flex: 1;
  display: flex;
  flex-flow: ${({ direction }) =>
    direction ? `${direction} wrap` : "row wrap"};
  /* flex-flow: row wrap; */
  justify-content: center;
  align-items: ${({ direction }) => (direction == "column" ? `center` : null)};
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

export const ContenedorForm2 = ({ formData, handleChange }) => {
  return (
    <div>
      <Inputs>
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
    </div>
  );
};
