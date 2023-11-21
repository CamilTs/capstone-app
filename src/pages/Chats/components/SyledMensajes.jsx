import { OverlayPanel } from "primereact/overlaypanel";
import styled from "styled-components";

export const OverlayButton = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 1rem;
  z-index: 100;
  background-color: #689733;
  border: 2px solid #5c7e2a;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.4);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  }
`;

export const StyledOverlayPanel = styled(OverlayPanel)`
  .p-overlaypanel-content {
    padding: 0rem !important;
  }
  border-radius: 1rem;
  height: 30rem;
  width: 25rem;
`;

export const ContenedorUsuarios = styled.div`
  display: flex;
  flex-direction: column;
  height: 30rem;
  gap: 1rem;
  background-color: #036475;
  border-radius: 0.5rem;
  border: 3px solid #024955;
  padding: 0.4rem;
`;

export const ContenedorChat = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ContenedorHeaderChat = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  background-color: #036475;
  color: #fff;
  border-bottom: 3px solid #024955;
  border-radius: 0.5rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0.4rem;
`;

export const ContenedorDatosUsuario = styled.div`
  display: flex;
  gap: 1rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  align-items: center;
  justify-content: center;
  border-bottom-radius: 0rem;
  span {
    font-size: 1rem;
  }
  div {
    border-radius: 50%;
    overflow: hidden;
    width: 50px;
    height: 50px;
  }
`;

export const ContenedorMensajesChat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;

export const ContenedorMensajes = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #047f94;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.4rem;
  border: 4px solid #024955;
`;

export const MensajesChat = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  padding: 0.4rem;
  border-bottom-left-radius: 0.5rem;
`;

export const Mensaje = styled.div`
  display: flex;
  margin-bottom: 0.8rem;
  min-width: 25%;
  max-width: 80%;
  align-items: ${(props) => (props.mensajePropio ? "flex-end" : "flex-start")};
  margin-left: ${(props) => (props.mensajePropio ? "auto" : "0")};
  margin-right: ${(props) => (props.mensajePropio ? "0" : "auto")};
  background-color: ${(props) => (props.mensajePropio ? "#c72568" : "#e5e7eb")};
  color: ${(props) => (props.mensajePropio ? "#fff" : "#000")};
  border-radius: 0.5rem;
  font-size: 0.8rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
`;

export const ContenedorEnvio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: auto;
  background-color: #036475;
  border-bottom-left-radius: 0.5rem;
  border-top-right-radius: 0rem;
  border-bottom-right-radius: 0rem;
  border-top: 3px solid #024955;
  padding: 0.4rem;
`;
