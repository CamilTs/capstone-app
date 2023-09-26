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

  const agregarProducto = (nuevoProducto, proveedorId = 0) => {
    productos.push(nuevoProducto);

    console.log(nuevoProducto);
    // const productosProveedor = productosData[proveedorId] || [];
    // productosProveedor.push(nuevoProducto);
    // setProductosData({ ...productosData, [proveedorId]: productosProveedor });
  };

  const eliminarProducto = (productoId) => {
    const indice = productos.findIndex((el) => el.id === productoId);
    productos.splice(indice, 1);
    // const productosProveedor = productosData[proveedorId] || [];
    // const nuevosProductos = productosProveedor.filter((producto) => producto.id !== productoId);
    // setProductosData({ ...productosData, [proveedorId]: nuevosProductos });
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

    // Toma los primeros 3 productos de la lista ordenada
    const productosRecientes = productosOrdenados.slice(0, 3);

    return productosRecientes;

    // const productosHoy = [];
    // console.log(user);
    // const today = new Date();

    // let index = 0;
    // for (const proveedorId in productosData) {
    //   if (index >= 3) {
    //     break; // Si ya hemos agregado 3 elementos, detenemos el ciclo
    //   }

    //   const productosProveedor = productosData[proveedorId];

    //   const productosDeHoyProveedor = productosProveedor.filter((producto) => {
    //     const fechaProducto = new Date(producto.fecha);
    //     return fechaProducto.toDateString() === today.toDateString();
    //   });

    //   // Verificamos cuántos elementos se pueden agregar sin exceder 3
    //   const elementosRestantes = 3 - index;

    //   // Agregamos los elementos que no excedan el límite de 3
    //   productosHoy.push(...productosDeHoyProveedor.slice(0, elementosRestantes));

    //   // Actualizamos el índice con la cantidad de elementos agregados
    //   index += productosDeHoyProveedor.length;
    // }

    // console.log({ productosHoy });
    // return productosHoy;
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
