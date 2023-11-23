import React from "react";
import { MensajesChat, ContenedorEnvio, MensajePropio, MensajeOtro } from "./SyledMensajes";
import { InputContainer } from "../../../components/InputContainer";
import { Button } from "primereact/button";

export const MensajesPanel = ({ mensajesFiltrados, id, chat, setChat, enviarMensaje, formatoHora }) => {
  return (
    <>
      <div>
        <MensajesChat>
          <div style={{ width: "100%", height: "340px" }}>
            <div className="flex flex-column gap-3 w-full" id="mensaje-contenedor">
              {mensajesFiltrados.map((mensaje) =>
                Array.isArray(mensaje.mensajes)
                  ? mensaje.mensajes.map((m, index) => {
                      const esMensajePropio = m.emisorID === id;
                      const MensajeComponente = esMensajePropio ? MensajePropio : MensajeOtro;
                      return (
                        <MensajeComponente key={`${m._id}-${index}`}>
                          <div className={`p-2 w-full ${esMensajePropio ? "ml-auto" : "mr-auto"}`}>
                            <div className="text-left">{m.mensaje}</div>
                            <div className="text-right text-xs text-black-500">{formatoHora(m.createdAt)}</div>
                          </div>
                        </MensajeComponente>
                      );
                    })
                  : null
              )}
            </div>
          </div>
        </MensajesChat>
      </div>
      <ContenedorEnvio>
        <div className="p-inputgroup">
          <InputContainer
            className="border-radius-0 p-inputtext-sm w-full"
            type="text"
            id="mensaje"
            placeholder="Ingresa tu mensaje"
            value={chat.mensaje}
            onChange={(e) => setChat({ ...chat, mensaje: e.target.value })}
          />
          <Button className="p-button-info" size="small" raised icon="pi pi-arrow-right" onClick={enviarMensaje} type="submit" />
        </div>
      </ContenedorEnvio>
    </>
  );
};
