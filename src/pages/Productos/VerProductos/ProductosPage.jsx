import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Message } from "primereact/message";
import { formatoCurrencyCLP, formatoFecha } from "../../../components/Formatos";
import { Contenedor, ContenedorHeader, ContenedorExportar, ContenedorTabla, Titulo, CustomCircle } from "./components/StyledVerProductos";
import { api } from "../../../api/api";
import { useSelector } from "react-redux";
import { Badge } from "../../../components/Badge";
import { CustomConfirmDialog } from "../../../components/CustomConfirmDialog";
import { InputContainer, InputContainerDropdown } from "../../../components/InputContainer";
import { ProductoSchema } from "../../../components/Validaciones";
import { useFormik } from "formik";
import { FileUpload } from "primereact/fileupload";

export const Productos = () => {
  const { comercio } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [verEliminar, setVerEliminar] = useState(false);
  const [productoAEliminarId, setProductoAEliminarId] = useState(null);
  const [productoAModificar, setProductoAModificar] = useState({});
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
  const [globalFiltro, setGlobalFiltro] = useState(null);
  const toast = useRef(null);
  const fileUploadRef = useRef(null);

  const borrarProducto = async () => {
    console.log("Comercio:", comercio);
    try {
      const { data } = await api.delete(`producto/${productoAEliminarId}/${comercio}`);
      console.log(data);
      if (data.success) {
        toast.current.show({
          severity: "info",
          summary: "Eliminado",
          detail: "Producto Eliminado",
          life: 2000,
        });
      } else {
        toast.current.show({
          severity: "danger",
          summary: "Eliminado",
          detail: "Error al eliminar",
          life: 5000,
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "danger",
        summary: "Eliminado",
        detail: error.message,
        life: 5000,
      });
    } finally {
      traerProductos();
    }
    setVerEliminar(false);
  };

  const verFormulario = (producto) => {
    setProductoAModificar(producto);
    formik.setValues(producto);
    setMostrarFormulario(true);
    console.log(productoAModificar);
  };

  const eliminarProducto = (productoID) => {
    setProductoAEliminarId(productoID);
    setVerEliminar(true);
  };

  const editarProducto = async () => {
    try {
      const body = { ...formik.values };
      if (formik.values.imagenes) {
        body.imagenes = [formik.values.imagenes];
      }
      const response = await api.put(`producto/${productoAModificar._id}`, body);
      const { data } = response;
      console.log(data.data);
      toast.current.show({
        severity: "info",
        summary: "Producto actualizado",
        detail: "Se actualizó el producto",
        life: 2000,
      });
      setMostrarFormulario(false);
      fileUploadRef.current.clear();
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "warning",
        summary: "Error",
        detail: "No se pudo actualizar el producto",
        life: 2000,
      });
    } finally {
      traerProductos();
    }
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
  const categorias = [
    { label: "Alimentos y bebidas", value: "Alimentos y bebidas" },
    { label: "Electrodoméstico", value: "Electrodoméstico" },
    { label: "Electrónica", value: "Electrónica" },
  ];
  const cols = [
    { field: "codigo_barra", header: "Código de barra" },
    { field: "nombre", header: "Productos" },
    { field: "categoria", header: "Categorías" },
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
      Fecha: formatoFecha(producto.fecha),
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
        module.default.saveAs(data, fileName + "_export_" + EXCEL_EXTENSION);
      }
    });
  };

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
        <Button label="Agregar" icon="pi pi-plus" severity="info" rounded raised onClick={() => navigate("/agregarProductos")} />
        <Button label="Ventas" rounded raised severity="help" icon="pi pi-tag" onClick={() => navigate("/")} />
        <Button label="Excel" icon="pi pi-file-excel" severity="success" rounded raised onClick={exportarExcel} data-pr-tooltip="XLS" />
        <Button label="PDF" icon="pi pi-file-pdf" severity="danger" rounded raised onClick={exportarPdf} data-pr-tooltip="PDF" />
      </ContenedorExportar>
    </ContenedorHeader>
  );

  const traerProductos = async () => {
    setLoading(true);
    try {
      const response = await api.get("producto/comercio");
      const { data } = response;
      console.log(data);
      setProductos(data.data);
    } catch (error) {
      toast.current.show({
        severity: "danger",
        summary: "Productos",
        detail: "Error al cargar los productos",
        life: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        formik.setFieldValue("imagenes", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const imageBodyTemplate = (rowData) => {
    if (rowData.imagenes.length === 0) {
      return <span>Sin imagen</span>;
    }
    return <img style={{ objectFit: "cover" }} src={rowData.imagenes} alt={rowData.imagenes} width="80" height="80" />;
  };

  const formik = useFormik({
    initialValues: {
      codigo_barra: "",
      nombre: "",
      imagenes: "",
      categoria: "",
      cantidad: Number(""),
      precio: Number(""),
    },
    validationSchema: ProductoSchema,

    onSubmit: (data) => {
      console.log(data);
    },
  });

  const validacionValores = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return validacionValores(name) ? (
      <span>
        <Message className="absolute" severity="error" text={`${formik.errors[name]}`}></Message>
      </span>
    ) : null;
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
          className="p-datatable-lg p-datatable-gridlines"
          emptyMessage="Producto no registrado"
          value={productos}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 15]}
          scrollable
          scrollHeight="500px"
          globalFilter={globalFiltro}
          loading={loading}
        >
          <Column field="codigo_barra" header="Código de barra" />
          <Column field="nombre" header="Producto" />
          <Column field="categoria" header="Categoría" body={(rowData) => (rowData.categoria ? rowData.categoria : "Sin Categoría")} />
          <Column field="imagenes" header="Imagen" body={imageBodyTemplate} />
          <Column sortable field="cantidad" header="Cantidad" body={cantidadProductos} />
          <Column field="fecha" header="Fecha" body={(rowData) => formatoFecha(rowData.fecha)} />
          <Column sortable field="precio" header="Precio" body={(rowData) => formatoCurrencyCLP(rowData.precio)} />
          <Column
            header="Acciones"
            body={(rowData) => {
              return (
                <div className="flex gap-2">
                  <Button icon="pi pi-pencil" rounded outlined severity="warning" onClick={() => verFormulario(rowData)} />
                  <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => eliminarProducto(rowData._id)} />
                </div>
              );
            }}
            exportable={false}
          />
        </DataTable>
      </ContenedorTabla>

      <Dialog
        header="Editar Producto"
        visible={mostrarFormulario}
        style={{ width: "32rem", height: "42rem" }}
        onHide={() => setMostrarFormulario(false)}
        footer={
          <>

            <Button
              label="Actualizar"
              icon="pi pi-pencil"
              severity="warning"
              raised
              rounded
              onClick={editarProducto}
              disabled={
                productoAModificar.imagenes === formik.values.imagenes &&
                productoAModificar.nombre === formik.values.nombre &&
                productoAModificar.categoria === formik.values.categoria &&
                productoAModificar.cantidad === formik.values.cantidad &&
                productoAModificar.precio === formik.values.precio
              }
            />
            <Button
              label="Cancelar"
              icon="pi pi-times"
              severity="danger"
              raised
              rounded
              onClick={() => setMostrarFormulario(false) && formik.resetForm()}
            />
          </>
        }
      >
        <form onSubmit={formik.handleSubmit} className="flex flex-column">
          <div className="flex flex-column gap-2">
            <div className="flex justify-content-center">
              <div className="flex flex-column align-items-center">
                {formik.values.imagenes ? (
                  <img src={formik.values.imagenes} alt="Imagen del producto" width="200" height="200" style={{ objectFit: "cover" }} />
                ) : productoAModificar.imagenes ? (
                  <img src={productoAModificar.imagenes} alt="Imagen del producto" width="200" height="200" style={{ objectFit: "cover" }} />
                ) : null}
                <FileUpload
                  ref={fileUploadRef}
                  name="imagenes"
                  className="p-mt-2"
                  mode="basic"
                  accept="image/*"
                  maxFileSize={1000000}
                  auto={false}
                  chooseOptions={{
                    icon: "pi pi-images",
                    style: {
                      backgroundColor: "rgb(57 170 205)",
                      color: "white",
                      border: "2px solid rgb(76 147 164)",
                      borderRadius: "2rem",
                    },
                  }}
                  chooseLabel="Cambiar"
                  onSelect={handleFileChange}
                />
              </div>
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="codigo_barra">Código de barra</label>
              <InputContainer id="codigo_barra" name="codigo_barra" value={productoAModificar.codigo_barra} disabled />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="Producto">Nombre</label>
              <InputContainer
                id="nombre"
                name="nombre"
                placeholder="Ingrese su nombre del producto..."
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
              {getFormErrorMessage("nombre")}
            </div>
            <div className="p-field p-col-12 p-md-6">
            <label htmlFor="categoria">Categoría</label>
                <InputContainerDropdown
                  id="categoria"
                  name="categoria"
                  options={categorias}
                  placeholder="Seleccione una categoría"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.categoria}
                />
                {getFormErrorMessage("categoria")}
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="cantidad">Cantidad</label>
              <InputContainer
                id="cantidad"
                name="cantidad"
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                value={formik.values.cantidad}
                mode="decimal"
                showButtons
                min={0}
                max={10000}
              />
              {getFormErrorMessage("precio")}
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="precio">Precio</label>
              <InputContainer
                id="precio"
                name="precio"
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                value={formik.values.precio}
                mode="decimal"
                showButtons
                min={0}
                max={10000}
              />
              {getFormErrorMessage("precio")}
            </div>
          </div>
        </form>
      </Dialog>

      <CustomConfirmDialog
        visible={verEliminar}
        onHide={() => setVerEliminar()}
        onConfirm={borrarProducto}
        message="¿Estás seguro de eliminar el producto?"
        header="Eliminar"
      />
    </Contenedor>
  );
};
