/* eslint-disable react/prop-types */
import { Badge } from "primereact/badge";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { formatoCurrencyCLP } from "../../../components/FormatoDinero";

export const TablaRegistro = ({ registros }) => {
  return (
    <div>
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
  );
};
