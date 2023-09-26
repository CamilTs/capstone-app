import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";
import { useProductos } from "../../context/ProductosContext";
import { productos } from "../../productosCliente";
import { useAuth } from "../../context/AuthContext";
import { ConfirmDialog } from "primereact/confirmdialog";

const Total = styled.span``;
const UltimaVenta = styled.span``;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const ContainerVenta = styled.div`
  min-width: 400px;
  width: 30%;
  /* border: 1px solid black; */
  display: flex;
  align-items: end;
  flex-flow: column wrap;
`;
export const VenderProducto = () => {
  const { descontarCantidad } = useProductos();
  const { user } = useAuth();
  const productosCliente = productos.filter((el) => el.clienteId == user.id);
  const [venta, setVenta] = useState({
    total: 0,
    ultima: 0,
  });
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

  const [products, setProducts] = useState([]);
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);

  const agregarProducto = () => {
    const producto = productosCliente.filter((el) => el.clienteId == user.id).find((el) => el.codigoBarra == value);

    if (producto) {
      const productoExistenteIndex = products.findIndex((el) => el.codigoBarra == value);
      console.log(products);
      console.log("===== ESPACIO =====");
      console.log(productoExistenteIndex);
      if (productoExistenteIndex >= 0) {
        setProducts((prevProducts) => {
          const clonProducts = [...prevProducts];
          const productoExiste = clonProducts[productoExistenteIndex];
          productoExiste.cantidad++;
          productoExiste.total = productoExiste.cantidad * productoExiste.valor;
          console.log(productoExiste.cantidad);
          console.log(productoExiste.precio);
          clonProducts[productoExistenteIndex] = productoExiste;
          return clonProducts;
        });
      } else {
        // Si no existe en la lista, agrégalo
        setProducts((prevProducts) => [
          ...prevProducts,
          { nombre: producto.producto, cantidad: 1, valor: producto.precio, total: producto.precio, codigoBarra: producto.codigoBarra },
        ]);
      }

      const total = products.reduce((acc, el) => {
        console.log({ acc, el });
        return acc + el.total;
      }, 0);

      setVenta({ total: total == 0 ? producto.precio : total, ultima: producto.precio });
    } else {
      console.log("Producto no encontrado"); // Manejar el caso en que el producto no existe
    }
  };

  const venderProductos = () => {
    products.map((el) => {
      descontarCantidad(el.codigoBarra, el.cantidad);
    });
    setProducts([]);
    console.log(productosCliente);

    setConfirmDialogVisible(false);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Button severity="success" icon="pi pi-plus" onClick={() => setVisible(true)} />
          <Container>
            <ContainerVenta>
              <div style={{ fontSize: "44px" }}>
                <label style={{ fontWeight: "bold" }}>Total:</label>
                <Total>{venta.total}</Total>
              </div>

              <div style={{ fontSize: "25px" }}>
                <label style={{ fontWeight: "bold" }}>Ultimo:</label>
                <UltimaVenta>{venta.ultima}</UltimaVenta>
              </div>
            </ContainerVenta>
          </Container>
          <DataTable value={products} showGridlines>
            <Column field="nombre" header="Nombre" />
            <Column field="cantidad" header="Cantidad" />
            <Column field="valor" header="Valor U." />
            <Column field="total" header="Valor T." />
          </DataTable>
        </div>
        <div style={{ display: "grid", placeContent: "center" }}>
          <Button label="Vender" style={{ width: "150px" }} onClick={() => setConfirmDialogVisible(true)} />
          <ConfirmDialog
            visible={confirmDialogVisible}
            onHide={() => setConfirmDialogVisible(false)}
            message="Confirme para vender"
            header="Confirmar venta"
            icon="pi pi-question-circle"
            acceptClassName="p-button-success"
            acceptLabel="Sí"
            rejectLabel="No"
            footer={
              <div>
                <Button label="Si" icon="pi pi-check" className="p-button-success" onClick={venderProductos} />
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setConfirmDialogVisible(false)} />
              </div>
            }
          />
        </div>
      </div>
      <div></div>
      <Dialog header="Ingresar producto" visible={visible} onHide={() => setVisible(false)}>
        <InputText placeholder="Ingrese codigo de barras" value={value} onChange={(e) => setValue(e.target.value)} />
        <Button severity="success" label="Agregar" onClick={agregarProducto} />
      </Dialog>
    </>
  );
};
