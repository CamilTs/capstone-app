import React from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import { MensajesChat, Mensaje, ContenedorMensajes, ContenedorEnvio } from "./SyledMensajes";
import { InputContainer } from "../../../components/InputContainer";
import { Button } from "primereact/button";

export const MensajesPanel = ({ mensajesFiltrados, id, chat, setChat, enviarMensaje, formatoHora }) => {
  return (
    <ContenedorMensajes>
      <MensajesChat>
        <ScrollPanel style={{ width: "100%", height: "340px" }}>
          <div className="flex flex-column gap-3 w-full" id="mensaje-contenedor">
            {mensajesFiltrados.map((mensaje) =>
              Array.isArray(mensaje.mensajes)
                ? mensaje.mensajes.map((m, index) => {
                    const esMensajePropio = m.emisorID === id;
                    return (
                      <Mensaje mensajePropio={esMensajePropio} key={`${m._id}-${index}`}>
                        <div className={`p-2 w-full ${esMensajePropio ? "ml-auto" : "mr-auto"}`}>
                          <div className="text-left">{m.mensaje}</div>
                          <div className="text-right text-xs text-black-500">{formatoHora(m.createdAt)}</div>
                        </div>
                      </Mensaje>
                    );
                  })
                : null
            )}
          </div>
        </ScrollPanel>
      </MensajesChat>
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
    </ContenedorMensajes>
  );
};
