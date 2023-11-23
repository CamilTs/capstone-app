import React, { useEffect, useRef, useState } from "react";
import { api } from "../../../api/api";
import { Contenedor } from "./StyledComponents";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { formatoRut } from "../../../components/Formatos";

export const VerRegistros = ({ editarUsuario, cambiarPestania }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [Loading, setLoading] = useState(false);
  const toast = useRef(null);

  const traerUsuarios = async () => {
    setLoading(true);
    try {
      const response = await api.get("rol/gestion");
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

  const eliminarUsuario = async (id) => {
    setLoading(true);
    console.log(id);
    try {
      const response = await api.delete(`usuario/${id}`);
      const { data } = response;
      console.log(data);
      traerUsuarios();
    } catch (error) {
      console.log(error);
      console.log("Error al eliminar el usuario");
    } finally {
      setLoading(false);
    }
  };
  const confirmEliminar = (id) => {
    confirmDialog({
      message: "¿Seguro que desea eliminar este usuario?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: "Formulario Limpiado",
          life: 3000,
        });
        eliminarUsuario(id);
      },
      reject: () => {},
    });
  };
  // const editarUsuario = (usuario) => {
  //   editarUsuario({
  //     rut: usuario.rut,
  //     nombre: usuario.nombre,
  //     apellido: usuario.apellido,
  //     correo: usuario.correo,
  //     contrasena: usuario.contrasena,
  //     repetir: usuario.contrasena,
  //     imagen: usuario.imagen,
  //     rol: usuario.rol,
  //   });

  //   cambiarPestania(0);
  // };

  useEffect(() => {
    traerUsuarios();
  }, []);

  return (
    <Contenedor>
      <Toast ref={toast} />

      <div>
        <DataTable
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
            style={{ width: "10%" }}
            body={(rowData) => {
              return (
                <>
                  <Button severity="warning" onClick={() => editarUsuario(rowData)} rounded icon="pi pi-user-edit" />
                  <Button severity="danger" onClick={() => confirmEliminar(rowData._id)} rounded icon="pi pi-trash" />
                </>
              );
            }}
          />
        </DataTable>
      </div>
    </Contenedor>
  );
};
