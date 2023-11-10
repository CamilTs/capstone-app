import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";

import { Badge } from "primereact/badge";
import { TablaVender } from "./components/TablaVender";
import { formatoCurrencyCLP } from "../../components/FormatoDinero";

export const VenderProducto = () => {
  const { comercio } = useSelector((state) => state.auth);

  const [registros, setRegistros] = useState([]);

  const cargarRegistros = async () => {
    try {
      const { data } = await api.get("registro/ultimosRegistros");
      console.log(data);
      if (!data.success) {
        setRegistros([]);
      }
      setRegistros(data.data);
    } catch (error) {
      setRegistros([]);
    }
  };
  useEffect(() => {
    cargarRegistros();
  }, []);

  return (
    <>
      <div className="grid h-full">
        <div className="col-12">
          <TablaVender comercio={comercio} cargarRegistros={cargarRegistros} />
        </div>
        <div className="col-12 grid">
          <div className="col-6">
            <DataTable value={registros} showGridlines scrollable>
              <Column
                field="tipo"
                header="Tipo"
                body={(e) => {
                  return <Badge value={e.tipo ? "Venta" : "Compra"} severity={e.tipo ? "success" : "danger"} />;
                }}
              />
              <Column
                field="total"
                header="Total"
                body={(e) => {
                  return formatoCurrencyCLP(e.total);
                }}
              />
              <Column field="createdAt" header="Fecha" />
            </DataTable>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
    </>
  );
};
