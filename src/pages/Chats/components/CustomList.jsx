import React, { useEffect, useRef, useState } from "react";
import { ContenedorUsuario, ContenedorUsuarios } from "./SyledMensajes";
import { Toast } from "primereact/toast";
import { InputContainer } from "../../../components/InputContainer";
import { useSelector } from "react-redux";

export const CustomList = ({ usuarios, marcarComoFavorito, onUsuarioSeleccionado, setChat, generateUniqueChatID, favoritos }) => {
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState(usuarios);
  const { id: emisorID } = useSelector((state) => state.auth);

export const CustomList = ({ usuarios, onUsuarioSeleccionado, setChat, generateUniqueChatID }) => {
  const seleccionarUsuario = (usuario) => {
    onUsuarioSeleccionado(usuario);
    const chatID = generateUniqueChatID(usuario._id);
    setChat((prevChat) => ({ ...prevChat, chatID }));
  };

  useEffect(() => {
    if (globalFilter) {
      const usuariosFiltrados = usuarios.filter((usuario) => {
        return usuario.nombre.toLowerCase().includes(globalFilter.toLowerCase());
      });
      setUsuariosFiltrados(usuariosFiltrados);
    } else {
      setUsuariosFiltrados(usuarios);
    }
  }, [globalFilter, usuarios]);

  return (
    <>
      <Toast ref={toast} />
      <ContenedorUsuarios>
        <InputContainer className="w-full" label="Buscar" placeholder="Buscar" onChange={(e) => setGlobalFilter(e.target.value)} />
        {usuariosFiltrados
          .sort((a, b) => {
            const chatIDA = [emisorID, a._id].sort().join("-");
            const chatIDB = [emisorID, b._id].sort().join("-");
            return (favoritos[chatIDB] ? 1 : 0) - (favoritos[chatIDA] ? 1 : 0);
          })
          .map((usuario) => {
            const receptorID = usuario._id;
            const chatID = [emisorID, receptorID].sort().join("-");
            return (
              { globalFilter: globalFilter },
              (
                <ContenedorUsuario key={usuario._id} className="border-round-2xl" onClick={() => seleccionarUsuario(usuario)}>
                  <div className="w-full flex justify-content-between cursor-pointer">
                    <div className="flex align-items-center gap-3">
                      <div className="border-circle overflow-hidden h-3rem">
                        <img src={usuario.imagen} alt={usuario.nombre} width="50px" height="50px" />
                      </div>
                      <span className="font-bold text-md text-white capitalize">
                        {usuario.nombre} ({usuario.rol})
                      </span>
                    </div>
                    <div className="flex flex-grow justify-content-end">
                      {chatID && (
                        <div
                          style={{
                            width: "2rem",
                            borderRadius: "50%",
                            backgroundColor: favoritos[chatID] ? "#ffff" : "#2E3A59",
                            cursor: "pointer",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            height: "2rem",
                            transition: "all 0.4s ease-in-out",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            marcarComoFavorito(chatID, !favoritos[chatID], usuario.nombre);
                          }}
                        >
                          {favoritos[chatID] ? <i className="pi pi-star-fill text-yellow-400" /> : <i className="pi pi-star text-white" />}
                        </div>
                      )}
                    </div>
                  </div>
                </ContenedorUsuario>
              )
            );
          })}
      </ContenedorUsuarios>
    </>
  );
};
