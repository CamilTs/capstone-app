import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import styled from "styled-components";
import { useProductos } from "../../context/ProductosContext";
import { productos } from "../../productosCliente";
import { useAuth } from "../../context/AuthContext";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { InputNumber } from "primereact/inputnumber";
import { useContextSocket } from "../../context/SocketContext";
import { useApi } from "../../api/api";

const ContenedorPrincipal = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  gap: 1rem;
`;

const ContenedorInfoVenta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  width: 100%;
`;

const OpcionesBotones = styled.div`
  gap: 0.5rem;
  display: flex;
`;

const TotalContenedor = styled.div`
  font-size: 44px;
`;

const UltimaContenedor = styled.span`
  font-size: 25px;
`;

const ContenedorDatos = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;
`;

const DatosVenta = styled.div`
  width: 70%;
  min-width: 400px;
  display: flex;
  align-items: end;
  flex-flow: column wrap;
`;

const OpcionesVenta = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const AgregarVenta = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const VenderProducto = () => {
  const { descontarCantidad } = useProductos();
  const { socket, online } = useContextSocket();
  const { get } = useApi();
  const { user } = useAuth();
  const productosCliente = productos.filter((el) => el.clienteId == user.id);
  const [venta, setVenta] = useState({
    total: 0,
    ultima: 0,
  });
  const [confirmDialogVenta, setConfirmDialogVenta] = useState(false);
  const [confirmDialogLimpiar, setConfirmDialogLimpiar] = useState(false);

  const [products, setProducts] = useState([]);
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const navigateProductos = useNavigate();

  const agregarProducto = async (codigoBarra = "") => {
    buscarProducto(codigoBarra);
    try {
      console.log(codigoBarra);
      const response = await get(`producto/${codigoBarra}`);
      console.log(response);
      const producto = response.data;
      console.log("====================================");
      console.log(producto);

      if (producto) {
        const productoExistenteIndex = products.findIndex((el) => el.codigoBarra === producto.codigo_barra);

        if (productoExistenteIndex >= 0) {
          setProducts((prevProducts) => {
            const clonProducts = [...prevProducts];
            const productoExiste = clonProducts[productoExistenteIndex];
            productoExiste.cantidad++;
            productoExiste.total = productoExiste.cantidad * productoExiste.valor;
            clonProducts[productoExistenteIndex] = productoExiste;
            return clonProducts;
          });
        } else {
          // Si no existe en la lista, agrégalo
          setProducts((prevProducts) => [
            ...prevProducts,
            { nombre: producto.nombre, cantidad: 1, valor: producto.precio, total: producto.precio, codigoBarra: producto.codigo_barra },
          ]);
        }

        const total = products.reduce((acc, el) => {
          return acc + el.total;
        }, 0);

        setVenta({ total: total === 0 ? producto.precio : total, ultima: producto.precio });
      } else {
        console.log("Producto no encontrado");
        // Manejar el caso en que el producto no existe
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      // Manejar errores de la API, por ejemplo, mostrar un mensaje al usuario.
    }
  };

  const buscarProducto = async (codigoBarra) => {
    const response = await get(`producto/${codigoBarra}`);
    console.log(response);
  };

  const venderProductos = () => {
    products.map((el) => {
      descontarCantidad(el.codigoBarra, el.cantidad);
    });
    setProducts([]);
    console.log(productosCliente);

    setConfirmDialogVenta(false);
    toast.current.show({ severity: "success", summary: "Listo", detail: "¡Venta realizada con exito!", life: 2000 });
  };

  const hadleLimpiarTabla = () => {
    setProducts([]);
    setVenta({ total: 0, ultima: 0 });
    setConfirmDialogLimpiar(false);
    toast.current.show({ severity: "info", summary: "Listo", detail: "¡Tabla limpiada con exito!", life: 2000 });
  };

  const botonesHeader = (
    <React.Fragment>
      <Button label="Agregar" severity="success" icon="pi pi-plus" onClick={() => setVisible(true)} />
      <Button label="Ir a Productos" severity="info" icon="pi pi-search" onClick={() => navigateProductos("/productos")} />
      <Button label="Prueba" severity="danger" icon="pi pi-trash" onClick={() => escucharWSCodigoBarra()} />
    </React.Fragment>
  );

  const botonesVenta = (
    <React.Fragment>
      <Button label="Vender" severity="info" icon="pi pi-check" onClick={() => setConfirmDialogVenta(true)} />
      <Button label="Limpiar" severity="danger" icon="pi pi-trash" onClick={() => setConfirmDialogLimpiar(true)} />
    </React.Fragment>
  );

  const venderProductosDialog = (
    <React.Fragment>
      <Button label="Si" icon="pi pi-check" className="p-button-success" onClick={venderProductos} />
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setConfirmDialogVenta(false)} />
    </React.Fragment>
  );

  const limpiarTablaDialog = (
    <React.Fragment>
      <Button label="Si" icon="pi pi-trash" severity="danger" className="p-button-success" onClick={hadleLimpiarTabla} />
      <Button label="No" icon="pi pi-times" severity="info" className="p-button-text" onClick={() => setConfirmDialogLimpiar(false)} />
    </React.Fragment>
  );

  const escucharWSCodigoBarra = () => {
    socket.on("venderProducto", (data) => {
      const { codigoBarra } = data;
      console.log(codigoBarra);
      // buscarProducto(codigoBarra);
      agregarProducto(codigoBarra);
    });
  };
  useEffect(() => {
    escucharWSCodigoBarra();
  }, []);

  return (
    <>
      <ContenedorPrincipal>
        <ContenedorInfoVenta>
          <Toast ref={toast} />
          <OpcionesBotones>{botonesHeader}</OpcionesBotones>
          <ContenedorDatos>
            <DatosVenta>
              <TotalContenedor>
                <b>Total: </b>
                <span>{venta.total}</span>
              </TotalContenedor>
              <UltimaContenedor>
                <b>Ultimo: </b>
                <span>{venta.ultima}</span>
              </UltimaContenedor>
            </DatosVenta>
          </ContenedorDatos>
          <DataTable value={products} showGridlines>
            <Column field="nombre" header="Nombre" />
            <Column field="cantidad" header="Cantidad" />
            <Column field="valor" header="Valor U." />
            <Column field="total" header="Valor T." />
          </DataTable>
        </ContenedorInfoVenta>
        <OpcionesVenta>{botonesVenta}</OpcionesVenta>
      </ContenedorPrincipal>
      <ConfirmDialog
        visible={confirmDialogVenta}
        onHide={() => setConfirmDialogVenta(false)}
        message="¿Deseas confirmar la venta?"
        header="Confirmar venta"
        icon="pi pi-question-circle"
        acceptClassName="p-button-success"
        acceptLabel="Sí"
        rejectLabel="No"
        footer={venderProductosDialog}
      />
      <ConfirmDialog
        visible={confirmDialogLimpiar}
        onHide={() => setConfirmDialogLimpiar(false)}
        message="¿Seguro de limpiar la tabla?"
        header="Confirmar limpieza de tabla"
        icon="pi pi-question-circle"
        acceptClassName="p-button-success"
        acceptLabel="Limpiar"
        rejectLabel="Cancelar"
        footer={limpiarTablaDialog}
      />
      <Dialog header="Ingresar producto" visible={visible} onHide={() => setVisible(false)}>
        <AgregarVenta className="p-float-label">
          <InputNumber id="codigoBarra" value={value} onValueChange={(e) => setValue(e.target.value)} />
          <label htmlFor="codigoBarra">Codigo de barra</label>
          <Button severity="success" label="Agregar" onClick={agregarProducto} />
        </AgregarVenta>
      </Dialog>
    </>
  );
};
