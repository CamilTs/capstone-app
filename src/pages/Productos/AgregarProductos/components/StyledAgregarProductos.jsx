import styled from "styled-components";

export const ContenedorAncho = styled.div`
  background-color: #fff;
  padding: 1rem 2rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 10px;

  @media (max-width: 1500px) {
    overflow-y: auto;
    border-radius: 10px;
  }
`;

export const Formulario = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ContenedorPrimario = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;

  @media (max-width: 950px) {
    flex-wrap: wrap;
    justify-content: center;
  }
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

  @media (max-width: 1600px) {
    width: 402px;
    height: 402px;
  }
  @media (max-width: 1360px) {
    width: 402px;
    height: 402px;
  }
  @media (max-width: 1024px) {
    width: 302px;
    height: 302px;
  }
`;

export const ImagenImagen = styled.img`
  object-fit: contain;
  width: 500px;
  height: 500px;

  @media (max-width: 1600px) {
    width: 400px;
    height: 400px;
  }
  @media (max-width: 1360px) {
    width: 400px;
    height: 400px;
  }
  @media (max-width: 1024px) {
    width: 300px;
    height: 300px;
  }
`;

export const SpanImagen = styled.span`
  font-size: 80px;
  color: black;
`;

export const ContenedorCampos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Campos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ContenedorNumber = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1920px) {
    width: 100%;
  }
  @media (max-width: 1600px) {
    width: 100%;
  }
  @media (max-width: 1360px) {
    width: 80%;
  }
  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const Opciones = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  @media (max-width: 1600px) {
    width: 100%;
  }

  @media (max-width: 1360px) {
    width: 100%;
  }

  @media (max-width: 930px) {
    width: 100%;
    justify-content: center;
    gap: 0.5rem;
  }
`;

export const Titulo = styled.h2`
  font-size: 20px;
  display: flex;
  justify-content: center;
`;
