import React, { useState } from 'react';
import { Chips } from 'primereact/chips';
import { Link } from 'react-router-dom';

export const RegistrarUsuarios = () => {
  const [rut, setRut] = useState([]);
  const [nombre, setNombre] = useState([]);
  const [apellidos, setApellidos] = useState([]);
  const [correo, setCorreo] = useState([]);
  const [contrasena, setContrasena] = useState([]);
  const [repetir, setRepetir] = useState([]);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [rol, setRol] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFotoPerfil(file);
  };

  const handleRolChange = (e) => {
    setRol(e.target.value);
  };

  return (
    <div className="p-card" style={{ background: 'white', padding: '20px' }}>
      <h2>Registrar cuenta</h2>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="rol">Rol</label>
        <select id="rol" value={rol} onChange={handleRolChange}>
          <option value="Administrador">Administrador</option>
          <option value="Encargado">Encargado</option>
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="fotoPerfil">Logo/Foto de perfil</label>
        <input
          type="file"
          id="fotoPerfil"
          accept="image/*"
          onChange={handleFileChange}
        />
        {fotoPerfil && (
          <div style={{ marginTop: '10px' }}>
            <img
              src={URL.createObjectURL(fotoPerfil)}
              alt="Vista previa de la foto de perfil"
              style={{ maxWidth: '100px' }}
            />
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', marginRight: '10px' }}>
          <span className="p-float-label" style={{ marginBottom: '20px' }}>
            <Chips id="rut" value={rut} onChange={(e) => setRut(e.value)} />
            <label htmlFor="rut">Rut</label>
          </span>
          <span className="p-float-label" style={{ marginBottom: '20px' }}>
            <Chips id="nombre" value={nombre} onChange={(e) => setNombre(e.value)} />
            <label htmlFor="nombre">Nombre</label>
          </span>
        </div>
        <div style={{ flex: '1' }}>
          <span className="p-float-label" style={{ marginBottom: '20px' }}>
            <Chips id="apellidos" value={apellidos} onChange={(e) => setApellidos(e.value)} />
            <label htmlFor="apellidos">Apellidos</label>
          </span>
          <span className="p-float-label" style={{ marginBottom: '20px' }}>
            <Chips id="correo" value={correo} onChange={(e) => setCorreo(e.value)} />
            <label htmlFor="correo">Correo</label>
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', marginRight: '10px' }}>
          <span className="p-float-label" style={{ marginBottom: '20px' }}>
            <Chips id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.value)} />
            <label htmlFor="contrasena">Contraseña</label>
          </span>
        </div>
        <div style={{ flex: '1' }}>
          <span className="p-float-label" style={{ marginBottom: '20px' }}>
            <Chips id="repetir" value={repetir} onChange={(e) => setRepetir(e.value)} />
            <label htmlFor="repetir">Repita su contraseña</label>
          </span>
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <button style={{ backgroundColor: 'green', marginRight: '10px' }}>Crear</button>
        <button style={{ backgroundColor: 'blue' }}>Borrar</button>
      </div>
      <p style={{ fontSize: '10px' }}>
        ¿Ya tienes una cuenta? Presiona <Link to="/Iniciar-sesion" style={{ color: 'blue' }}>aquí</Link>.
      </p>
    </div>
  );
};
