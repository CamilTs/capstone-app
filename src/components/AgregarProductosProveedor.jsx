import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useState } from "react";

import { useProductos } from "../context/ProductosContext";
import { useAuth } from "../context/AuthContext";

const categorias = [
  { label: "Alimento", value: "Alimento" },
  { label: "Electrodoméstico", value: "Electrodoméstico" },
  { label: "Electrónica", value: "Electrónica" },
];

export const AgregarProductosProveedor = () => {
  const { agregarProducto } = useProductos();
  const { proveedorActual } = useAuth();

  const estructuraFormulario = {
    id: Date.now(),
    nombre: "",
    imagen: "",
    categoria: null,
    valor: Number(0),
  };
  const [producto, setProducto] = useState(estructuraFormulario);

  const handleAgregarProducto = () => {
    const productoConProveedor = { ...producto, proveedorId: proveedorActual };
    console.log("Agregando producto;", producto);
    agregarProducto(productoConProveedor, proveedorActual);
    console.log("Producto agregado con exito");
    setProducto(estructuraFormulario);
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="nombre">Nombre</label>
          <InputText id="nombre" value={producto.nombre} onChange={(e) => setProducto({ ...producto, nombre: e.target.value })} />
        </div>
        <div className="p-field">
          <label htmlFor="imagen">Imagen URL</label>
          <InputText id="imagen" value={producto.imagen} onChange={(e) => setProducto({ ...producto, imagen: e.target.value })} />
        </div>
        <div className="p-field">
          <label htmlFor="categoria">Categoría</label>
          <Dropdown
            id="categoria"
            options={categorias}
            value={producto.categoria}
            onChange={(e) => setProducto({ ...producto, categoria: e.value })}
            placeholder="Seleccione una categoría"
          />
        </div>
        <div className="p-field">
          <label htmlFor="valor">Valor</label>
          <InputText id="valor" value={producto.valor} onChange={(e) => setProducto({ ...producto, valor: parseFloat(e.target.value) })} />
        </div>
        <div className="p-field">
          <Button label="Agregar" icon="pi pi-plus" onClick={handleAgregarProducto} />
        </div>
      </div>
    </div>
  );
};
