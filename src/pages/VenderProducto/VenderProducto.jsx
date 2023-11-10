import { Column } from "primereact/column";
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import styled from "styled-components";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { useContextSocket } from "../../context/SocketContext";
import { api } from "../../api/api";
import { useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";

import { Badge } from "primereact/badge";
import { TablaVender } from "./components/TablaVender";

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

const formatoVenta = {
  productos: [],
  total: 0,
  tipo: true,
};
export const VenderProducto = () => {
  const { socket } = useContextSocket();
  const { comercio } = useSelector((state) => state.auth);

  const [confirmDialogVenta, setConfirmDialogVenta] = useState(false);
  const [confirmDialogLimpiar, setConfirmDialogLimpiar] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [registro, setRegistro] = useState(formatoVenta);
  const [value, setValue] = useState("");
  const [ultimoAgregado, setUltimoAgregado] = useState(0);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const navigateProductos = useNavigate();

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

  const venderProductos = async () => {
    const { data } = await api.post("registro", { ...registro, comercio });
    console.log(data);
    if (!data.success) return;
    setRegistro(formatoVenta);
    setValue("");
    setUltimoAgregado(0);
    setConfirmDialogVenta(false);
    toast.current.show({ severity: "success", summary: "Listo", detail: "¡Venta realizada con exito!", life: 2000 });
  };

  const hadleLimpiarTabla = () => {
    setConfirmDialogLimpiar(false);
    setRegistro(formatoVenta);
    setUltimoAgregado(0);

    setValue("");
    toast.current.show({ severity: "info", summary: "Listo", detail: "¡Tabla limpiada con exito!", life: 2000 });
  };

  const botonesHeader = (
    <>
      <Button label="Agregar" severity="success" icon="pi pi-plus" onClick={() => setVisible(true)} />
      <Button label="Ver Productos" severity="info" icon="pi pi-search" onClick={() => navigateProductos("/productos")} />
      <Button label="Prueba" severity="danger" icon="pi pi-trash" onClick={() => escucharWSCodigoBarra()} />
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

  const escucharWSCodigoBarra = () => {
    socket.on("venderProducto", (data) => {
      const { codigoBarra } = data;
      console.log(codigoBarra);
      // buscarProducto(codigoBarra);
      agregarProducto(codigoBarra);
    });
  };

  const cargarRegistros = async () => {
    try {
      const { data } = await api.get("registro/ultimosRegistros");
      console.log(data);
      if (!data.success) {
        setRegistros([]);
      }
      setRegistros(data.data);
    } catch (error) {
      setRegistros([]);
    }
  };
  useEffect(() => {
    escucharWSCodigoBarra();
    cargarRegistros();
  }, []);

  return (
    <>
      <div className="grid h-full">
        <div className="col-12">
          <TablaVender comercio={comercio} />
        </div>
        <div className="col-12 grid">
          <div className="col-6">
            <DataTable value={registros} showGridlines scrollable>
              <Column
                field="tipo"
                header="Tipo"
                body={(e) => {
                  return <Badge value={e.tipo ? "Venta" : "Compra"} severity={e.tipo ? "success" : "danger"} />;
                }}
              />
              <Column field="total" header="Total" />
              <Column field="createdAt" header="Fecha" />
            </DataTable>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
      <Dialog header="Ingresar producto" visible={visible} onHide={() => setVisible(false)}>
        <div className="p-float-label glex g-2">
          <InputText id="codigoBarra" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="codigoBarra">Codigo de barra</label>
          <Button severity="success" label="Agregar" onClick={() => agregarProducto(value)} />
        </div>
      </Dialog>
    </>
  );
};
