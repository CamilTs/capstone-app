import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { TicketEnviado } from "./components/TicketEnviado";
import { VerTickets } from "./components/VerTickets";
import { Registros } from "./components/Registros";
import { useSelector } from "react-redux";
import { ResponderTickets } from "./components/ResponderTickets";
import { ContenedorMasivo } from "./components/StyledTickets";

export const Tickets = () => {
  const { rol } = useSelector((state) => state.auth);
  const [activeIndex, setActiveIndex] = useState(rol === "admin" ? 1 : 0);
  const [ticketSeleccionado, setTicketSeleccionado] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [estado, setEstado] = useState("crear");

  const addClosedTicket = (ticket) => {
    setTickets((prevTickets) => [...prevTickets, ticket]);
  };

  const responderTicket = (ticket) => {
    setTicketSeleccionado(ticket);
    cambiarPestania(2);
  };

  const cambiarPestania = (pestaña) => {
    setActiveIndex(pestaña);
  };

  return (
    <ContenedorMasivo>
      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => {
          setEstado("crear"), setActiveIndex(e.index);
        }}
      >
        {rol !== "admin" && (
          <TabPanel rightIcon="pi pi-plus ml-2" header="Crear ticket">
            <TicketEnviado />
          </TabPanel>
        )}
        <TabPanel rightIcon="pi pi-search ml-2" header="Ver tickets">
          <VerTickets
            estado={estado}
            addClosedTicket={addClosedTicket}
            responderTicket={responderTicket}
            cambiarPestania={cambiarPestania}
            setTicketSeleccionado={setTicketSeleccionado}
          />
        </TabPanel>
        {rol === "admin" && (
          <TabPanel header="Responder" rightIcon="pi pi-pencil ml-2" onClick={() => setEstado("crear")}>
            <ResponderTickets
              ticketSeleccionado={ticketSeleccionado}
              setTicketSeleccionado={setTicketSeleccionado}
              responderTicketUsuario={responderTicket}
            />
          </TabPanel>
        )}
        <TabPanel header="Registros">
          <Registros tickets={tickets} />
        </TabPanel>
      </TabView>
    </ContenedorMasivo>
  );
};
