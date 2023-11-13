import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { formatoCurrencyCLP } from "./FormatoDinero";
import { InputText } from "primereact/inputtext";
import { Badge } from "./Badge";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { CustomCircle } from "./styledComponents/styledComponents";

export const TablaProductos = ({ productos }) => {
  const [globalFiltro, setGlobalFiltro] = useState(null);
  const [columnas, setColumnas] = useState(Object.keys(productos[0] || []));
  const [loading, setLoading] = useState(false);

  const [productoAModificar, setProductoAModificar] = useState({});
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [productoAEliminarId, setProductoAEliminarId] = useState(null);

  const exportarExcel = () => {
    const datosExportar = productos;
    const datosExcel = datosExportar.map((producto) => ({
      Codigo_de_barra: producto.codigo_barra,
      Producto: producto.nombre,
      Categoria: producto.categoria,
      Cantidad: producto.cantidad,
      Fecha: producto.fecha instanceof Date ? producto.fecha.toLocaleDateString() : "",
      Precio: formatoCurrencyCLP(producto.precio),
    }));
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(datosExcel);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, { bookType: "xlsx", type: "array" });
      saveAsExcelFile(excelBuffer, "productos");
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
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportarColumnas, productos);
        doc.save("productos.pdf");
      });
    });
  };
  const controlInventario = (
    <div className="flex justify-content-between align-items-center">
      <div className="flex gap-2 align-items-center">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" placeholder="Buscar" onInput={(e) => setGlobalFiltro(e.target.value)} />
        </span>
        <Badge value={productos.length} label="Productos" />
      </div>

      <div className="flex justify-conent-end align-items-center gap-3">
        {/* <Button label="Agregar" icon="pi pi-plus" severity="info" rounded onClick={() => navigateAgregar("/agregarProductos")} /> */}
        <Button
          disabled={productos.length == 0}
          label="Excel"
          icon="pi pi-file-excel"
          severity="success"
          rounded
          onClick={exportarExcel}
          data-pr-tooltip="XLS"
        />
        <Button
          disabled={productos.length == 0}
          label="PDF"
          icon="pi pi-file-pdf"
          severity="danger"
          rounded
          onClick={exportarPdf}
          data-pr-tooltip="PDF"
        />
      </div>
    </div>
  );

  const cantidadProductos = (rowData) => {
    const cantidadClase = classNames({
      "bg-red-100 text-red-900": rowData.cantidad <= 9,
      "bg-yellow-100 text-yellow-900": rowData.cantidad >= 10 && rowData.cantidad <= 15,
      "bg-green-100 text-green-900": rowData.cantidad > 15,
    });
    return <CustomCircle className={cantidadClase}>{rowData.cantidad}</CustomCircle>;
  };

  const abrirFormularioEdicion = (producto) => {
    setProductoAModificar(producto);
    setFormularioVisible(true);
  };
  const eliminarProducto = async (productoId) => {
    setProductoAEliminarId(productoId);
    setConfirmDialogVisible(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-1">
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => abrirFormularioEdicion(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => eliminarProducto(rowData._id, rowData.nombre)} />
      </div>
    );
  };

  useEffect(() => {}, []);
  return (
    <DataTable
      removableSort
      header={controlInventario}
      value={productos}
      showGridlines
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 15]}
      scrollable
      scrollHeight="580px"
      globalFilter={globalFiltro}
      loading={loading}
      emptyMessage="Producto no registrado"
    >
      <Column field="codigo_barra" header="Código de barra" body={(rowData) => rowData.codigo_barra} />
      <Column field="nombre" header="Producto" body={(rowData) => rowData.nombre} />
      <Column field="categoria" header="Categoria" body={(rowData) => (rowData.categoria ? rowData.categoria : "Sin Categoria")} />
      <Column sortable field="cantidad" header="Cantidad" body={cantidadProductos} />
      <Column field="fecha" header="Fecha" body={(rowData) => rowData.fecha} />
      <Column sortable field="precio" header="Precio" body={(rowData) => formatoCurrencyCLP(rowData.precio)} />
      <Column header="Acciones" body={actionBodyTemplate} exportable={false} />
    </DataTable>
  );
};

// display: flex;
// justify-content: flex-end;
// align-items: center;
// gap: 1rem;
