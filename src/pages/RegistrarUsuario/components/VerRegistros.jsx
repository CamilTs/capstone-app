import React, { useEffect, useRef, useState } from "react";
import { api } from "../../../api/api";
import { Contenedor } from "./StyledComponents";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { formatoRut } from "../../../components/Formatos";
import { CustomConfirmDialog } from "../../../components/CustomConfirmDialog";

export const VerRegistros = ({ editarUsuario, traerUsuarios, usuarios }) => {
  const [Loading, setLoading] = useState(false);
  const [verEliminar, setVerEliminar] = useState(false);
  const [usuarioEliminar, setUsuarioEliminar] = useState("");
  // const [usuarios, setUsuarios] = useState([]);
  const toast = useRef(null);

  const seleccionarUsuarioEliminar = async (usuarioID) => {
    setUsuarioEliminar(usuarioID);
    setVerEliminar(true);
  };

  const eliminarUsuario = async (id) => {
    setLoading(true);
    console.log(id);
    try {
      const response = await api.delete(`usuario/${id}`);
      const { data } = response;
      console.log(data);
      toast.current.show({
        severity: "success",
        summary: "Eliminado",
        detail: "Usuario eliminado",
        life: 2000,
      });
    } catch (error) {
      console.log(error);
      console.log("Error al eliminar el usuario");
    } finally {
      setLoading(false);
      setVerEliminar(false);
    }
  };

  // const traerUsuarios = async () => {
  //   try {
  //     const response = await api.get("rol/gestion");
  //     const { data } = response;
  //     console.log(data);
  //     setUsuarios(data.data);
  //   } catch (error) {
  //     console.log(error);
  //     console.log("Error al traer los usuarios");
  //   }
  // };

  useEffect(() => {
    traerUsuarios();
  }, []);

  return (
    <Contenedor>
      <Toast ref={toast} />

      <div>
        <DataTable
          emptyMessage="Esperando datos de usuarios..."
          value={usuarios}
          paginator
          showGridlines
          rows={5}
          rowsPerPageOptions={[5, 10, 15]}
          scrollable
          scrollHeight="500px"
          loading={Loading}
        >
          <Column field="nombre" header="Nombre" />
          <Column field="rut" header="Rut" body={(e) => formatoRut(e.rut)} />
          <Column field="correo" header="Correo" />
          <Column field="rol" header="Rol" />
          <Column
            header="Acciones"
            style={{ display: "flex", gap: "0.5rem" }}
            body={(rowData) => {
              return (
                <>
                  <Button severity="warning" outlined raised onClick={() => editarUsuario(rowData)} rounded icon="pi pi-user-edit" />
                  <Button severity="danger" outlined raised onClick={() => seleccionarUsuarioEliminar(rowData._id)} rounded icon="pi pi-trash" />
                </>
              );
            }}
          />
        </DataTable>
      </div>

      <CustomConfirmDialog
        visible={verEliminar}
        onHide={() => setVerEliminar()}
        onConfirm={eliminarUsuario}
        message="¿Estás seguro de eliminar al usuario?"
        header="Eliminar"
      />
    </Contenedor>
  );
};
