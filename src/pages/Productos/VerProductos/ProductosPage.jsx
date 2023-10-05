import { useState, useRef } from "react";
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

  const acciones = (rowData) => {
    return (
      <div>
        <Button className="p-button p-button-info p-button-icon-only" onClick={() => abrirFormularioEdicion(rowData)}>
          <span className="pi pi-pencil" />
        </Button>
        <Dialog header="Editar Producto" visible={formularioVisible} onHide={() => setFormularioVisible(false)}>
          <div className="formulario-edicion">
            <div className="p-field">
              <label htmlFor="codigoBarra">Codigo de barra: </label>
              <InputText
                value={productoAModificar.codigoBarra}
                onChange={(e) => setProductoAModificar({ ...productoAModificar, codigoBarra: e.target.value })}
              />
            </div>
            <div className="p-field">
              <label htmlFor="producto">Nombre: </label>
              <InputText
                value={productoAModificar.producto}
                onChange={(e) => setProductoAModificar({ ...productoAModificar, producto: e.target.value })}
              />
            </div>
            <div className="p-field">
              <label htmlFor="categoria">Categoría: </label>
              <InputText
                value={productoAModificar.categoria}
                onChange={(e) => setProductoAModificar({ ...productoAModificar, categoria: e.target.value })}
              />
            </div>
            <div className="p-field">
              <label htmlFor="cantidad">Cantidad: </label>
              <InputText
                value={productoAModificar.cantidad}
                onChange={(e) => setProductoAModificar({ ...productoAModificar, cantidad: e.target.value })}
              />
            </div>
            <div className="p-field">
              <label htmlFor="precio">Precio: </label>
              <InputText
                value={productoAModificar.precio}
                onChange={(e) => setProductoAModificar({ ...productoAModificar, precio: e.target.value })}
              />
            </div>
            <Button label="Guardar Cambios" onClick={guardarCambios} />
          </div>
        </Dialog>
        <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel" onClick={() => handleEliminarProducto(rowData.id)} />
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
        <div className="contenidoTabla">
          <DataTable showGridlines value={productosFiltrados.length > 0 ? productosFiltrados : productosCliente}>
            <Column field="codigoBarra" header="Código de barra" body={(rowData) => rowData.codigoBarra} />
            <Column field="producto" header="Productos" body={(rowData) => rowData.producto} />
            <Column field="categoria" header="Categorias" body={(rowData) => rowData.categoria} />
            <Column field="cantidad" header="Cantidad" body={(rowData) => rowData.cantidad} />
            <Column field="fecha" header="Fecha" body={(rowData) => (rowData.fecha instanceof Date ? rowData.fecha.toLocaleDateString() : "")} />
            <Column field="precio" header="Precio" body={(rowData) => formatoCurrencyCLP(rowData.precio)} />
            <Column header="Acciones" body={acciones} />
          </DataTable>
        </div>
      </div>
    </div>
  );
};
