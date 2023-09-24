/* eslint-disable react/prop-types */
import { InputText } from "primereact/inputtext";
import styled from "styled-components";

const Input = styled(InputText)`
  width: 100%;
`;

const Container = styled.span`
  width: 40%;
`;

export const InputContainer = ({ value, name, handleChange, label, type }) => {
  return (
    <Container className="p-float-label">
      <Input value={value} name={name} onChange={handleChange} type={type ? type : "text"} />
      <label htmlFor="username">{label}</label>
    </Container>
  );
};
