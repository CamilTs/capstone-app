import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { formatoCurrencyCLP, formatoFecha } from "../../../components/Formatos";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
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
import { DataTable } from "primereact/datatable";
import { useSelector } from "react-redux";
import { Badge } from "../../../components/Badge";
import { CustomConfirmDialog } from "../../../components/CustomConfirmDialog";
import { InputContainer } from "../../../components/InputContainer";

export const Productos = () => {
  const { comercio } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [verEliminar, setVerEliminar] = useState(false);
  const [productoAEliminarId, setProductoAEliminarId] = useState(null);
  const [productoAEliminarNombre, setProductoAEliminarNombre] = useState(null);
  const [productoAModificar, setProductoAModificar] = useState({});
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [productos, setProductos] = useState([]);
  const navigateAgregar = useNavigate();
  const [globalFiltro, setGlobalFiltro] = useState(null);
  const toast = useRef(null);

  const borrarProducto = async () => {
    console.log("Comercio:", comercio);
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
      traerProductos();
    }
    setVerEliminar(false);
  };

  const abrirFormularioEdicion = (producto) => {
    setProductoAModificar(producto);
    setFormularioVisible(true);
  };

  const eliminarProducto = (productoID, nombre) => {
    setProductoAEliminarId(productoID);
    setProductoAEliminarNombre(nombre);
    setVerEliminar(true);
  };

  // EDITAR PRODUCTOS //
  const guardarCambios = async () => {
    try {
      const { data } = await api.put(`producto/${productoAModificar._id}`, productoAModificar);
      console.log(data);
      if (data.success) {
        traerProductos();
        toast.current.show({ severity: "info", summary: "Modificado", detail: "Producto Modificado", life: 2000 });
      } else {
        toast.current.show({ severity: "danger", summary: "Modificado", detail: "Errora la modificar", life: 5000 });
      }
    } catch (error) {
      console.log(error.message);
    }
    setFormularioVisible(false);
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
    console.log(exportarColumnas);
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
      <div className="flex gap-2 align-items-center">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" placeholder="Buscar" onInput={(e) => setGlobalFiltro(e.target.value)} />
        </span>
        <Badge value={productos.length} label="Productos" />
      </div>

      <ContenedorExportar>
        <Button label="Agregar" icon="pi pi-plus" severity="info" rounded onClick={() => navigateAgregar("/agregarProductos")} />
        <Button label="Excel" icon="pi pi-file-excel" severity="success" rounded onClick={exportarExcel} data-pr-tooltip="XLS" />
        <Button label="PDF" icon="pi pi-file-pdf" severity="danger" rounded onClick={exportarPdf} data-pr-tooltip="PDF" />
      </ContenedorExportar>
    </ContenedorHeader>
  );

  const traerProductos = async () => {
    setLoading(true);
    try {
      const response = await api.get("producto/comercio");
      const { data } = response;
      if (data.success) {
        setProductos(data.data);
        toast.current.show({ severity: "success", summary: "Productos", detail: "Productos cargados", life: 2000 });
      } else {
        toast.current.show({ severity: "danger", summary: "Productos", detail: "Error al cargar los productos", life: 3000 });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const imageBodyTemplate = (rowData) => {
    return <img src={rowData.imagenes} alt={rowData.imagenes} width="80px" className="shadow-4" />;
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
          removableSort
          header={controlInventario}
          value={productos}
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
          <Column field="imagenes" header="Imagen" body={imageBodyTemplate} />
          <Column sortable field="cantidad" header="Cantidad" body={cantidadProductos} />
          <Column field="fecha" header="Fecha" body={(rowData) => formatoFecha(rowData.fecha)} />
          <Column sortable field="precio" header="Precio" body={(rowData) => formatoCurrencyCLP(rowData.precio)} />
          <Column
            header="Acciones"
            body={(rowData) => {
              return (
                <ContenedorOpciones>
                  <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => abrirFormularioEdicion(rowData)} />
                  <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => eliminarProducto(rowData._id, rowData.nombre)} />
                </ContenedorOpciones>
              );
            }}
            exportable={false}
          />
        </DataTable>
      </ContenedorTabla>

      {/* DIALOG PARA EDITAR PRODUCTO */}
      <Dialog
        header="Editar Producto"
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        className="p-fluid"
        visible={formularioVisible}
        footer={
          <>
            <Button label="Guardar" icon="pi pi-check" severity="success" onClick={guardarCambios} />
            <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={() => setFormularioVisible(false)} />
          </>
        }
        onHide={setFormularioVisible}
      >
        <div>
          <label htmlFor="codigo_barra" className="font-bold">
            Código de barra
          </label>
          <InputContainer
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
          <InputContainer
            value={productoAModificar.nombre}
            onChange={(e) => setProductoAModificar({ ...productoAModificar, nombre: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="categoria" className="font-bold">
            Categoría
          </label>
          <InputContainer
            value={productoAModificar.categoria}
            onChange={(e) => setProductoAModificar({ ...productoAModificar, categoria: e.target.value })}
          />
        </div>
        <div>
          <div className="field col">
            <label htmlFor="cantidad" className="font-bold">
              Cantidad
            </label>
            <InputContainer
              type="number"
              id="cantidad"
              value={productoAModificar.cantidad}
              onChange={(e) => setProductoAModificar({ ...productoAModificar, cantidad: e.target.value })}
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
            <InputContainer
              type="number"
              id="precio"
              value={productoAModificar.precio}
              onChange={(e) => setProductoAModificar({ ...productoAModificar, precio: e.target.value })}
              mode="currency"
              currency="CLP"
              locale="es-CL"
            />
          </div>
        </div>
      </Dialog>

      <CustomConfirmDialog
        visible={verEliminar}
        onHide={() => setVerEliminar()}
        onConfirm={borrarProducto}
        message={`¿Estás seguro de eliminar el producto ${productoAEliminarNombre}?`}
        header="Eliminar"
      />
    </Contenedor>
  );
};
