/* eslint-disable react/prop-types */
import { Badge } from "primereact/badge";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { formatoCurrencyCLP, formatoFecha } from "../../../components/Formatos";
import { Button } from "primereact/button";
import { useState } from "react";

export const TablaRegistro = ({ registros, options = false }) => {
  const [columnas, setColumnas] = useState(Object.keys(registros[0] || []));

  const exportarExcel = () => {
    const datosExportar = registros;
    // const datosExcel = datosExportar.map((registro) => {
    // const datosExcel = datosExportar.map((registro) => {
    //   return {
    //     Codigo_de_barra: registro.codigo_barra,
    //     Producto: registro.nombre,
    //     Categoria: registro.categoria,
    //     Cantidad: registro.cantidad,
    //     Fecha: registro.fecha instanceof Date ? registro.fecha.toLocaleDateString() : "",
    //     Precio: formatoCurrencyCLP(registro.precio),
    //   }
    // });
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(datosExportar);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, { bookType: "xlsx", type: "array" });
      saveAsExcelFile(excelBuffer, "registros");
    });
  };
  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], { type: EXCEL_TYPE });
        module.default.saveAs(data, fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };
  const exportarColumnas = columnas.map((col) => {
    return { title: col, dataKey: col };
  });

  const exportarPdf = () => {
    const columnasPrueba = Object.keys(registros[0])
      .filter((e) => e != "productos" && e != "__v" && e != "tipo")
      .map(
        (col) => {
          return { title: col, dataKey: col };
        },
        import("jspdf").then((jsPDF) => {
          import("jspdf-autotable").then(() => {
            const doc = new jsPDF.default(0, 0);
            doc.autoTable(columnasPrueba, registros);
            doc.save("registros.pdf");
          });
        })
      );
  };

  const controlInventario = (
    <div className="flex justify-content-end align-items-center gap-3">
      {/* <Button label="Agregar" icon="pi pi-plus" severity="info" rounded onClick={() => navigateAgregar("/agregarProductos")} /> */}
      <Button
        disabled={registros.length == 0}
        label="Excel"
        icon="pi pi-file-excel"
        severity="success"
        rounded
        onClick={exportarExcel}
        data-pr-tooltip="XLS"
      />
      <Button
        disabled={registros.length == 0}
        label="PDF"
        icon="pi pi-file-pdf"
        severity="danger"
        rounded
        onClick={exportarPdf}
        data-pr-tooltip="PDF"
      />
    </div>
  );
  return (
    <div>
      <DataTable
        value={registros}
        showGridlines
        paginator={options ? true : false}
        scrollable={options ? true : false}
        rows={options ? 5 : false}
        rowsPerPageOptions={options ? [5, 10, 15] : false}
        header={options ? controlInventario : false}
      >
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
        <Column field="createdAt" header="Fecha" body={(e) => formatoFecha(e.createdAt)} />
      </DataTable>
    </div>
  );
};
