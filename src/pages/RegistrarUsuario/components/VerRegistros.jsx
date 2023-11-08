import React, { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { Contenedor } from "./StyledComponents";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export const VerRegistros = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [Loading, setLoading] = useState(false);

  const traerUsuarios = async () => {
    setLoading(true);
    try {
      const response = await api.get("rol/cliente");
      const { data } = response;
      console.log(data);
      setUsuarios(data.data);
    } catch (error) {
      console.log(error);
      console.log("Error al traer los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    traerUsuarios();
  }, []);

  return (
    <Contenedor>
      <div>
        <DataTable
          value={usuarios}
          size="small"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 15]}
          scrollable
          scrollHeight="500px"
          loading={Loading}
        >
          <Column field="nombre" header="Nombre" />
          <Column field="rut" header="Rut" />
          <Column field="correo" header="Correo" />
          <Column field="rol" header="Rol" />
        </DataTable>
      </div>
      {/* <div>
        <DataTable size="small" paginator rows={5} rowsPerPageOptions={[5, 10, 15]} scrollable scrollHeight="500px">
          <Column field="nombre" header="Nombre" />
          <Column field="direccion" header="Dirección" />
          <Column field="propietario" header="Propietario" />
          <Column field="telefono" header="Teléfono" />
        </DataTable>
      </div> */}
    </Contenedor>
  );
};
