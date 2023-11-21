import React, { useEffect, useRef } from "react";
import { api } from "../../api/api";
import { useState } from "react";
import { Button } from "primereact/button";
import { useContextSocket } from "../../context/SocketContext";
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { formatoHora } from "../../components/FormatoDinero";
import { CustomList } from "./components/CustomList";
import { MensajesPanel } from "./components/MensajesPanel";
import { ContenedorChat, ContenedorDatosUsuario, ContenedorHeaderChat, OverlayButton, StyledOverlayPanel } from "./components/SyledMensajes";

export const Comunicarse = () => {
  const [usuario, setUsuario] = useState({}); // Usuario logueado [id, nombre, rol, imagen]
  const [usuarios, setUsuarios] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [receptorID, setReceptorID] = useState(null);
  const { socket } = useContextSocket();
  const { id, rol } = useSelector((state) => state.auth);
  const op = useRef(null);
  const socketRef = useRef(null);
  const toast = useRef(null);

  const estructuraChat = {
    emisorID: id,
    mensaje: "",
    enviadoPorEmisor: true,
    chatID: "",
  };
  const [chat, setChat] = useState(estructuraChat);

  const traerUsuario = async () => {
    try {
      const response = await api.get(`usuario/${id}`);
      const usuarioData = response.data.data;
      console.log("Usuario conectado", usuarioData._id, true);
      setUsuario(usuarioData);
    } catch (error) {
      console.log("Error al obtener el usuario", error);
    }
  };

  const traerUsuarios = async (rol) => {
    try {
      let response = await api.get(`rol/chat`);
      const { data } = response;
      setUsuarios(data.data);
    } catch (error) {
      console.log("Error al traer los usuarios", error);
    }
  };

  const seleccionarUsuario = (usuario) => {
    setReceptorID(usuario);
    socketRef.current.emit("seleccionarUsuario", { selectedUserId: usuario._id });
  };

  const generateUniqueChatID = (receptorID) => {
    if (receptorID) {
      const sortedIds = [id, receptorID].sort();
      return `${sortedIds[0]}-${sortedIds[1]}`;
    }
    return null;
  };

  const enviarMensaje = async () => {
    const chatID = receptorID ? generateUniqueChatID(receptorID._id) : null;
    const { emisorID, mensaje, enviadoPorEmisor } = chat;
    console.log(chat);
    if (chatID) {
      const nuevoMensaje = { emisorID, mensaje, enviadoPorEmisor, chatID: chatID };
      console.log(nuevoMensaje);
      try {
        const response = await api.post("chat", nuevoMensaje);
        const { data } = response;
        socketRef.current.emit("mensaje", nuevoMensaje);
        console.log("Mensaje enviado", data.data);
        setChat((prevChat) => ({ ...prevChat, mensaje: "" }));
      } catch (error) {
        console.log("Error al guardar el mensaje", error);
      }
    }
  };

  const traerMensajes = async () => {
    try {
      const response = await api.get(`chat/buscarTodos/${id}`);
      const { data } = response;
      console.log(data);
      setMensajes(data.data);
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "info",
        summary: "Vacio",
        detail: "¡Sin mensajes!",
        life: 2000,
      });
    }
  };

  const renderMensajes = () => {
    const mensajesFiltrados = mensajes.filter((mensaje) => {
      return mensaje.chatID === chat.chatID;
    });

    return (
      <MensajesPanel
        mensajesFiltrados={mensajesFiltrados}
        id={id}
        chat={chat}
        setChat={setChat}
        enviarMensaje={enviarMensaje}
        formatoHora={formatoHora}
      />
    );
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Cliente conectado");
    });

    traerUsuario();
    traerUsuarios(rol);
    traerMensajes();

    socket.on("mensaje", (nuevoMensaje) => {
      console.log("Mensaje recibido en el cliente:", nuevoMensaje);
      setMensajes((prevMensajes) => {
        const chatExistente = prevMensajes.find((chat) => chat.chatID === nuevoMensaje.chatID);
        if (chatExistente) {
          return prevMensajes.map((chat) => {
            if (chat.chatID === nuevoMensaje.chatID) {
              return { ...chat, mensajes: [...chat.mensajes, nuevoMensaje] };
            } else {
              return chat;
            }
          });
        } else {
          // Si el chat no existe, creamos un nuevo chat con el nuevo mensaje
          return [...prevMensajes, { chatID: nuevoMensaje.chatID, mensajes: [nuevoMensaje] }];
        }
      });
      setChat((prevChat) => ({ ...prevChat, mensaje: "" }));
    });

    // Guardar el socket en la referencia
    socketRef.current = socket;

    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });

    return () => {
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.disconnect();
      }
    };
  }, [rol]);

  return (
    <>
      <Toast ref={toast} />
      <OverlayButton>
        <Button
          tooltip="Chat"
          tooltipOptions={{ position: "left", className: "font-bold" }}
          size="large"
          className="p-button-rounded p-button-outlined p-button-secondary"
          raised
          icon="pi pi-comments text-white"
          onClick={(e) => {
            op.current.toggle(e);
          }}
        />
      </OverlayButton>

      <StyledOverlayPanel ref={op} className="my-overlay-panel">
        {chat.chatID ? (
          <ContenedorChat>
            <ContenedorHeaderChat>
              <Button
                className="p-button-text text-white"
                onClick={() => {
                  setChat(estructuraChat);
                  setReceptorID();
                }}
                icon="pi pi-arrow-left"
              />
              <ContenedorDatosUsuario>
                <div>
                  <img src={receptorID && receptorID.imagen} width="50px" height="50px" />
                </div>
                <span>{receptorID.nombre}</span>
              </ContenedorDatosUsuario>
            </ContenedorHeaderChat>
            <div>{renderMensajes()}</div>
          </ContenedorChat>
        ) : (
          <CustomList usuarios={usuarios} onUsuarioSeleccionado={seleccionarUsuario} setChat={setChat} generateUniqueChatID={generateUniqueChatID} />
        )}
      </StyledOverlayPanel>
    </>
  );
};
