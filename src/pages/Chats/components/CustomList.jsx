import React from "react";
import { ContenedorUsuario, ContenedorUsuarios } from "./SyledMensajes";

export const CustomList = ({ usuarios, onUsuarioSeleccionado, setChat, generateUniqueChatID }) => {
  const seleccionarUsuario = (usuario) => {
    onUsuarioSeleccionado(usuario);
    const chatID = generateUniqueChatID(usuario._id);
    setChat((prevChat) => ({ ...prevChat, chatID }));
  };

  return (
    <ContenedorUsuarios>
      {usuarios.map((usuario) => (
        <div key={usuario._id} className="border-round-2xl" onClick={() => seleccionarUsuario(usuario)}>
          <ContenedorUsuario>
            <div className="border-circle overflow-hidden h-3rem">
              <img src={usuario.imagen} alt={usuario.nombre} width="50px" height="50px" />
            </div>
            <span className="font-bold text-md text-white capitalize">
              {usuario.nombre} ({usuario.rol})
            </span>
          </ContenedorUsuario>
        </div>
      ))}
    </ContenedorUsuarios>
  );
};
