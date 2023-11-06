import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { useProductos } from "../../../context/ProductosContext";
import { formatoCurrencyCLP } from "../../../components/FormatoDinero";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { InputNumber } from "primereact/inputnumber";
import {
  Contenedor,
  ContenedorHeader,
  ContenedorExportar,
  ContenedorTabla,
  Titulo,
  CustomCircle,
  ContenedorOpciones,
} from "./components/StyledVerProductos";
import { api } from "../../../api/api";
import { ConfirmDialog } from "primereact/confirmdialog";

export const Productos = () => {
  const { eliminarProducto, modificarProducto } = useProductos();
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [productoAEliminarId, setProductoAEliminarId] = useState(null);
  const [productoAEliminarNombre, setProductoAEliminarNombre] = useState(null);
  const [productoAModificar, setProductoAModificar] = useState({});
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [productos, setProductos] = useState([]);
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
    const cantidadClase = classNames({
      "bg-red-100 text-red-900": rowData.cantidad <= 9,
      "bg-yellow-100 text-yellow-900": rowData.cantidad >= 10 && rowData.cantidad <= 15,
      "bg-green-100 text-green-900": rowData.cantidad > 15,
    });
    return <CustomCircle className={cantidadClase}>{rowData.cantidad}</CustomCircle>;
  };

  // Exportar Archivos Excel, PDF //

  const cols = [
    { field: "codigo_barra", header: "Código de barra" },
    { field: "nombre", header: "Productos" },
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
        doc.autoTable(exportarColumnas, productos);
        doc.save("productos.pdf");
      });
    });
  };

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

  // Buscar productos, ademas de mostrar los botones de agregar, exportar y pdf //
  const controlInventario = (
    <ContenedorHeader>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" placeholder="Buscar" onInput={(e) => setGlobalFiltro(e.target.value)} />
      </span>

      <ContenedorExportar>
        <Button label="Agregar" icon="pi pi-plus" severity="info" rounded onClick={() => navigateAgregar("/agregarProductos")} />
        <Button label="Excel" icon="pi pi-file-excel" severity="success" rounded onClick={exportarExcel} data-pr-tooltip="XLS" />
        <Button label="PDF" icon="pi pi-file-pdf" severity="danger" rounded onClick={exportarPdf} data-pr-tooltip="PDF" />
      </ContenedorExportar>
    </ContenedorHeader>
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
      <ContenedorOpciones>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => abrirFormularioEdicion(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => handleEliminarProducto(rowData.id, rowData.nombre)} />
      </ContenedorOpciones>
    );
  };

  const eliminarProductoDialog = (
    <React.Fragment>
      <Button label="Eliminar" icon="pi pi-trash" severity="danger" onClick={borrarProducto} />
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={ocultarEliminarDialog} />
    </React.Fragment>
  );

  const traerProductos = async () => {
    try {
      const response = await api.get("producto/comercio");
      const { data } = response;
      console.log(data);
      setProductos(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    traerProductos();
  }, []);

  return (
    <Contenedor>
      <Toast ref={toast} />
      <Titulo>Control Inventario</Titulo>
      <ContenedorTabla>
        <DataTable
          stripedRows
          removableSort
          header={controlInventario}
          value={productos}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 15]}
          scrollable
          scrollHeight="500px"
          globalFilter={globalFiltro}
        >
          <Column field="codigo_barra" header="Código de barra" body={(rowData) => rowData.codigo_barra} />
          <Column field="nombre" header="Productos" body={(rowData) => rowData.nombre} />
          <Column field="categoria" header="Categorias" body={(rowData) => rowData.categoria} />
          <Column sortable field="cantidad" header="Cantidad" body={cantidadProductos} />
          <Column field="fecha" header="Fecha" body={(rowData) => rowData.fecha} />
          <Column sortable field="precio" header="Precio" body={(rowData) => formatoCurrencyCLP(rowData.precio)} />
          <Column header="Acciones" body={actionBodyTemplate} exportable={false} />
        </DataTable>
      </ContenedorTabla>

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
              max={100}
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
        <i className="pi pi-exclamation-triangle" style={{ fontSize: "2rem" }}></i>
        {productoAEliminarNombre && (
          <span>
            ¿Seguro que deseas eliminar <b>{productoAEliminarNombre}</b>?
          </span>
        )}
      </Dialog>
    </Contenedor>
  );
};
