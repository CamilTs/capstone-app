/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { productos } from "../productosCliente";
import { useAuth } from "./AuthContext";

const ProductosContext = createContext();

export const useProductos = () => {
  return useContext(ProductosContext);
};

export const ProductosProvider = ({ children }) => {
  const { user } = useAuth();
  const [productosData, setProductosData] = useState(
    productos.reduce((acc, producto) => {
      if (!acc[producto.proveedorId]) {
        acc[producto.proveedorId] = [];
      }
      acc[producto.proveedorId].push(producto);
      return acc;
    }, {})
  );

  const agregarProducto = (nuevoProducto) => {
    productos.push(nuevoProducto);
    console.log(nuevoProducto);
  };

  const eliminarProducto = (productoId) => {
    const indice = productos.findIndex((el) => el.id === productoId);
    productos.splice(indice, 1);
    console.log(productoId);
  };

  const getProductosDeHoy = () => {
    const productosOrdenados = productos
      .filter((el) => el.clienteId == user.id)
      .sort((a, b) => {
        if (a.fecha === b.fecha) {
          return a.id - b.id; // Ordena por ID si las fechas son iguales
        }
        return b.fecha - a.fecha; // Ordena por fecha de forma descendente
      });

    const productosRecientes = productosOrdenados.slice(0, 3);
    return productosRecientes;
  };

  const descontarCantidad = (codigoBarra, cantidad) => {
    const index = productos.findIndex((el) => el.codigoBarra == codigoBarra);
    const producotActualizado = productos.find((el) => el.codigoBarra == codigoBarra);
    producotActualizado.cantidad -= cantidad;
    productosData[index] = producotActualizado;
  };

  return (
    <ProductosContext.Provider value={{ productosData, agregarProducto, eliminarProducto, getProductosDeHoy, descontarCantidad, productos }}>
      {children}
    </ProductosContext.Provider>
  );
};
