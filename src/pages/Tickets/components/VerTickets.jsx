import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { api } from "../../../api/api";
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { TablaRegistros } from "./StyledTickets";
import { Dialog } from "primereact/dialog";

export const VerTickets = ({ responderTicket, addClosedTicket }) => {
  const { id, rol } = useSelector((state) => state.auth);
  const [tickets, setTickets] = useState([]);
  const [ticketSeleccionado, setTicketSeleccionado] = useState({});
  const [Loading, setLoading] = useState(false);
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const toast = useRef(null);

  const traerTickets = async () => {
    setLoading(true);
    try {
      const path = rol === "admin" ? "tickets/true" : `tickets/${id}/true`;
      const response = await api.get(path);
      const { data } = response;
      console.log(data);
      setTickets(data.data);
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "info",
        summary: "Vacio",
        detail: "¡Sin tickets!",
        life: 2000,
      });
    } finally {
      setLoading(false);
      console.log(tickets);
    }
  };

  const estadosDeTicket = [
    { label: "Abierto", value: true },
    { label: "Cerrado", value: false },
  ];

  const ActualizarEstadoTicket = async (estado, ticketsID) => {
    try {
      const response = await api.put(`tickets/${ticketsID}`, {
        estado,
      });
      const { data } = response;
      console.log("Estado actualizado", data);
      {
        estado === false &&
          toast.current.show({
            severity: "info",
            summary: "Estado actualizado",
            detail: "Se ha cerrado el ticket correctamente",
            life: 2000,
          });
        addClosedTicket(data);
      }
      {
        estado === true &&
          toast.current.show({
            severity: "info",
            summary: "Estado actualizado",
            detail: "Se ha abierto el ticket correctamente",
            life: 2000,
          });
      }
      traerTickets();
    } catch (error) {
      console.log("Error al actualizar el estado", error);
    }
  };

  const mostrarTicket = (e, ticket) => {
    setTicketSeleccionado(ticket);
    setMensajeVisible(true);
  };

  const cerrarTicket = () => {
    setMensajeVisible(false);
    setTicketSeleccionado({});
  };

  useEffect(() => {
    traerTickets();
  }, []);

  return (
    <div>
      <Toast ref={toast} />
      <TablaRegistros emptyMessage="No hay tickets..." value={tickets} loading={Loading}>
        {rol === "admin" && <Column header="Ticket" field="ticketsID" />}
        <Column header="Asunto" field="asunto" />
        {rol === "admin" && (
          <Column
            header="Estado"
            field={(rowData) => {
              return rowData.estado ? "Abierto" : "Cerrado";
            }}
          />
        )}
        {rol !== "admin" && (
          <Column
            header="Estado"
            field="estado"
            body={(rowData) => {
              return (
                <Dropdown
                  value={rowData.estado}
                  options={estadosDeTicket}
                  onChange={(e) => {
                    ActualizarEstadoTicket(e.value, rowData._id);
                  }}
                  placeholder="Selecciona un estado"
                />
              );
            }}
          />
        )}
        <Column
          header="Ver"
          style={{ display: "flex", gap: "0.5rem" }}
          body={(rowData) => {
            return (
              <>
                <Button severity="warning" onClick={(e) => mostrarTicket(e, rowData)} outlined raised rounded icon="pi pi-comments" />
                {rol === "admin" && (
                  <Button
                    severity="success"
                    rounded
                    icon="pi pi-pencil"
                    outlined
                    raised
                    onClick={() => {
                      responderTicket(rowData);
                    }}
                  />
                )}
              </>
            );
          }}
        />
      </TablaRegistros>
      <Dialog visible={mensajeVisible} onHide={cerrarTicket}>
        {ticketSeleccionado && (
          <div className="flex flex-column w-full h-20rem gap-2 border-2 border-gray-200">
            <div className="flex h-4rem w-full border-gray-200 border-2">
              <h3>{ticketSeleccionado.asunto}</h3>
            </div>
            <div className="flex flex-row w-25rem">
              <p>{ticketSeleccionado.descripcion}</p>
            </div>
            {ticketSeleccionado.respuesta && (
              <div className="flex flex-row w-25rem gap-2">
                <p>{ticketSeleccionado.respuesta}</p>
                {ticketSeleccionado.archivo && (
                  <a href={ticketSeleccionado.archivo} download="archivo">
                    <Button icon="pi pi-download" severity="info" rounded raised outlined />
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </Dialog>
    </div>
  );
};
