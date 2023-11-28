import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { TicketEnviado } from "./components/TicketEnviado";
import { VerTickets } from "./components/VerTickets";
import { Registros } from "./components/Registros";

export const Tickets = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ticketSeleccionado, setTicketSeleccionado] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [estado, setEstado] = useState("crear");

  const addClosedTicket = (ticket) => {
    setTickets((prevTickets) => [...prevTickets, ticket]);
  };

  const responderTicket = (ticket) => {
    setTicketSeleccionado(ticket);
    setEstado("responder");
    cambiarPestania(0);
  };

  const cambiarPestania = (pestaña) => {
    setActiveIndex(pestaña);
  };

  return (
    <TabView
      style={{ padding: "0" }}
      activeIndex={activeIndex}
      onTabChange={(e) => {
        setEstado("crear"), setActiveIndex(e.index);
      }}
    >
      <TabPanel rightIcon="pi pi-plus ml-2" header="Crear ticket">
        <TicketEnviado
          estado={estado}
          ticketSeleccionado={ticketSeleccionado}
          setTicketSeleccionado={setTicketSeleccionado}
          responderTicketUsuario={responderTicket}
        />
      </TabPanel>
      <TabPanel rightIcon="pi pi-search ml-2" header="Ver tickets">
        <VerTickets estado={estado} addClosedTicket={addClosedTicket} responderTicket={responderTicket} cambiarPestania={cambiarPestania} />
      </TabPanel>
      <TabPanel header="Registros">
        <Registros tickets={tickets} />
      </TabPanel>
    </TabView>
  );
};
