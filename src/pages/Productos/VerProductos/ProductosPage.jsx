import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
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
  const [productoAModificar, setProductoAModificar] = useState({});
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [buscarText, setBuscarText] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const productosCliente = user ? productos.filter((el) => el.clienteId == user.id) : [];
  const [submitted, setSubmitted] = useState(false);

  const toast = useRef(null);
  const mostrar = () => {
    toast.current.show({ severity: "info", summary: "Eliminado", detail: "Producto Eliminado", life: 2000 });
  };
  const estado = () => {
    toast.current.show({ severity: "info", summary: "Modificado", detail: "Producto Modificado", life: 2000 });
  };

  const handleEliminarProducto = (productoId) => {
    if (user) {
      if (user.rol === "cliente") {
        setProductoAEliminarId(productoId);
        setConfirmDialogVisible(true);
      } else {
        alert("No puedes eliminar el producto");
      }
    }
  };

  const handleEliminarProductoClick = () => {
    if (productoAEliminarId) {
      console.log("ID del producto a eliminar:", productoAEliminarId);
      eliminarProducto(productoAEliminarId, user.id);
      mostrar();
      setConfirmDialogVisible(false);
      setProductoAEliminarId(null);
    }
  };

  const handleBuscar = () => {
    const textoBusqueda = buscarText.toLowerCase();
    const productosEncontrados = productosCliente.filter((producto) => {
      const productoNombre = producto.producto.toLowerCase();
      const productoCategorias = producto.categoria.toLowerCase();
      return productoNombre.includes(textoBusqueda) || productoCategorias.includes(textoBusqueda);
    });
    setProductosFiltrados(productosEncontrados);
  };

  const abrirFormularioEdicion = (producto) => {
    setProductoAModificar(producto);
    setFormularioVisible(true);
  };

  const guardarCambios = () => {
    modificarProducto(productoAModificar.id, productoAModificar);
    estado();
    setFormularioVisible(false);
  };

  const hadleChange = (e) => {
    const nuevoTexto = e.target.value;
    setBuscarText(nuevoTexto);
    handleBuscar(nuevoTexto);
  };

  const cantidadProductos = (rowData) => {
    const cantidadClase = classNames("custom-circle", {
      "bg-red-100 text-red-900": rowData.cantidad > 0 && rowData.cantidad < 8,
      "bg-yellow-100 text-yellow-900": rowData.cantidad > 8 && rowData.cantidad < 15,
      "bg-green-100 text-green-900": rowData.cantidad > 14,
    });
    return <div className={cantidadClase}>{rowData.cantidad}</div>;
  };

  // Into PrimeReact para exportar archivos //

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
        doc.autoTable(exportarColumnas, productosFiltrados.length > 0 ? productosFiltrados : productosCliente);
        doc.save("productos.pdf");
      });
    });
  };

  const exportarExcel = () => {
    const datosExportar = productosFiltrados.length > 0 ? productosFiltrados : productosCliente;
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

  const header = (
    <div className="exportarOption">
      <Button label="Excel" icon="pi pi-file-excel" severity="success" rounded onClick={exportarExcel} data-pr-tooltip="XLS" />
      <Button label="PDF" icon="pi pi-file-pdf" severity="danger" rounded onClick={exportarPdf} data-pr-tooltip="PDF" />
    </div>
  );

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
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => handleEliminarProducto(rowData.id)} />
      </React.Fragment>
    );
  };

  return (
    <div className="contenedor">
      <Toast ref={toast} />
      <h2 className="title">Productos</h2>
      <div className="tabla">
        <div className="contenedorFiltro">
          <div className="search">
            <InputText style={{ width: "100%" }} placeholder="Buscar" value={buscarText} onChange={hadleChange} />
          </div>
          <div className="agregarProducto">
            <Button className="p-button-raised p-button-success" icon="pi pi-plus">
              <Link to="/agregarProductos" style={{ textDecoration: "none", color: "white" }}>
                Nuevo producto
              </Link>
            </Button>
          </div>
        </div>
        <div>
          <DataTable
            showGridlines
            header={header}
            value={productosFiltrados.length > 0 ? productosFiltrados : productosCliente}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 15]}
            scrollable
            scrollHeight="480px"
            style={{ minWidth: "40rem" }}
          >
            <Column field="codigoBarra" header="Código de barra" body={(rowData) => rowData.codigoBarra} />
            <Column field="producto" header="Productos" body={(rowData) => rowData.producto} />
            <Column field="categoria" header="Categorias" body={(rowData) => rowData.categoria} />
            <Column field="cantidad" header="Cantidad" body={cantidadProductos} />
            <Column field="fecha" header="Fecha" body={(rowData) => (rowData.fecha instanceof Date ? rowData.fecha.toLocaleDateString() : "")} />
            <Column field="precio" header="Precio" body={(rowData) => formatoCurrencyCLP(rowData.precio)} />
            <Column header="Acciones" body={actionBodyTemplate} exportable={false} style={{ minWidth: "12rem" }} />
          </DataTable>
        </div>
        <Dialog
          header="Editar Producto"
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          className="p-fluid"
          visible={formularioVisible}
          footer={productDialogFooter}
          onHide={setFormularioVisible}
        >
          <div className="field">
            <label htmlFor="codigoBarra" className="font-bold">
              Codigo de barra
            </label>
            <InputText
              value={productoAModificar.codigoBarra}
              onChange={(e) => setProductoAModificar({ ...productoAModificar, codigoBarra: e.target.value })}
              required
              autoFocus
              className={classNames({ "p-invalid": submitted && !productoAModificar.codigoBarra })}
            />
            {submitted && !productoAModificar.codigoBarra && <small className="p-error">Codigo de barra es requerido.</small>}
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
                onChange={(e) => setProductoAModificar({ ...productoAModificar, cantidad: e.target.value })}
              />
            </div>
            <div className="field col">
              <label htmlFor="precio" className="font-bold">
                Precio
              </label>
              <InputNumber
                id="precio"
                value={productoAModificar.precio}
                onChange={(e) => setProductoAModificar({ ...productoAModificar, precio: e.target.value })}
              />
            </div>
          </div>
        </Dialog>

        <ConfirmDialog
          visible={confirmDialogVisible}
          onHide={() => setConfirmDialogVisible(false)}
          message="¿Seguro que deseas eliminar este producto?"
          header="Confirmar Eliminación"
          icon="pi pi-exclamation-triangle"
          acceptClassName="p-button-danger"
          acceptLabel="Sí"
          rejectLabel="No"
          footer={
            <div>
              <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={handleEliminarProductoClick} />
              <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => setConfirmDialogVisible(false)} />
            </div>
          }
        />
      </div>
    </div>
  );
};
