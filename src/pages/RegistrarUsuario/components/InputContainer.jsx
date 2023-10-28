/* eslint-disable react/prop-types */
import { InputText } from "primereact/inputtext";
import styled from "styled-components";

const Input = styled(InputText)`
  display: flex;
  width: 100%;
`;

const Container = styled.span`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

export const InputContainer = ({ value, name, handleChange, type, placeholder }) => {
  return (
    <Container>
      <Input value={value} name={name} onChange={handleChange} type={type ? type : "text"} placeholder={placeholder} />
    </Container>
  );
};
