import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../../api/api";
import { Button } from "primereact/button";
import { ColorEstado, TablaRegistros } from "./StyledTickets";
import { CustomConfirmDialog } from "../../../components/CustomConfirmDialog";

export const Registros = () => {
  const { id, rol } = useSelector((state) => state.auth);
  const [Loading, setLoading] = useState(false);
  const [ticketsCerrados, setTicketsCerrados] = useState([]);
  const [ticketID, setTicketID] = useState("");
  const [verEliminar, setVerEliminar] = useState(false);
  const [verDesbloquear, setVerDesbloquear] = useState(false);
  const toast = useRef(null);

  const traerTickets = async () => {
    setLoading(true);
    try {
      const path = rol === "admin" ? "tickets/false" : `tickets/${id}/false`;
      const response = await api.get(path);
      const { data } = response;
      console.log(data);
      setTicketsCerrados(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "info",
        summary: "Vacio",
        detail: "¡Aun no has cerrado tickets!",
        life: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const borrarTicket = async (ticketID) => {
    setTicketID(ticketID);
    setVerEliminar(true);
  };

  const eliminarTicket = async () => {
    setLoading(true);
    try {
      const response = await api.delete(`tickets/${ticketID}`);
      const { data } = response;
      console.log(data);
      toast.current.show({
        severity: "info",
        summary: "Exito",
        detail: "Ticket eliminado",
        life: 2000,
      });
      traerTickets();
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo eliminar el ticket",
        life: 2000,
      });
    } finally {
      setVerEliminar(false);
      setLoading(false);
    }
  };

  const cambiarAbierto = async (ticketID) => {
    setTicketID(ticketID);
    setVerDesbloquear(true);
  };

  const abrirTicket = async () => {
    setLoading(true);
    try {
      const response = await api.put(`tickets/${ticketID}`, {
        estado: true,
      });
      const { data } = response;
      console.log("Estado actualizado", data);
      toast.current.show({
        severity: "info",
        summary: "Estado actualizado",
        detail: "Se ha abierto el ticket correctamente",
        life: 2000,
      });
      traerTickets();
    } catch (error) {
      console.log("Error al actualizar el estado", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo abrir el ticket",
        life: 2000,
      });
    } finally {
      setVerDesbloquear(false);
      setLoading(false);
    }
  };

  const estadoTemplate = (rowData) => {
    return <ColorEstado estado={rowData.estado}>{rowData.estado ? "Abierto" : "Cerrado"}</ColorEstado>;
  };

  useEffect(() => {
    traerTickets();
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <TablaRegistros loading={Loading} value={ticketsCerrados} emptyMessage="Sin registros...">
        <Column field="asunto" header="Asunto" />
        <Column field="descripcion" header="Descripcion" />
        <Column field="respuesta" header="Respuesta" />
        <Column field="estado" header="Estado" body={estadoTemplate} />
        <Column
          header="Acción"
          body={(rowData) => {
            return (
              <div className="flex gap-2">
                {rol !== "admin" ? (
                  <Button
                    icon="pi pi-download"
                    severity="info"
                    rounded
                    raised
                    outlined
                    onClick={() => {
                      const linkSource = `${rowData.archivo}`;
                      const downloadLink = document.createElement("a");
                      const fileName = "Registro";
                      downloadLink.href = linkSource;
                      downloadLink.download = fileName;
                      downloadLink.click();
                    }}
                    disabled={!rowData.archivo}
                  />
                ) : (
                  <>
                    <Button icon="pi pi-trash" severity="danger" rounded raised outlined onClick={() => borrarTicket(rowData._id)} />
                    <Button icon="pi pi-unlock" severity="warning" rounded raised outlined onClick={() => cambiarAbierto(rowData._id)} />
                  </>
                )}
              </div>
            );
          }}
        />
      </TablaRegistros>
      <CustomConfirmDialog
        visible={verEliminar}
        onHide={() => setVerEliminar()}
        onConfirm={eliminarTicket}
        message="¿Estás seguro de eliminar el ticket?"
        header="Eliminar"
      />
      <CustomConfirmDialog
        visible={verDesbloquear}
        onHide={() => setVerDesbloquear()}
        onConfirm={abrirTicket}
        message="¿Deseas volver abrir el ticket?"
        header="Abrir ticket"
      />
    </>
  );
};
