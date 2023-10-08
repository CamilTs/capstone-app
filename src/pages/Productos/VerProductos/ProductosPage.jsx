import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { useProductos } from "../../../context/ProductosContext";
import { useAuth } from "../../../context/AuthContext";
import { formatoCurrencyCLP } from "../../../components/FormatoDinero";
import "../../../CSS/Productos.css";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { InputNumber } from "primereact/inputnumber";

export const Productos = () => {
  const { user } = useAuth();
  const { eliminarProducto, productos, modificarProducto } = useProductos();
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [productoAEliminarId, setProductoAEliminarId] = useState(null);
  const [productoAEliminarNombre, setProductoAEliminarNombre] = useState(null);
  const [productoAModificar, setProductoAModificar] = useState({});
  const [formularioVisible, setFormularioVisible] = useState(false);
  const productosCliente = user ? productos.filter((el) => el.clienteId == user.id) : [];
  const navigateAgregar = useNavigate();
  const [globalFiltro, setGlobalFiltro] = useState(null);
  const toast = useRef(null);

  const handleEliminarProducto = (productoId, productoNombre) => {
    setProductoAEliminarId(productoId);
    setProductoAEliminarNombre(productoNombre);
    setConfirmDialogVisible(true);
  };

  const borrarProducto = () => {
    console.log("ID del producto a eliminar:", productoAEliminarId);
    eliminarProducto(productoAEliminarId);
    setConfirmDialogVisible(false);
    toast.current.show({ severity: "info", summary: "Eliminado", detail: "Producto Eliminado", life: 2000 });
  };

  const abrirFormularioEdicion = (producto) => {
    setProductoAModificar(producto);
    setFormularioVisible(true);
  };

  const guardarCambios = () => {
    modificarProducto(productoAModificar.id, productoAModificar);
    toast.current.show({ severity: "info", summary: "Modificado", detail: "Producto Modificado", life: 2000 });
    setFormularioVisible(false);
  };

  const ocultarEliminarDialog = () => {
    setConfirmDialogVisible(false);
  };

  // Diferentes colores para la cantidad de productos //

  const cantidadProductos = (rowData) => {
    const cantidadClase = classNames("custom-circle", {
      "bg-red-100 text-red-900": rowData.cantidad > 0 && rowData.cantidad < 8,
      "bg-yellow-100 text-yellow-900": rowData.cantidad > 7 && rowData.cantidad < 15,
      "bg-green-100 text-green-900": rowData.cantidad > 14,
    });
    return <div className={cantidadClase}>{rowData.cantidad}</div>;
  };

  // Exportar Archivos Excel, PDF //

  const cols = [
    { field: "codigoBarra", header: "Código de barra" },
    { field: "producto", header: "Productos" },
    { field: "categoria", header: "Categorias" },
    { field: "cantidad", header: "Cantidad" },
    { field: "fecha", header: "Fecha" },
    { field: "precio", header: "Precio" },
  ];

  const exportarColumnas = cols.map((col) => ({ title: col.header, dataKey: col.field }));

  const exportarPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportarColumnas, productosCliente);
        doc.save("productos.pdf");
      });
    });
  };

  const exportarExcel = () => {
    const datosExportar = productosCliente;
    const datosExcel = datosExportar.map((producto) => ({
      Codigo_de_barra: producto.codigoBarra,
      Producto: producto.producto,
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

  // Buscar productos, ademas de mostrar los botones de agregar, exportar y pdf //
  const controlInventario = (
    <div>
      <div className="contendedorHeader">
        <div>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" placeholder="Buscar" onInput={(e) => setGlobalFiltro(e.target.value)} />
          </span>
        </div>
        <div className="exportarOption">
          <Button label="Agregar" icon="pi pi-plus" severity="info" rounded onClick={() => navigateAgregar("/agregarProductos")} />
          <Button label="Excel" icon="pi pi-file-excel" severity="success" rounded onClick={exportarExcel} data-pr-tooltip="XLS" />
          <Button label="PDF" icon="pi pi-file-pdf" severity="danger" rounded onClick={exportarPdf} data-pr-tooltip="PDF" />
        </div>
      </div>
    </div>
  );

  // Llama los dialogos de editar y eliminar productos //
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Guardar" icon="pi pi-check" severity="success" onClick={guardarCambios} />
      <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={() => setFormularioVisible(false)} />
    </React.Fragment>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => abrirFormularioEdicion(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => handleEliminarProducto(rowData.id, rowData.producto)} />
      </React.Fragment>
    );
  };

  const eliminarProductoDialog = (
    <React.Fragment>
      <Button label="Eliminar" icon="pi pi-trash" severity="danger" onClick={borrarProducto} />
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={ocultarEliminarDialog} />
    </React.Fragment>
  );

  return (
    <div className="contenedor">
      <Toast ref={toast} />
      <h2 className="title">Control Inventario</h2>
      <div className="tabla">
        <div>
          <DataTable
            stripedRows
            removableSort
            header={controlInventario}
            value={productosCliente}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 15, 20]}
            scrollable
            scrollHeight="480px"
            style={{ width: "100%" }}
            globalFilter={globalFiltro}
          >
            <Column field="codigoBarra" header="Código de barra" body={(rowData) => rowData.codigoBarra} />
            <Column field="producto" header="Productos" body={(rowData) => rowData.producto} />
            <Column field="categoria" header="Categorias" body={(rowData) => rowData.categoria} />
            <Column sortable field="cantidad" header="Cantidad" body={cantidadProductos} />
            <Column field="fecha" header="Fecha" body={(rowData) => (rowData.fecha instanceof Date ? rowData.fecha.toLocaleDateString() : "")} />
            <Column sortable field="precio" header="Precio" body={(rowData) => formatoCurrencyCLP(rowData.precio)} />
            <Column header="Acciones" body={actionBodyTemplate} exportable={false} style={{ minWidth: "12rem" }} />
          </DataTable>
        </div>
        <Dialog
          header="Editar Producto"
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          className="p-fluid"
          visible={formularioVisible}
          footer={productDialogFooter}
          onHide={setFormularioVisible}
        >
          <div className="field">
            <label htmlFor="codigoBarra" className="font-bold">
              Código de barra
            </label>
            <InputText
              value={productoAModificar.codigoBarra}
              onChange={(e) => setProductoAModificar({ ...productoAModificar, codigoBarra: e.target.value })}
              required
              autoFocus
            />
          </div>
          <div className="field">
            <label htmlFor="producto" className="font-bold">
              Nombre
            </label>
            <InputText
              value={productoAModificar.producto}
              onChange={(e) => setProductoAModificar({ ...productoAModificar, producto: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="categoria" className="font-bold">
              Categoría
            </label>
            <InputText
              value={productoAModificar.categoria}
              onChange={(e) => setProductoAModificar({ ...productoAModificar, categoria: e.target.value })}
            />
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="cantidad" className="font-bold">
                Cantidad
              </label>
              <InputNumber
                id="cantidad"
                value={productoAModificar.cantidad}
                onValueChange={(e) => setProductoAModificar({ ...productoAModificar, cantidad: e.target.value })}
              />
            </div>
            <div className="field col">
              <label htmlFor="precio" className="font-bold">
                Precio
              </label>
              <InputNumber
                id="precio"
                value={productoAModificar.precio}
                onValueChange={(e) => setProductoAModificar({ ...productoAModificar, precio: e.target.value })}
                mode="currency"
                currency="CLP"
                locale="es-CL"
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          visible={confirmDialogVisible}
          onHide={() => setConfirmDialogVisible(false)}
          header="Confirmar Eliminación"
          modal
          footer={eliminarProductoDialog}
        >
          <i className="pi pi-exclamation-triangle" style={{ fontSize: "2rem" }}></i>
          {productoAEliminarNombre && (
            <span>
              ¿Seguro que deseas eliminar <b>{productoAEliminarNombre}</b>?
            </span>
          )}
        </Dialog>
      </div>
    </div>
  );
};
