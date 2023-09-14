import React, { useState } from 'react';
import { Chips } from 'primereact/chips';
import { Link } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button'

export const RegistrarUsuarios = () => {
  const [rut, setRut] = useState([]);
  const [nombre, setNombre] = useState([]);
  const [apellidos, setApellidos] = useState([]);
  const [correo, setCorreo] = useState([]);
  const [contrasena, setContrasena] = useState([]);
  const [repetir, setRepetir] = useState([]);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [rol, setRol] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFotoPerfil(file);
  };

  const handleRolChange = (e) => {
    setRol(e.target.value);
  };

  const rolOptions = [
    { label: 'Administrador', value: 'Administrador' },
    { label: 'Encargado', value: 'Encargado' },
  ];

  const cargar = () => {
    setCargando(true);

    setEspera(() => {
      setCargando(false);
    }, 2000);
  };

  return (
    <div className="p-card" style={{ background: 'white', padding: '20px' }}>
      <h2>Registrar cuenta</h2>
      <div style={{ marginBottom: '20px' }}>
      <Dropdown
        id="rol"
        options={rolOptions}
        onChange={handleRolChange}
        placeholder="Seleccionar Rol"
        value={rol}
      />
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
            <Chips id="rut" value={rut} onChange={(e) => setRut(e.value)} placeholder=''/>
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
          <span className="p-float-label">
              <Password inputId="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
              <label htmlFor="password">Contraseña</label>
          </span>
        </div>
        <div style={{ flex: '1' }}>
        <span className="p-float-label">
              <Password inputId="password" value={repetir} onChange={(e) => setRepetir(e.target.value)} />
              <label htmlFor="password">Repetir contraseña</label>
          </span>
        </div>
      </div>
      <div className="card flex justify-content-center">
        <Button  style={{ backgroundColor: 'green', marginRight: '10px' }} label='Crear' />
        <Button style={{ backgroundColor: 'blue' }} label='Borrar' />
        <Button style={{ backgroundColor: 'red' }} label='Ir' />
      </div>
      <p style={{ fontSize: '10px' }}>
        ¿Ya tienes una cuenta? Presiona <Link to="/Iniciar-sesion" style={{ color: 'blue' }}>aquí</Link>.
      </p>
    </div>
  );
};

