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
        <ContenedorUsuario key={usuario._id} className="border-round-2xl" onClick={() => seleccionarUsuario(usuario)}>
          <div className="flex align-items-center gap-2 cursor-pointer">
            <div className="border-circle overflow-hidden h-3rem">
              <img src={usuario.imagen} alt={usuario.nombre} width="50px" height="50px" />
            </div>
            <span className="font-bold text-md text-white">
              {usuario.nombre} ({usuario.rol})
            </span>
          </div>
        </ContenedorUsuario>
      ))}
    </ContenedorUsuarios>
  );
};
