/* eslint-disable react/prop-types */
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import styled from "styled-components";

const Container = styled.span`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const Input = styled(InputText)`
  width: 100%;
  height: 3rem !important;
  border-radius: 1rem !important;
  background-color: #f1f1f1 !important;
  border: none !important;

  &:hover {
    background-color: #e6e6e6 !important;
    border-color: #e6e6e6 !important;
  }
  &:focus {
    background-color: #f2f2f2 !important;
    border-color: #f2f2f2 !important;
    box-shadow: 0 0 0 0.2rem #e6e6e6 !important;
    transition: 0.3s ease-in-out !important;
  }

  &.inicio {
    width: 100%;
    height: 3rem !important;
    background-color: #f1f1f1 !important;
    border-radius: 0.5rem !important;
    border-top-left-radius: 0rem !important;
    border-bottom-left-radius: 0rem !important;
  }
`;

const InputArea = styled(InputTextarea)`
  display: flex;
  width: 100%;
  align-self: center;
  align-items: center;
  height: 8rem !important;
  border: none !important;
  border-radius: 1rem !important;
  background-color: #f2f2f2 !important;

  &:hover {
    background-color: #e6e6e6 !important;
    border-color: #e6e6e6 !important;
  }
  &:focus {
    background-color: #f2f2f2 !important;
    border-color: #f2f2f2 !important;
    box-shadow: 0 0 0 0.2rem #e6e6e6 !important;
    transition: 0.3s ease-in-out !important;
  }
`;

export const InputDropdown = styled(Dropdown)`
  width: 100%;
  height: 3rem !important;
  border-radius: 1rem !important;
  background-color: #f1f1f1 !important;
  border: none !important;

  &:hover {
    background-color: #e6e6e6 !important;
    border-color: #e6e6e6 !important;
  }
  &:focus {
    background-color: #f2f2f2 !important;
    border-color: #f2f2f2 !important;
    box-shadow: 0 0 0 0.2rem #e6e6e6 !important;
    transition: 0.3s ease-in-out !important;
  }
`;

export const InputContainer = ({ value, name, onChange, type, placeholder, onBlur, maxlength, className, disabled, id }) => {
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
        id={id}
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

export const InputContainerTextArea = ({ value, name, onChange, placeholder, onBlur, maxlength, className, disabled, id }) => {
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
      <InputArea
        autoResize
        id={id}
        value={value}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        maxLength={maxlength}
        disabled={disabled}
        className={className}
      />
    </Container>
  );
};

export const InputContainerDropdown = ({
  value,
  name,
  onChange,
  options,
  placeholder,
  onBlur,
  className,
  disabled,
  id,
  optionLabel,
  optionValue,
}) => {
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
      <InputDropdown
        id={id}
        value={value}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        options={options}
        optionLabel={optionLabel}
        placeholder={placeholder}
        optionValue={optionValue}
        disabled={disabled}
        className={className}
      />
    </Container>
  );
};
