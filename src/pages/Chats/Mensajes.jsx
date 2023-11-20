import React, { useEffect, useRef } from "react";
import { api } from "../../api/api";
import { useState } from "react";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import { ScrollPanel } from "primereact/scrollpanel";
import { useContextSocket } from "../../context/SocketContext";
import { useSelector } from "react-redux";
import { InputContainer } from "../../components/InputContainer";
import { Toast } from "primereact/toast";
import { formatoHora } from "../../components/FormatoDinero";
import {
  ContenedorChat,
  ContenedorDatosUsuario,
  ContenedorEnvio,
  ContenedorHeaderChat,
  ContenedorMensajes,
  ContenedorMensajesChat,
  MensajesChat,
  ContenedorUsuarios,
  Mensaje,
  OverlayButton,
  StyledOverlayPanel,
} from "./components/SyledMensajes";

export const Comunicarse = () => {
  const [usuario, setUsuario] = useState({}); // Usuario logueado [id, nombre, rol, imagen]
  const [usuarios, setUsuarios] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [receptorID, setReceptorID] = useState(null);
  const { socket } = useContextSocket();
  const { id, nombre, rol } = useSelector((state) => state.auth);
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
      let response;
      if (rol === "cliente") {
        response = await api.get("rol/proveedor");
      } else if (rol === "proveedor") {
        response = await api.get("rol/cliente");
      }
      const { data } = response;
      setUsuarios(data.data);
    } catch (error) {
      console.log("Error al traer los usuarios", error);
    }
  };

  const selecionarUsuario = (usuario) => {
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
      <ContenedorMensajes>
        <MensajesChat>
          <ScrollPanel style={{ width: "100%", height: "340px" }}>
            <div className="flex flex-column gap-3 w-full" id="mensaje-contenedor">
              {mensajesFiltrados.map((mensaje) =>
                Array.isArray(mensaje.mensajes)
                  ? mensaje.mensajes.map((m, index) => {
                      const esMensajePropio = m.emisorID === id;
                      // const nombreEmisor = m.emisorID === id ? nombre : receptorID.nombre;
                      return (
                        <Mensaje mensajePropio={esMensajePropio} key={`${m._id}-${index}`}>
                          <div className={`p-2 w-full ${esMensajePropio ? "ml-auto" : "mr-auto"}`}>
                            {/* <div className={`mb-3 text-left`}>{nombreEmisor}</div> */}
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
          size="large"
          tooltip="Chat"
          tooltipOptions={{ position: "left", className: "font-bold" }}
          className="p-button-info"
          raised
          rounded
          icon="pi pi-comments"
          onClick={(e) => {
            op.current.toggle(e);
          }}
        />
      </OverlayButton>

      <StyledOverlayPanel ref={op} className="my-overlay-panel">
        <ContenedorUsuarios>
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
              <ContenedorMensajesChat>{renderMensajes()}</ContenedorMensajesChat>
            </ContenedorChat>
          ) : (
            <ListBox
              filter
              filterPlaceholder="Buscar usuario"
              filterBy={"nombre" || "rol"}
              value={chat.chatID}
              emptyFilterMessage="No se encontraron usuarios"
              onChange={(e) => {
                selecionarUsuario(e.value);
                setChat({ ...chat, chatID: generateUniqueChatID(e.value._id) });
              }}
              options={usuarios}
              optionLabel={"nombre"}
              itemTemplate={(usuario) => (
                <ContenedorDatosUsuario>
                  <div>
                    <img src={usuario.imagen} alt={usuario.nombre} width="50px" height="50px" />
                  </div>
                  <span>{usuario.nombre}</span>
                  <span>({usuario.rol})</span>
                </ContenedorDatosUsuario>
              )}
              className="w-full md:w-full flex flex-column font-bold"
            />
          )}
        </ContenedorUsuarios>
      </StyledOverlayPanel>
    </>
  );
};
