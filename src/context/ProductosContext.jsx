import { createContext, useContext, useState } from "react";
import { productos } from "../productosCliente";

const ProductosContext = createContext();

export const useProductos = () => {
  return useContext(ProductosContext);
};

export const ProductosProvider = ({ children }) => {
  const [productosData, setProductosData] = useState(
    productos.reduce((acc, producto) => {
      if (!acc[producto.proveedorId]) {
        acc[producto.proveedorId] = [];
      }
      acc[producto.proveedorId].push(producto);
      return acc;
    }, {})
  );

  const agregarProducto = (nuevoProducto, proveedorId) => {
    const productosProveedor = productosData[proveedorId] || [];
    productosProveedor.push(nuevoProducto);
    setProductosData({ ...productosData, [proveedorId]: productosProveedor });
  };

  const eliminarProducto = (productoId, proveedorId) => {
    const productosProveedor = productosData[proveedorId] || [];
    const nuevosProductos = productosProveedor.filter((producto) => producto.id !== productoId);
    setProductosData({ ...productosData, [proveedorId]: nuevosProductos });
  };

  const getProductosDeHoy = () => {
    const today = new Date();
    const productosHoy = [];

    for (const proveedorId in productosData) {
      const productosProveedor = productosData[proveedorId];

      const productosDeHoyProveedor = productosProveedor.filter((producto) => {
        const fechaProducto = new Date(producto.fecha);
        return fechaProducto.toDateString() === today.toDateString();
      });
      productosHoy.push(...productosDeHoyProveedor);
    }
    return productosHoy;
  };
  const descontarCantidad = (codigoBarra, cantidad) => {
    const index = productos.findIndex((el) => el.codigoBarra == codigoBarra);
    const producotActualizado = productos.find((el) => el.codigoBarra == codigoBarra);
    producotActualizado.cantidad -= cantidad;
    productos[index] = producotActualizado;
  };

  return (
    <ProductosContext.Provider value={{ productosData, agregarProducto, eliminarProducto, getProductosDeHoy, descontarCantidad }}>
      {children}
    </ProductosContext.Provider>
  );
};
