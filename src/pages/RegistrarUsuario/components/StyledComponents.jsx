import styled from "styled-components";

export const Formulario = styled.div`
  display: flex;
`;

export const Inputs = styled.div`
  flex: 1;
  display: flex;
  flex-flow: ${({ direction }) => (direction ? `${direction} wrap` : "row wrap")};
  /* flex-flow: row wrap; */
  justify-content: center;
  align-items: ${({ direction }) => (direction == "column" ? `center` : null)};
  gap: 20px;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;
