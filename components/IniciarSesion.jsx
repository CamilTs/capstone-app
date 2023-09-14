import React, { useState } from 'react';
import { Chips } from 'primereact/chips';
import { Link } from 'react-router-dom';

export const IniciarSesion = () => {
  const [usuario, setUsuario] = useState([]); // Estado para el campo de usuario
  const [contraseña, setContraseña] = useState([]); // Estado para el campo de contraseña

  return (
    <div className="p-card" style={{ background: 'white', padding: '20px' }}>
      <h2>Iniciar Sesion</h2>
      <span className="p-float-label" style={{ margin: '20px' }}>
        <Chips id="usuario" value={usuario} onChange={(e) => setUsuario(e.value)} />
        <label htmlFor="usuario">Usuario</label>
      </span>
      <span className="p-float-label" style={{ margin: '20px' }}>
        <Chips id="contraseña" value={contraseña} onChange={(e) => setContraseña(e.value)} />
        <label htmlFor="contraseña">Contraseña</label>
      </span>
      <div style={{ marginBottom: '20px' }}>
        <button style={{ backgroundColor: 'green'}}>Iniciar sesion</button>
      </div>
      <p style={{ fontSize: '10px' }}>
        ¿Tienes problemas para iniciar sesión, presiona <Link to="/" style={{ color: 'blue' }}>aquí</Link>?
      </p>
    </div>
  );
};



