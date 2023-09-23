import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import { Checkbox } from "primereact/checkbox";
import { useNavigate } from "react-router-dom";
import "../CSS/AgregarProductos.css";

export const AgregarProductos = () => {
  const estructuraFormulario = {
    id: Date.now(),
    codigoBarra: "",
    producto: "",
    cantidad: Number(0),
    precio: Number(0),
  };
  const [formulario, setFormulario] = useState(estructuraFormulario);

  const [categorias, setCategorias] = useState([]);
  const contenedorCategorias = (e) => {
    let _categorias = [...categorias];

    if (e.seleccionado) _categorias.push(e.value);
    else _categorias.splice(_categorias.indexOf(e.vale), 1);

    setCategorias(_categorias);
  };

  const navigate = useNavigate();
  const messagesRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const resetForm = () => {
    setFormulario(estructuraFormulario);
    mostrarMensaje("Producto cancelado", "info");
  };

  const mostrarMensaje = (detalle, severity) => {
    messagesRef.current.show({
      severity,
      summary: "Mensaje",
      detail: detalle,
    });
  };

  const guardarProductoEnLocalStorage = () => {
    const productosGuardados =
      JSON.parse(localStorage.getItem("productos")) || [];
    productosGuardados.push(formulario);
    localStorage.setItem("productos", JSON.stringify(productosGuardados));

    mostrarMensaje("Producto agregado", "success");
    console.log(formulario);

    setTimeout(() => {
      navigate("/cliente/productos");
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formulario);
  };

  return (
    <div className="p-card" style={{ background: "white", padding: "20px" }}>
      <h2>Agregar Productos</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="codigoBarra">Código de barra</label>
            <InputText
              id="codigoBarra"
              name="codigoBarra"
              value={formulario.codigoBarra}
              onChange={handleChange}
            />

            <label htmlFor="producto">Producto</label>
            <InputText
              id="producto"
              name="producto"
              value={formulario.producto}
              onChange={handleChange}
            />

            <div className="flex align-items-center">
              <Checkbox
                inputId="categoria1"
                name="categorias"
                value="Fruta"
                onChange={contenedorCategorias}
                checked={categorias.includes("Fruta")}
              />
              <label htmlFor="categoria1" className="ml-2">
                Fruta
              </label>
            </div>

            <label htmlFor="cantidad">Cantidad</label>
            <InputNumber
              id="cantidad"
              name="cantidad"
              value={formulario.cantidad}
              onChange={(e) =>
                setFormulario({ ...formulario, cantidad: e.value })
              }
            />

            <label htmlFor="precio">Precio</label>
            <InputNumber
              id="precio"
              name="precio"
              value={formulario.precio}
              onChange={(e) =>
                setFormulario({ ...formulario, precio: e.value })
              }
            />
          </div>
          <div className="card">
            <Button
              style={{ marginRight: "10px" }}
              className="custom-button"
              severity="success"
              label="Confirmar"
              onClick={guardarProductoEnLocalStorage}
            />
            <Button
              className="custom-button"
              severity="danger"
              label="Cancelar"
              onClick={resetForm}
            />
          </div>
        </div>
        <Messages ref={messagesRef} />
      </form>
    </div>
  );
};

export default AgregarProductos;
