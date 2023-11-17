import React, { useEffect, useRef } from "react";
import { api } from "../api/api";
import { useState } from "react";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import { OverlayPanel } from "primereact/overlaypanel";
import { ScrollPanel } from "primereact/scrollpanel";
import { useContextSocket } from "../context/SocketContext";
import { useSelector } from "react-redux";
import { InputContainer } from "./InputContainer";
import { Toast } from "primereact/toast";

export const Comunicarse = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const { socket } = useContextSocket();
  const { id, nombre, rol } = useSelector((state) => state.auth);
  const op = useRef(null);
  const socketRef = useRef(null);
  const toast = useRef(null);

  const estructuraChat = {
    nombreEmisor: nombre,
    emisorID: id,
    receptorID: "",
    mensaje: "",
  };
  const [chat, setChat] = useState(estructuraChat);

  const traerUsuarios = async (rol) => {
    try {
      let response;
      if (rol === "cliente") {
        response = await api.get("rol/proveedor");
      } else if (rol === "proveedor") {
        response = await api.get("rol/cliente");
      }
      const { data } = response;
      console.log(data);
      setUsuarios(data.data);
    } catch (error) {
      console.log("Error al traer los usuarios", error);
    }
  };

  const enviarMensaje = async () => {
    const { nombreEmisor, emisorID, receptorID, mensaje } = chat;
    const nuevoMensaje = { nombreEmisor, emisorID, receptorID: receptorID._id, mensaje };
    try {
      const response = await api.post("chat", nuevoMensaje);
      const { data } = response;
      socketRef.current.emit("mensaje", nuevoMensaje);
      console.log("Mensaje enviado", data.data);
      setChat((prevChat) => ({ ...prevChat, mensaje: "" }));
    } catch (error) {
      console.log("Error al guardar el mensaje", error);
    }
  };

  const renderMensajes = () => {
    const mensajesFiltrados = mensajes.filter((mensaje) => {
      return mensaje.emisorID === chat.receptorID._id || mensaje.receptorID === chat.receptorID._id;
    });

    return (
      <div className="flex flex-column w-full gap-1 h-full">
        <div className="border-2 border-round h-full">
          <ScrollPanel style={{ width: "100%", height: "280px" }}>
            <div className="flex flex-column gap-2 p-2" id="mensaje-contenedor">
              {mensajesFiltrados.map((mensaje) => (
                <div key={mensaje.id} className={`p-2 ${mensaje.emisorID === chat.emisorID ? "text-right" : "text-left"}`}>
                  {`${mensaje.nombreEmisor}: ${mensaje.mensaje}`}
                </div>
              ))}
            </div>
          </ScrollPanel>
        </div>
        <div className="flex flex-column gap-1">
          <div className="border-1 border-round-sm flex flex-row w-full gap-1">
            <InputContainer
              className="md:w-full"
              type="text"
              id="mensaje"
              placeholder="Ingresa tu mensaje"
              value={chat.mensaje}
              onChange={(e) => setChat({ ...chat, mensaje: e.target.value })}
            />
            <Button className="w-2" icon="pi pi-arrow-right" onClick={enviarMensaje} />
          </div>
        </div>
      </div>
    );
  };

  const traerMensajes = async () => {
    try {
      const response = await api.get(`chat`);
      const { data } = response;
      console.log(data);
      setMensajes(data.data);
    } catch (error) {
      console.log(error);
      toast.current.show({ severity: "error", summary: "Vacio", detail: "Sin mensajes", life: 2000 });
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Cliente conectado");
    });

    traerUsuarios(rol);
    traerMensajes();

    socket.on("mensaje", (data) => {
      console.log("Mensaje recibido en el cliente:", data);
      setMensajes((prevMensajes) => [...prevMensajes, data]);
    });

    // Guardar el socket en la referencia
    socketRef.current = socket;

    return () => {
      // Desconectar el cliente cuando se desmonte el componente
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.disconnect();
      }
    };
  }, [rol]);

  return (
    <>
      <Toast ref={toast} />
      <div className="absolute bottom-0 right-0 border-round font-bold m-2">
        <Button raised rounded icon="pi pi-comments" onClick={(e) => op.current.toggle(e)} />
      </div>

      <OverlayPanel ref={op}>
        <div className="flex flex-column w-18rem h-25rem">
          {chat.receptorID ? (
            <div className="flex flex-column h-full gap-2">
              <div className="flex flex-row gap-2">
                <span onClick={() => setChat({ ...chat, receptorID: null })} style={{ cursor: "pointer" }}>
                  <Button icon="pi pi-arrow-left" rounded raised severity="secondary" size="small" />
                </span>
                <span className="font-bold flex flex-row align-items-center">Mensajes con {chat.receptorID.nombre}</span>
              </div>
              <div className="p-card-body h-full ">{renderMensajes()}</div>
            </div>
          ) : (
            <ListBox
              filter
              value={chat.receptorID}
              onChange={(e) => {
                setChat({ ...chat, receptorID: e.value });
              }}
              options={usuarios}
              optionLabel="nombre"
              className="w-full md:w-full flex flex-column font-bold"
            />
          )}
        </div>
      </OverlayPanel>
    </>
  );
};
