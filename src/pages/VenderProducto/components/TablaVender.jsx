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
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useContextSocket } from "../../../context/SocketContext";
import { formatoCurrencyCLP } from "../../../components/FormatoDinero";
import { CustomConfirmDialog } from "../../../components/CustomConfirmDialog";

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
  const [verConfirmar, setVerConfirmar] = useState(false);
  const [verLimpiar, setVerLimpiar] = useState(false);

  const navigate = useNavigate();

  const toast = useRef(null);

  const botonesHeader = (
    <>
      <Button label="Agregar" severity="success" icon="pi pi-plus" onClick={() => setVisible(true)} />
      <Button label="Ver Productos" severity="info" icon="pi pi-search" onClick={() => navigate("/productos")} />
    </>
  );

  const botonesVenta = (
    <>
      <Button label="Vender" severity="info" icon="pi pi-check" disabled={registro.productos.length == 0} onClick={() => setVerConfirmar(true)} />
      <Button label="Limpiar" severity="danger" icon="pi pi-trash" onClick={() => setVerLimpiar(true)} />
    </>
  );

  const hadleLimpiarTabla = () => {
    setVerLimpiar(false);
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
    setVerConfirmar(false);
    toast.current.show({ severity: "success", summary: "Listo", detail: "¡Venta realizada con exito!", life: 2000 });
  };

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
      <div className="flex flex-column gap-3">
        <div className="flex flex-column gap-1">
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

      <Dialog header="Ingresar producto" visible={visible} onHide={() => setVisible(false)}>
        <div className="p-float-label glex g-2">
          <div className="p-inputgroup flex-1 gap-1">
            <InputText id="codigoBarra" value={codigoBarra} onChange={(e) => setCodigoBarra(e.target.value)} />
            <label htmlFor="codigoBarra">Codigo de barra</label>
            <Button severity="success" label="Agregar" onClick={() => agregarProducto(codigoBarra)} />
          </div>
        </div>
      </Dialog>

      <CustomConfirmDialog
        visible={verConfirmar}
        onHide={() => setVerConfirmar(false)}
        onConfirm={venderProductos}
        type="submit"
        message="¿Confirmar creación?"
        header="Confirmar"
      />

      <CustomConfirmDialog
        visible={verLimpiar}
        onHide={() => setVerLimpiar(false)}
        onConfirm={hadleLimpiarTabla}
        message="¿Seguro de limpiar el formulario?"
        header="Limpiar"
      />
    </>
  );
};
