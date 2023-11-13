/* eslint-disable react-hooks/exhaustive-deps */
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { TablaProductos } from "../../components/TablaProductos";
export const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [rutSeleccionado, setRutSeleccionado] = useState(null);

  const cargarClientes = async () => {
    try {
      const { data } = await api.get("rol/cliente");
      if (!data.success) {
        setClientes([]);
      }
      setClientes(data.data);
    } catch (error) {
      setClientes([]);
    }
  };

  const cargarProductos = async () => {
    try {
      if (rutSeleccionado.comercio == null) {
        console.log("NO tiene comercio");
      }

      const { data } = await api.get(`comercio/productos/${rutSeleccionado.comercio._id}`);
      if (!data.success) {
        setProductos([]);
      }
      setProductos(data.data.productos);
    } catch (error) {
      setProductos([]);
    }
  };

  useEffect(() => {
    if (rutSeleccionado != {}) {
      cargarProductos();
    }
  }, [rutSeleccionado]);
  useEffect(() => {
    cargarClientes();
  }, []);
  return (
    <div className="grid">
      <Panel header="Información" className="col-10 col-offset-1">
        <div className="grid">
          <div className="col-4">
            <Dropdown
              value={rutSeleccionado}
              onChange={(e) => setRutSeleccionado(e.value)}
              options={clientes}
              optionLabel="rut"
              placeholder="Seleccione un usuario"
              filter
              className="w-full"
            />
          </div>
          <div className="col-8 flex justify-content-around align-items-center">
            <span>
              <b>RUT:</b> {rutSeleccionado ? rutSeleccionado.rut : "Esperando información"}
            </span>
            <span>
              <b>COMERCIO:</b> {rutSeleccionado && rutSeleccionado.comercio ? rutSeleccionado.comercio.nombre : "Esperando información"}
            </span>
            <span>
              <b>NOMBRE:</b>{" "}
              {rutSeleccionado && rutSeleccionado.nombre && rutSeleccionado.apellido
                ? `${rutSeleccionado.nombre} ${rutSeleccionado.apellido}`
                : "Esperando Información"}
            </span>
          </div>
        </div>
      </Panel>

      <div className="col-12">
        <TablaProductos productos={productos} />
      </div>
    </div>
  );
};
