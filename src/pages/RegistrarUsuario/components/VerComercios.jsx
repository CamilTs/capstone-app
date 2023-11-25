import React, { useEffect, useRef, useState } from "react";
import { api } from "../../../api/api";
import { Contenedor } from "./StyledComponents";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { formatoTelefono } from "../../../components/Formatos";
import { CustomConfirmDialog } from "../../../components/CustomConfirmDialog";

export const VerComercios = ({ editarComercio, nombreCliente }) => {
  const [comercios, setComercios] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [verEliminar, setVerEliminar] = useState(false);
  const [comercioEliminar, setComercioEliminar] = useState(null);
  const [comercioID, setComercioID] = useState(null);
  const toast = useRef(null);

  const traerComercios = async () => {
    setLoading(true);
    try {
      const response = await api.get("comercio");
      const { data } = response;
      console.log(data);
      setComercios(data.data);
    } catch (error) {
      console.log(error);
      console.log("Error al traer los comercios");
    } finally {
      setLoading(false);
    }
  };

  const seleccionarComercioEliminar = async (comercioID) => {
    setComercioID(comercioID);
    setComercioEliminar(comercioID);
    setVerEliminar(true);
  };

  const eliminarComercio = async () => {
    setLoading(true);
    try {
      const response = await api.delete(`comercio/${comercioID}`);
      const { data } = response;
      toast.current.show({
        severity: "info",
        summary: "Éxito",
        detail: `Comercio eliminado`,
        life: 2000,
      });
      traerComercios();
      setVerEliminar(false);
    } catch (error) {
      console.log(error);
      console.log("Error al eliminar el comercio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    traerComercios();
  }, []);

  return (
    <Contenedor>
      <Toast ref={toast} />

      <div>
        <DataTable
          value={comercios}
          paginator
          showGridlines
          rows={5}
          rowsPerPageOptions={[5, 10, 15]}
          scrollable
          scrollHeight="500px"
          loading={Loading}
        >
          <Column field="nombre" header="Nombre" />
          <Column field="direccion" header="Dirección" />
          <Column field="telefono" header="Telefono" body={(e) => formatoTelefono(e.telefono)} />
          <Column
            field="propietario"
            header="Propietario"
            body={(rowData) => {
              const cliente = nombreCliente.find((cliente) => cliente.id === rowData.propietario);
              return cliente ? cliente.nombre : "No encontrado";
            }}
          />
          <Column
            header="Acciones"
            style={{ display: "flex", gap: "0.5rem" }}
            body={(rowData) => {
              return (
                <>
                  <Button severity="warning" outlined raised onClick={() => editarComercio(rowData)} rounded icon="pi pi-pencil" />
                  <Button severity="danger" outlined raised onClick={() => seleccionarComercioEliminar(rowData._id)} rounded icon="pi pi-trash" />
                </>
              );
            }}
          />
        </DataTable>
      </div>

      <CustomConfirmDialog
        visible={verEliminar}
        onHide={() => setVerEliminar()}
        onConfirm={eliminarComercio}
        message="¿Estás seguro de eliminar el comercio?"
        header="Eliminar"
      />
    </Contenedor>
  );
};
