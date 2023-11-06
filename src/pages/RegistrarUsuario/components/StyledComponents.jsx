import styled from "styled-components";

export const ContenedorMasivo = styled.div`
  height: 100%;

  @media (max-width: 978px) {
    overflow-y: scroll;
  }
`;

export const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  padding: 1rem;

  @media (max-width: 978px) {
  }
`;

export const Formulario = styled.form`
  display: flex;
  gap: 1rem;
  width: 100%;
  flex-direction: column;
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  @media (max-width: 978px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1rem;
`;

export const ContenedorCampos = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

export const Campos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ContenedorImg = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export const ImagenPreview = styled.div`
  border: 1px solid #999999bf;
  width: 502px;
  height: 502px;
  display: grid;
  justify-items: center;
  align-items: center;

  @media (max-width: 1920px) {
    width: 502px;
    height: 502px;
  }
  @media (max-width: 1600px) {
    width: 352px;
    height: 352px;
  }
  @media (max-width: 1360px) {
    width: 302px;
    height: 302px;
  }
  @media (max-width: 1026px) {
    width: 252px;
    height: 252px;
  }
`;

export const ImagenImagen = styled.img`
  object-fit: contain;
  width: 500px;
  height: 500px;

  @media (max-width: 1920px) {
    width: 500px;
    height: 500px;
  }
  @media (max-width: 1600px) {
    width: 350px;
    height: 350px;
  }
  @media (max-width: 1360px) {
    width: 300px;
    height: 300px;
  }
  @media (max-width: 1026px) {
    width: 250px;
    height: 250px;
  }
`;

export const SpanImagen = styled.span`
  font-size: 50px;
  color: black;
`;

export const Opciones = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  width: 100%;
`;
