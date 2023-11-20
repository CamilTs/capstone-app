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

export const InputContainer = ({ value, name, onChange, type, placeholder, onBlur, maxlength, className, disabled }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <Container>
      <Input
        value={value}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type ? type : "text"}
        placeholder={placeholder}
        maxLength={maxlength}
        disabled={disabled}
        className={className}
      />
    </Container>
  );
};
