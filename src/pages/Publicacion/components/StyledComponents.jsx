import styled from "styled-components";

export const Titulo = styled.h2`
  font-size: 25px;
  display: flex;
  justify-content: center;
`;

export const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  padding: 1rem 2rem 1rem 2rem;

  @media (max-width: 920px) {
    overflow-y: scroll;
  }
`;

export const Formulario = styled.form`
  display: flex;
  gap: 1rem;

  @media (max-width: 920px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const Campos = styled.div`
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
  @media (max-width: 1024px) {
    width: 282px;
    height: 282px;
  }
  @media (max-width: 920px) {
    width: 302px;
    height: 302px;
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
  @media (max-width: 1024px) {
    width: 280px;
    height: 280px;
  }
  @media (max-width: 920px) {
    width: 300px;
    height: 300px;
  }
`;

export const SpanImagen = styled.span`
  font-size: 50px;
  color: black;
`;

export const ContenedorCampos = styled.div`
  width: 100%;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

export const ContenedorBotones = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  width: 100%;
`;

// Mis Publicados estilos //

export const ContenedorMP = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ContenedorTabla = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 2rem 1rem 2rem;
`;
