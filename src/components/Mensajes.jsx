import React, { useEffect, useRef } from "react";
import { api } from "../api/api";
import { useState } from "react";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import { OverlayPanel } from "primereact/overlaypanel";
import { io } from "socket.io-client";
import { TabPanel, TabView } from "primereact/tabview";
import { Card } from "primereact/card";

export const Comunicarse = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [seleccionarUsuario, setSeleccionarUsuario] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const op = useRef(null);
  const socket = useRef(null);

  const traerProveedores = async () => {
    try {
      const response = await api.get("rol/proveedor");
      const { data } = response;
      console.log(data);
      setUsuarios(data.data);
    } catch (error) {
      console.log(error);
      console.log("Error al traer los usuarios", error);
    }
  };

  const canales = [
    { nombre: "Proveedores", id: 1 },
    { nombre: "Administrador", id: 2 },
  ];

  const enviarMensaje = () => {
    if (socket && seleccionarUsuario && mensaje) {
      socket.current.emit("enviarMensaje", { destinatario: seleccionarUsuario, mensaje });
      setMensajes([...mensajes, { emisor: "yo", destinatario: seleccionarUsuario, contenido: mensaje }]);
      setMensaje("");
    }
  };

  const recibirMensaje = () => {
    if (socket) {
      socket.current.on("recibirMensaje", (data) => {
        setMensajes([...mensajes, data]);
      });
    }
  };

  useEffect(() => {
    socket.current = io("http://localhost:81");
    recibirMensaje();
  }, []);
  return (
    <>
      <div className="absolute bottom-0 right-0 border-round font-bold m-2">
        <Button raised rounded icon="pi pi-comments" onClick={(e) => op.current.toggle(e)} />
      </div>

      <OverlayPanel ref={op}>
        <div className="flex flex-column w-18rem h-25rem ">
          <TabView style={{ padding: "0" }}>
            <TabPanel header="Enviar" className="flex flex-column gap-1">
              <ListBox
                value={seleccionarUsuario}
                onChange={(e) => setSeleccionarUsuario(e.value)}
                options={canales}
                optionLabel="nombre"
                className="w-full md:w-full flex flex-column gap-1"
              />
              <div className="flex flex-row gap-1 p-1">
                <input
                  type="text"
                  className="md:w-full"
                  placeholder="Escribe un mensaje..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />
                <Button label="Enviar" className="md:w-full" onClick={enviarMensaje} />
              </div>
            </TabPanel>
            <TabPanel header="Recibir">
              <Card>
                {mensajes
                  .filter((msg) => msg.destinatario === seleccionarUsuario || msg.emisor === seleccionarUsuario)
                  .map((mensaje, index) => (
                    <li key={index}>
                      <strong>{mensaje.emisor}: </strong>
                      {mensaje.contenido}
                    </li>
                  ))}
              </Card>
            </TabPanel>
          </TabView>
        </div>
      </OverlayPanel>
    </>
  );
};
