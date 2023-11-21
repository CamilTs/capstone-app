import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { TicketEnviado } from "./components/TicketEnviado";
import { VerTickets } from "./components/VerTickets";

export const Tickets = () => {
  return (
    <TabView>
      <TabPanel rightIcon="pi pi-plus ml-2" header="Crear ticket">
        <TicketEnviado />
      </TabPanel>
      <TabPanel rightIcon="pi pi-search ml-2" header="Ver tickets">
        <VerTickets />
      </TabPanel>
    </TabView>
  );
};
