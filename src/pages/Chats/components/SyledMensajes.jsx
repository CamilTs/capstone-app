import { OverlayPanel } from "primereact/overlaypanel";
import styled from "styled-components";

export const OverlayButton = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: auto;
  margin: 2rem;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.8s;
  background-color: #f1f1f1;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  transform: scale(1.2);
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  }
`;

export const StyledOverlayPanel = styled(OverlayPanel)`
  .p-overlaypanel-content {
    padding: 0rem !important;
  }
  border-radius: 1rem;
`;

export const ContenedorUsuarios = styled.div`
  height: 30rem;
  width: 30rem;

  .p-listbox {
    height: 100%;
    width: 100%;
    border-radius: 0.8em;
    background-color: #f1f1f1;
    border: 3px solid #024955;
    overflow-y: auto;
  }
  .p-listbox p.listbox-list .p-listbox-item {
    display: flex;
    width: 100%;
    flex-direction: row;
    border: 3px solid #024955;
    border-radius: 0.8em;
    border-bottom: 3px solid #024955;
    align-items: center;
  }
  .p-listbox-list-wrapper {
    background-color: #f1f1f1;
    display: flex;
    height: 100%;
    width: 100%;
    border: 3px solid #024955;
  }
  .p-listbox-list {
    background-color: #036475;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    width: 100%;
    overflow-y: auto;
  }
  .p-listbox-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #047f94;
  }
  .p-listbox .p-listbox-header {
    padding: 0.5rem;
    width: 100%;
    background-color: #036475;
    border-bottom: 3px solid #024955;
  }
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
  color: #fff;
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
