import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { formatoCurrencyCLP } from "../../../../components/FormatoDinero";

export const TablaProductos = ({ productos, eliminarProducto }) => {
  const botonEliminar = (rowData) => {
    return (
      <div>
        <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel" onClick={() => eliminarProducto(rowData.id)} />
      </div>
    );
  };

  return (
    <div>
      <DataTable value={productos}>
        <Column field="codigoBarra" header="Código de barra" />
        <Column field="producto" header="Productos" />
        <Column field="categorias" header="Categorias" />
        <Column field="cantidad" header="Cantidad" />
        <Column field="precio" header="Precio" body={(rowData) => formatoCurrencyCLP(rowData.precio)} />
        <Column body={botonEliminar} />
      </DataTable>
    </div>
  );
};
