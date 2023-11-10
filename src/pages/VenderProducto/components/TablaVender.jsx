/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "../../../api/api";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useContextSocket } from "../../../context/SocketContext";
import { formatoCurrencyCLP } from "../../../components/FormatoDinero";

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
const formatoVenta = {
  productos: [],
  total: 0,
  tipo: true,
};

export const TablaVender = ({ comercio, cargarRegistros }) => {
  const [registro, setRegistro] = useState(formatoVenta);
  const [ultimoAgregado, setUltimoAgregado] = useState(0);
  const [visible, setVisible] = useState(false);
  const [codigoBarra, setCodigoBarra] = useState("");
  const { socket } = useContextSocket();

  const navigate = useNavigate();

  const toast = useRef(null);
  const [confirmDialogVenta, setConfirmDialogVenta] = useState(false);
  const [confirmDialogLimpiar, setConfirmDialogLimpiar] = useState(false);

  const botonesHeader = (
    <>
      <Button label="Agregar" severity="success" icon="pi pi-plus" onClick={() => setVisible(true)} />
      <Button label="Ver Productos" severity="info" icon="pi pi-search" onClick={() => navigate("/productos")} />
    </>
  );

  const botonesVenta = (
    <>
      <Button
        label="Vender"
        severity="info"
        icon="pi pi-check"
        disabled={registro.productos.length == 0}
        onClick={() => setConfirmDialogVenta(true)}
      />
      <Button label="Limpiar" severity="danger" icon="pi pi-trash" onClick={() => setConfirmDialogLimpiar(true)} />
    </>
  );

  const hadleLimpiarTabla = () => {
    setConfirmDialogLimpiar(false);
    setRegistro(formatoVenta);
    setUltimoAgregado(0);

    setCodigoBarra("");
    toast.current.show({ severity: "info", summary: "Listo", detail: "¡Tabla limpiada con exito!", life: 2000 });
  };
  const venderProductos = async () => {
    const { data } = await api.post("registro", { ...registro, comercio });
    console.log(data);
    if (!data.success) return;
    setRegistro(formatoVenta);
    await cargarRegistros();
    setCodigoBarra("");
    setUltimoAgregado(0);
    setConfirmDialogVenta(false);
    toast.current.show({ severity: "success", summary: "Listo", detail: "¡Venta realizada con exito!", life: 2000 });
  };
  const venderProductosDialog = (
    <>
      <Button label="Si" icon="pi pi-check" className="p-button-success" onClick={venderProductos} />
      <Button label="No" icon="pi pi-times" className="p-button-info" onClick={() => setConfirmDialogVenta(false)} />
    </>
  );
  const limpiarTablaDialog = (
    <>
      <Button label="Si" icon="pi pi-trash" severity="danger" className="p-button-success" onClick={hadleLimpiarTabla} />
      <Button label="No" icon="pi pi-times" className="p-button-info" onClick={() => setConfirmDialogLimpiar(false)} />
    </>
  );
  const agregarProducto = async (codigoBarra = "") => {
    try {
      const { data: response } = await api.get(`producto/${codigoBarra}`);
      const producto = response.data;

      if (producto) {
        setUltimoAgregado(producto.precio);
        const productoExistenteIndex = registro.productos.findIndex((el) => el.codigoBarra === producto.codigo_barra);

        if (productoExistenteIndex >= 0) {
          setRegistro((prevRegistro) => {
            const clonProducts = [...prevRegistro.productos];
            const productoExiste = clonProducts[productoExistenteIndex];
            productoExiste.cantidad++;
            productoExiste.total = productoExiste.cantidad * productoExiste.valor;
            clonProducts[productoExistenteIndex] = productoExiste;

            // Calcular el nuevo total después de actualizar el producto existente
            const nuevoTotal = clonProducts.reduce((acc, el) => acc + el.total, 0);

            return { ...prevRegistro, productos: clonProducts, total: nuevoTotal };
          });
        } else {
          // Si no existe en la lista, agrégalo
          setRegistro((e) => {
            return {
              ...e,
              total: e.total + producto.precio,
              productos: [
                ...e.productos,
                {
                  nombre: producto.nombre,
                  cantidad: 1,
                  valor: producto.precio,
                  total: producto.precio,
                  codigoBarra: producto.codigo_barra,
                  id: producto._id,
                },
              ],
            };
          });
        }
      } else {
        console.log("Producto no encontrado");
        // Manejar el caso en que el producto no existe
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      // Manejar errores de la API, por ejemplo, mostrar un mensaje al usuario.
    }
  };
  const escucharWSCodigoBarra = () => {
    socket.on("venderProducto", (data) => {
      const { codigoBarra } = data;
      agregarProducto(codigoBarra);
    });
  };

  useEffect(() => {
    escucharWSCodigoBarra();
  }, []);
  return (
    <>
      {/* <div className="flex flex-column justify-content-between g-3"> */}
      <div className="flex flex-column gap-3">
        {/* <div className="flex g-3 flex-column w-full h-full"> */}
        <div className="flex flex-column">
          <Toast ref={toast} />
          <div className="flex gap-2">{botonesHeader}</div>
          <ContenedorDatos>
            <DatosVenta>
              <span className="text-6xl">
                <b>Total: </b>
                {formatoCurrencyCLP(registro.total)}
              </span>
              <span className="text-2xl	">
                <b>Ultimo: </b>
                {formatoCurrencyCLP(ultimoAgregado)}
              </span>
            </DatosVenta>
          </ContenedorDatos>
          <DataTable value={registro.productos} showGridlines>
            <Column field="nombre" header="Nombre" />
            <Column field="cantidad" header="Cantidad" />
            <Column
              field="valor"
              header="Valor U."
              body={(e) => {
                return formatoCurrencyCLP(e.valor);
              }}
            />
            <Column
              field="total"
              header="Valor T."
              body={(e) => {
                return formatoCurrencyCLP(e.total);
              }}
            />
          </DataTable>
        </div>
        <div className="flex gap-2 justify-content-end">{botonesVenta}</div>
      </div>
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
        <div className="p-float-label glex g-2">
          <InputText id="codigoBarra" value={codigoBarra} onChange={(e) => setCodigoBarra(e.target.value)} />
          <label htmlFor="codigoBarra">Codigo de barra</label>
          <Button severity="success" label="Agregar" onClick={() => agregarProducto(codigoBarra)} />
        </div>
      </Dialog>
    </>
  );
};
