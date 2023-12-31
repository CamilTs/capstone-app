import { useEffect, useRef } from "react";
import { api } from "../../api/api";
import { useState } from "react";
import { Button } from "primereact/button";
import { useContextSocket } from "../../context/SocketContext";
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { formatoHora } from "../../components/Formatos";
import { CustomList } from "./components/CustomList";
import { MensajesPanel } from "./components/MensajesPanel";
import { ContenedorChat, ContenedorDatosUsuario, ContenedorHeaderChat, OverlayButton, StyledOverlayPanel } from "./components/SyledMensajes";

export const Comunicarse = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [receptorID, setReceptorID] = useState(null);
  const [favoritos, setFavoritos] = useState({});
  const { socket } = useContextSocket();
  const { id, rol } = useSelector((state) => state.auth);
  const op = useRef(null);
  const toast = useRef(null);

  const estructuraChat = {
    emisorID: id,
    mensaje: "",
    enviadoPorEmisor: true,
    chatID: "",
  };
  const [chat, setChat] = useState(estructuraChat);

  const traerUsuarios = async (rol) => {
    try {
      let response = await api.get(`rol/chat`);
      const { data } = response;
      console.log(data.data);
      const usuariosConEstadoFavorito = data.data.map((usuario) => {
        const chatID = [id, usuario._id].sort().join("-");
        return {
          ...usuario,
          favorito: usuario.favorito,
          chatID,
        };
      });
      usuariosConEstadoFavorito.sort((a, b) => (b.favorito === true ? 1 : -1));
      setUsuarios(usuariosConEstadoFavorito);
    } catch (error) {
      console.log("Error al traer los usuarios", error);
    }
  };

  const seleccionarUsuario = (usuario) => {
    setReceptorID(usuario);
  };

  const marcarComoFavorito = async (chatID, favorito, nombreUsuario) => {
    try {
      const response = await api.put(`chat/${chatID}/favorito`, { favorito });
      const { data } = response;
      console.log(data.data);
      if (data.data.favorito === true) {
        toast.current.show({
          severity: "info",
          summary: "Exito",
          detail: `Chat con ${nombreUsuario} marcado como favorito`,
          life: 2000,
        });
      } else {
        toast.current.show({
          severity: "warn",
          summary: "Exito",
          detail: `Chat con ${nombreUsuario} desmarcado como favorito`,
          life: 2000,
        });
      }
      setFavoritos((prevFavoritos) => ({ ...prevFavoritos, [chatID]: data.data.favorito }));
    } catch (error) {
      console.log("Error al marcar como favorito", error);
      toast.current.show({
        style: { fontSize: "1rem" },
        severity: "warn",
        summary: "Advertencia",
        detail: "Debes al menos tener un mensaje para marcar como favorito",
        life: 2000,
      });
    }
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
      const nuevoMensaje = { emisorID, mensaje, enviadoPorEmisor, chatID: chatID, createdAt: new Date() };
      console.log(nuevoMensaje);
      try {
        const response = await api.post("chat", nuevoMensaje);
        const { data } = response;
        socket.emit("mensaje", nuevoMensaje);

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

      const newFavoritos = {};
      data.data.forEach((chat) => {
        newFavoritos[chat.chatID] = chat.favorito;
      });
      setFavoritos(newFavoritos);

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
    });

    // Guardar el socket en la referencia

    socket.on("mensaje", (nuevoMensaje) => {
      // Verifica si el mensaje ya se ha enviado
      if (!mensajes.some((mensaje) => mensaje.id === nuevoMensaje.id)) {
        // Emite el evento
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
            return [...prevMensajes, { chatID: nuevoMensaje.chatID, mensajes: [nuevoMensaje] }];
          }
        });
        setChat((prevChat) => ({ ...prevChat, mensaje: "" }));
      }
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });

    traerUsuarios(rol);
    traerMensajes();

    return () => {
      if (socket && socket.connected) {
        socket.disconnect();
        socket.off();
      }
    };
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <OverlayButton>
        <Button
          tooltip="Chat"
          tooltipOptions={{ position: "left", className: "font-bold" }}
          size="large"
          className="p-button-rounded p-button-outlined"
          raised
          icon="pi pi-comments text-white"
          onClick={(e) => {
            op.current.toggle(e);
          }}
        />
      </OverlayButton>

      <StyledOverlayPanel ref={op}>
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
          <CustomList
            usuarios={usuarios}
            onUsuarioSeleccionado={seleccionarUsuario}
            setChat={setChat}
            generateUniqueChatID={generateUniqueChatID}
            marcarComoFavorito={marcarComoFavorito}
            favoritos={favoritos}
          />
        )}
      </StyledOverlayPanel>
    </>
  );
};