import { useState, useRef } from "react";
import { Messages } from "primereact/messages";
import { useNavigate } from "react-router-dom";

import { CategoriasProductos } from "./components/CategoriasProductos";
import { CamposProductos } from "./components/CamposProductos";
import { BotonesAgregarProductos } from "./components/BotonesAgregarProductos";

export const AgregarProductos = () => {
  const estructuraFormulario = {
    id: Date.now(),
    codigoBarra: "",
    producto: "",
    categoria: [],
    cantidad: Number(0),
    precio: Number(0),
  };
  const [formulario, setFormulario] = useState(estructuraFormulario);

  const navigate = useNavigate();
  const messagesRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const mostrarMensaje = (detalle, severity) => {
    messagesRef.current.show({
      severity,
      summary: "Mensaje",
      detail: detalle,
    });
  };

  const guardarProductosLocal = () => {
    const productosGuardados =
      JSON.parse(localStorage.getItem("productos")) || [];

    const productoExistente = productosGuardados.find(
      (producto) => producto && producto.id === formulario?.id
    );

    if (!productoExistente) {
      productosGuardados.push(formulario);
      localStorage.setItem("productos", JSON.stringify(productosGuardados));
    }

    mostrarMensaje("Producto agregado", "success");

    setTimeout(() => {
      navigate("/cliente/productos");
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formulario);
  };

  const handleCategoriasChange = (categoriasSeleccionadas) => {
    setFormulario({ ...formulario, categorias: categoriasSeleccionadas });
  };

  return (
    <>
      <h2>Agregar Productos</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <CamposProductos
              formulario={formulario}
              handleChange={handleChange}
            />
            <CategoriasProductos onCategoriasChange={handleCategoriasChange} />
            <BotonesAgregarProductos
              guardarProductosLocal={guardarProductosLocal}
            />
          </div>
        </div>
        <Messages ref={messagesRef} />
      </form>
    </>
  );
};

export default AgregarProductos;
