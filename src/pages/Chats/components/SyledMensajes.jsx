import { OverlayPanel } from "primereact/overlaypanel";
import styled from "styled-components";
import { InputContainer } from "../../../components/InputContainer";

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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
`;

export const ContenedorUsuarios = styled.div`
  display: flex;
  flex-direction: column;
  height: 30rem;
  gap: 0.5rem;
  background-color: #036475;
  border-radius: 0.5rem;
  border: 3px solid #024955;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
`;

export const ContenedorUsuario = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  cursor: pointer;
  align-items: center;
  transition: all 0.2s ease-in-out;
  padding: 0.4rem;
  &:active {
    transform: scale(0.9);
  }
  &:hover {
    background-color: #024955;
  }
`;

export const ContenedorChat = styled.div`
  display: flex;
  flex-direction: column;
  height: 30rem;
  background-color: #036475;
  border-radius: 0.5rem;
  border: 3px solid #024955;
`;

export const ContenedorHeaderChat = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  background-color: #036475;
  color: #fff;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border-bottom: 3px solid #024955;
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

export const ContenedorMensajes = styled.div`
  display: flex;
  flex-direction: column;
  background-color: gray;
`;

export const MensajesChat = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.4rem;
  overflow-y: scroll;
  background-color: #ffffff5c;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
`;

export const MensajePropio = styled.div`
  display: flex;
  margin-bottom: 0.8rem;
  min-width: 25%;
  max-width: 80%;
  align-items: flex-end;
  margin-left: auto;
  margin-right: 0;
  background-color: #c72568;
  color: #fff;
  border-radius: 0.5rem;
  font-size: 0.8rem;
`;

export const MensajeOtro = styled(MensajePropio)`
  align-items: flex-start;
  margin-left: 0;
  margin-right: auto;
  background-color: #e5e7eb;
  color: #000;
`;

export const ContenedorEnvio = styled.div`
  display: flex;
  align-items: center;
  height: 3.4rem;
  gap: 0.5rem;
  background-color: #036475;
  border-top: 3px solid #024955;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  padding: 0.3rem;
`;

export const MensajeInput = styled(InputContainer)`
  &.asunto {
    border-radius: 5rem !important;
    background-color: #f2f2f2 !important;
    border: none !important;
    &:hover {
      background-color: #e6e6e6 !important;
    }
  }
`;
