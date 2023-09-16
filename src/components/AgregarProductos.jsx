import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import '../CSS/AgregarProductos.css'

export const AgregarProductos = () => {

  const estructuraFormulario = {
    codigoproducto: '',
    producto: '',
    cantidad: Number(0),
    precio: Number(0),
  }
  

  const [formulario, setFormulario] = useState(estructuraFormulario)
  const resetForm = () => {
    setFormulario(estructuraFormulario);
  }

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormulario({...formulario,[name]:value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formulario);
  };

  const [cargando, setCargando] = useState(false);
  const cargar = () => {
      setCargando(true);
      
      setTimeout(() => {
        setCargando(false);
        submit();
      }, 2000);
  };

  const submit = () => {
    console.log(formulario);
  };

  return (
    <div className="p-card" style={{ background: 'white', padding: '20px' }}>
      <h2>Agregar Productos</h2>
    <form onSubmit={handleSubmit}>
      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col">
          <label htmlFor="codigoproducto">Código de Producto</label>
          <InputText
            id="codigoproducto"
            name="codigoproducto"
            value={formulario.codigoproducto}
            onChange={handleChange}
          />
        </div>
        <div className="p-field p-col">
          <label htmlFor="producto">Producto</label>
          <InputText
            id="producto"
            name="producto"
            value={formulario.producto}
            onChange={handleChange}
          />
        </div>
        <div className="p-field p-col">
          <label htmlFor="cantidad">Cantidad</label>
          <InputNumber
            id="cantidad"
            name="cantidad"
            value={formulario.cantidad}
            onChange={(e) => setFormulario({ ...formulario, cantidad: e.value })}
          />
        </div>
        <div className="p-field p-col">
          <label htmlFor="precio">Precio</label>
          <InputNumber
            id="precio"
            name="precio"
            value={formulario.precio}
            onChange={(e) => setFormulario({ ...formulario, precio: e.value })}
          />
        </div>
      </div>
      <div className="card">
      <Button style={{ marginRight: '10px' }} className="custom-button" severity='success' label='Confirmar' loading={cargando} onClick={cargar} />
      <Button className="custom-button" severity='danger' label='Eliminar' onClick={resetForm} />
      </div>
    </form>
    </div>
  );
};

export default AgregarProductos;
