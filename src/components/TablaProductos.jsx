import { DataTable } from "primereact/datatable";
import React, { useEffect, useRef, useState } from "react";
import { formatoCurrencyCLP } from "./FormatoDinero";
import { InputText } from "primereact/inputtext";
import { Badge } from "./Badge";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { CustomCircle } from "./styledComponents/styledComponents";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { api } from "../api/api";
import { Toast } from "primereact/toast";

export const TablaProductos = ({ productos = [], cargarProductos, comercio }) => {
  const [globalFiltro, setGlobalFiltro] = useState(null);
  const [columnas, setColumnas] = useState(Object.keys(productos[0] || []));
  const [loading, setLoading] = useState(false);

  const [productoAModificar, setProductoAModificar] = useState({});
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [productoAEliminarId, setProductoAEliminarId] = useState(null);
  const [productoAEliminarNombre, setProductoAEliminarNombre] = useState(null);
  const toast = useRef(null);

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
    console.log(col);
    return { title: col, dataKey: col };
  });

  const exportarPdf = () => {
    const columnasPrueba = Object.keys(productos[0])
      .filter((e) => e != "imagenes" && e != "__v")
      .map(
        (col) => {
          return { title: col, dataKey: col };
        },

        import("jspdf").then((jsPDF) => {
          import("jspdf-autotable").then(() => {
            const doc = new jsPDF.default(0, 0);
            doc.autoTable(columnasPrueba, productos);
            doc.save("productos.pdf");
          });
        })
      );
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

  const borrarProducto = async () => {
    console.log("Comercio:", comercio);
    // eliminarProducto(productoAEliminarId);
    try {
      const { data } = await api.delete(`producto/${productoAEliminarId}/${comercio}`);
      console.log(data);
      if (data.success) {
        toast.current.show({ severity: "info", summary: "Eliminado", detail: "Producto Eliminado", life: 2000 });
      } else {
        toast.current.show({ severity: "danger", summary: "Eliminado", detail: "Error al eliminar", life: 5000 });
      }
    } catch (error) {
      console.log(error.message);
      toast.current.show({ severity: "danger", summary: "Eliminado", detail: error.message, life: 5000 });
    } finally {
      cargarProductos();
    }
    setConfirmDialogVisible(false);
  };

  const ocultarEliminarDialog = () => {
    setConfirmDialogVisible(false);
  };

  const guardarCambios = async () => {
    // modificarProducto(productoAModificar.id, productoAModificar);
    // console.log(modificarProducto);
    try {
      const { data } = await api.put(`producto/${productoAModificar._id}`, productoAModificar);
      console.log(data);
      if (data.success) {
        cargarProductos();
        toast.current.show({ severity: "info", summary: "Modificado", detail: "Producto Modificado", life: 2000 });
      } else {
        toast.current.show({ severity: "danger", summary: "Modificado", detail: "Error la modificar", life: 5000 });
      }
    } catch (error) {
      console.log(error.message);
    }
    setFormularioVisible(false);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-1">
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => abrirFormularioEdicion(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => eliminarProducto(rowData._id, rowData.nombre)} />
      </div>
    );
  };

  const productDialogFooter = (
    <React.Fragment>
      <Button label="Guardar" icon="pi pi-check" severity="success" onClick={guardarCambios} />
      <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={() => setFormularioVisible(false)} />
    </React.Fragment>
  );

  const eliminarProductoDialog = (
    <React.Fragment>
      <Button label="Eliminar" icon="pi pi-trash" severity="danger" onClick={borrarProducto} />
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={ocultarEliminarDialog} />
    </React.Fragment>
  );

  useEffect(() => {}, [productos]);
  return (
    <>
      <Toast ref={toast} />
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

      <Dialog
        header="Editar Producto"
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        className="p-fluid"
        visible={formularioVisible}
        footer={productDialogFooter}
        onHide={setFormularioVisible}
      >
        <div>
          <label htmlFor="codigo_barra" className="font-bold">
            Código de barra
          </label>
          <InputText
            value={productoAModificar.codigo_barra}
            onChange={(e) => setProductoAModificar({ ...productoAModificar, codigo_barra: e.target.value })}
            required
            autoFocus
            disabled
          />
        </div>
        <div>
          <label htmlFor="producto" className="font-bold">
            Nombre
          </label>
          <InputText value={productoAModificar.nombre} onChange={(e) => setProductoAModificar({ ...productoAModificar, nombre: e.target.value })} />
        </div>
        <div>
          <label htmlFor="categoria" className="font-bold">
            Categoría
          </label>
          <InputText
            value={productoAModificar.categoria}
            onChange={(e) => setProductoAModificar({ ...productoAModificar, categoria: e.target.value })}
          />
        </div>
        <div>
          <div className="field col">
            <label htmlFor="cantidad" className="font-bold">
              Cantidad
            </label>
            <InputNumber
              id="cantidad"
              value={productoAModificar.cantidad}
              onValueChange={(e) => setProductoAModificar({ ...productoAModificar, cantidad: e.target.value })}
              mode="decimal"
              showButtons
              min={0}
              max={10000}
            />
          </div>
          <div>
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
        <p>¿Desea eliminar el producto?</p>
      </Dialog>
    </>
  );
};
