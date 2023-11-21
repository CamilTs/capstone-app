import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { api } from "../../../api/api";
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { OverlayPanel } from "primereact/overlaypanel";
import { Card } from "primereact/card";

export const VerTickets = () => {
  const { id } = useSelector((state) => state.auth);
  const [tickets, setTickets] = useState([]);
  const [ticketSeleccionado, setTicketSeleccionado] = useState(null);
  const [Loading, setLoading] = useState(false);
  const toast = useRef(null);
  const op = useRef(null);

  const traerTickets = async () => {
    setLoading(true);
    try {
      const response = await api.get(`tickets/${id}`);
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
    }
  };

  const mostrarTicket = (e, ticket) => {
    setTicketSeleccionado(ticket);
    op.current.toggle(e);
  };

  useEffect(() => {
    traerTickets();
  }, []);

  return (
    <div>
      <DataTable value={tickets} loading={Loading}>
        <Toast ref={toast} />
        <Column header="Asunto" field="asunto" />
        <Column
          header="Estado"
          field="estado"
          body={(rowData) => {
            return rowData.estado ? "Enviado" : "Respondido";
          }}
        />
        <Column
          header="Ver"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          body={(rowData) => {
            return (
              <>
                <Button severity="warning" onClick={(e) => mostrarTicket(e, rowData)} rounded icon="pi pi-eye" />
              </>
            );
          }}
        />
      </DataTable>
      <OverlayPanel ref={op}>
        {ticketSeleccionado && (
          <Card title={ticketSeleccionado.asunto}>
            <p>{ticketSeleccionado.descripcion}</p>
          </Card>
        )}
      </OverlayPanel>
    </div>
  );
};
