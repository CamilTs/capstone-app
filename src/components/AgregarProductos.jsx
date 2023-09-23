// import { useState, useRef } from "react";
// import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";
// import { Button } from "primereact/button";
// import { Messages } from "primereact/messages";
// import { Link, useNavigate } from "react-router-dom";
// import "../CSS/AgregarProductos.css";

// import { CategoriasProductos } from "../pages/Productos/AgregarProductos/components/CategoriasProductos";

// export const AgregarProductos = () => {
//   const estructuraFormulario = {
//     id: Date.now(),
//     codigoBarra: "",
//     producto: "",
//     categoria: [],
//     cantidad: Number(0),
//     precio: Number(0),
//   };
//   const [formulario, setFormulario] = useState(estructuraFormulario);

//   const navigate = useNavigate();
//   const messagesRef = useRef(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormulario({ ...formulario, [name]: value });
//   };

//   const resetForm = () => {
//     setFormulario(estructuraFormulario);
//     mostrarMensaje("Producto cancelado", "info");
//   };

//   const mostrarMensaje = (detalle, severity) => {
//     messagesRef.current.show({
//       severity,
//       summary: "Mensaje",
//       detail: detalle,
//     });
//   };

//   const guardarProductoEnLocalStorage = () => {
//     const productosGuardados =
//       JSON.parse(localStorage.getItem("productos")) || [];

//     const productoExistente = productosGuardados.find(
//       (producto) => producto.id === formulario.id
//     );

//     if (!productoExistente) {
//       productosGuardados.push(formulario);
//       localStorage.setItem("productos", JSON.stringify(productosGuardados));
//     }

//     mostrarMensaje("Producto agregado", "success");

//     setTimeout(() => {
//       navigate("/cliente/productos");
//     }, 2000);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formulario);
//   };

//   const handleCategoriasChange = (categoriasSeleccionadas) => {
//     setFormulario({ ...formulario, categorias: categoriasSeleccionadas });
//   };

//   return (
//     <div className="p-card" style={{ background: "white", padding: "20px" }}>
//       <h2>Agregar Productos</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="p-fluid p-formgrid p-grid">
//           <div className="p-field p-col">
//             <label htmlFor="codigoBarra">Código de barra</label>
//             <InputText
//               id="codigoBarra"
//               name="codigoBarra"
//               value={formulario.codigoBarra}
//               onChange={handleChange}
//             />

//             <label htmlFor="producto">Producto</label>
//             <InputText
//               id="producto"
//               name="producto"
//               value={formulario.producto}
//               onChange={handleChange}
//             />

//             <CategoriasProductos onCategoriasChange={handleCategoriasChange} />

//             <label htmlFor="cantidad">Cantidad</label>
//             <InputNumber
//               id="cantidad"
//               name="cantidad"
//               value={formulario.cantidad}
//               onChange={(e) =>
//                 setFormulario({ ...formulario, cantidad: e.value })
//               }
//             />

//             <label htmlFor="precio">Precio</label>
//             <InputNumber
//               id="precio"
//               name="precio"
//               value={formulario.precio}
//               onChange={(e) =>
//                 setFormulario({ ...formulario, precio: e.value })
//               }
//             />
//           </div>
//           <div className="card">
//             <Button
//               style={{ marginRight: "10px" }}
//               className="custom-button"
//               severity="success"
//               label="Confirmar"
//               onClick={guardarProductoEnLocalStorage}
//             />
//             <Link to="/cliente/productos">
//               <Button
//                 className="custom-button"
//                 severity="danger"
//                 label="Cancelar"
//               />
//             </Link>
//           </div>
//         </div>
//         <Messages ref={messagesRef} />
//       </form>
//     </div>
//   );
// };

// export default AgregarProductos;
