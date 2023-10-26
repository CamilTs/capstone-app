import styled from "styled-components";

// Estilos para card productos //
export const CardProductos = styled.div`
  background-color: #538a95;
  box-shadow: 0px 0px 10px 0px rgb(0, 0, 0, 0.5);
  width: 300px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Imagen = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
  background-color: white;
`;

export const TituloCard = styled.h2`
  background: white;
  border-radius: 5px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 70%;
  text-align: center;
  box-shadow: 0px 0px 5px 0px rgb(0, 0, 0, 0.5);
`;

export const NombreContenedor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Estilos para la pagina principal //
export const Contenedor = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

export const ContenedorCard = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  height: 100%;

  @media (max-width: 1100px) {
    overflow-y: auto;
    overflow-x: hidden;
    flex-wrap: wrap;
  }
`;

export const TituloPrincipal = styled.h1`
  font-size: 25px;
`;

export const TituloTabla = styled.h2`
  font-size: 20px;
`;

export const ContenedorMovimientos = styled.div`
  display: flex;
  width: 100%;
`;

export const ContenedorTabla = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
